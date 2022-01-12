'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require("strapi-utils");
const stripe = require("stripe")(process.env.STRIPE_SK)

const GUEST_ID = "61b00ceb7feff84c0c2c54f8";

const sanitizeUser = user =>
    sanitizeEntity(user, {
        model: strapi.query("user", "users-permissions").model,
    });

module.exports = {
    async process(ctx) {
        const {
            items,
            total,
            shippingOption,
            idempotencyKey,
            storedIntent,
            email,
            savedCard
        } = ctx.request.body;

        let serverTotal = 0; //initialise serverTotal count
        let unavailable = []; //create unavailable items list

        //wait for all tasks to complete successfully
        await Promise.all(
            items.map(async (clientItem) => {
                //find item
                const serverItem = await strapi.services.variant.findOne({id: clientItem.variant.id})
                //check availability
                if (serverItem.qty < clientItem.qty) {
                    //if unavailable add item to unavailable list
                    unavailable.push({id: serverItem.id, qty: serverItem.qty})
                } 
                //increment serverTotal
                serverTotal += serverItem.price * clientItem.qty 
            })
        ); 

        // check client shippingOption against server
        const shippingOptions = [ 
            { label: "FREE SHIPPING", price: 0 }, 
            { label: "2-DAY SHIPPING", price: 9.99 }, 
            { label: "OVERNIGHT SHIPPING", price: 29.99 }
        ];

        // USES HARD_CODED SHIPPING OPTIONS AND TAX RATE 7.5%
        const shippingValid = shippingOptions.find((option) => option.label === shippingOption.label && option.price === shippingOption.price);

        if (shippingValid === undefined || (serverTotal * 1.075 + shippingValid.price).toFixed(2) !== total) {
            // send invalid error
            ctx.send({error: "Invalid Cart"}, 400)
        } else if (unavailable.length > 0) {
            // send conflict error
            ctx.send({ unavailable }, 409)
        } else {
            let saved;

            if (savedCard) {
                const stripeMethods = await stripe.paymentMethods.list(
                    {customer: ctx.state.user.stripeID, type: "card"}
                )

                saved = stripeMethods.data.find(method => method.card.last4 === savedCard)
            }

            // if there's an existing payment intent then update it
            if (storedIntent) {
                const update = await stripe.paymentIntents.update(storedIntent, {
                    amount: total * 100 // $1 = 100 units in Stripe
                }, { idempotencyKey}) 

                ctx.send({client_secret: update.client_secret, intentID: update.id})
            } else {
                // otherwise generate a new payment intent
                const intent = await stripe.paymentIntents.create({
                    amount: total * 100,
                    currency: "usd",
                    customer: ctx.state.user ? ctx.state.user.stripeID : undefined,
                    receipt_email: email,
                    payment_method: saved ? saved.id : undefined
                }, { idempotencyKey })

                ctx.send({client_secret: intent.client_secret, intentID: intent.id})
            }
        }
    },
    async finalize(ctx) {
        const { 
            shippingAddress, 
            billingAddress, 
            shippingInfo, 
            billingInfo, 
            shippingOption, 
            subtotal, 
            tax, 
            total, 
            items,
            transaction,
            paymentMethod,
            saveCard,
            cardSlot
         } = ctx.request.body;

        let orderCustomer;
        if (ctx.state.user) {orderCustomer = ctx.state.user.id;} else {orderCustomer = GUEST_ID}


        //wait for all tasks to complete successfully
        await Promise.all(
            items.map(async (clientItem) => {
                //find item
                const serverItem = await strapi.services.variant.findOne({id: clientItem.variant.id})
                
                //update the quantity in stock
                await strapi.services.variant.update(
                    {id: clientItem.variant.id}, 
                    {qty: serverItem.qty - clientItem.qty}
                )
                
            })
        ); 

        if (saveCard && ctx.state.user) {
            let newMethods = [...ctx.state.user.paymentMethods]

            newMethods[cardSlot] = paymentMethod
            await strapi.plugins["users-permissions"].services.user.edit(
                { id: orderCustomer },
                { paymentMethods: newMethods }
            );
        }

        // create order
        var order = await strapi.services.order.create({
            shippingAddress, 
            billingAddress, 
            shippingInfo, 
            billingInfo, 
            shippingOption, 
            subtotal, 
            tax, 
            total, 
            items,
            transaction,
            paymentMethod,
            users_permissions_user: orderCustomer
        });

        // remove sensitive info
        order = sanitizeEntity(order, { model: strapi.models.order })

        // override order.user when Guest
        if (order.users_permissions_user.username === "Guest") {
            order.users_permissions_user = { username: "Guest" }
        }

        // send order with success status code
        ctx.send({ order }, 200)
    },

    async removeCard(ctx) {
        const { card } = ctx.request.body
        const { stripeID } = ctx.state.user

        const stripeMethods = await stripe.paymentMethods.list(
            { customer: stripeID, type: "card" }
        )

        const stripeCard = stripeMethods.data.find(method => method.card.last4 === card)

        await stripe.paymentMethods.detach(stripeCard.id)

        let newMethods = [...ctx.state.user.paymentMethods]

        const cardSlot = newMethods.findIndex(method => method.last4 === card)

        newMethods[cardSlot] = {brand: "", last4: ""}

        const newUser = await strapi.plugins["users-permissions"].services.user.edit(
            { id: ctx.state.user.id },
            { paymentMethods: newMethods }
        )

        ctx.send({ user: sanitizeUser(newUser)}, 200)

    }
};
