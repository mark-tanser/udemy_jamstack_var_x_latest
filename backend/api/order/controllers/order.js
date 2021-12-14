'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require("strapi-utils");

const GUEST_ID = "61b00ceb7feff84c0c2c54f8";

module.exports = {
    async place(ctx) {
        const { 
            shippingAddress, 
            billingAddress, 
            shippingInfo, 
            billingInfo, 
            shippingOption, 
            subtotal, 
            tax, 
            total, 
            items } = ctx.request.body;

        let orderCustomer;
        if (ctx.state.user) {orderCustomer = ctx.state.user.id;} else {orderCustomer = GUEST_ID}

        //validate client order list against server for quantity available and price

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
                } else {
                    //update the quantity in stock
                    await strapi.services.variant.update(
                        {id: clientItem.variant.id}, 
                        {qty: serverItem.qty - clientItem.qty}
                    )
                }
                //increment serverTotal
                serverTotal += serverItem.price * clientItem.qty 
            })
        ); 

        //only executes if all items are available

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
                users_permissions_user: orderCustomer
            })

            // remove sensitive info
            order = sanitizeEntity(order, { model: strapi.models.order })

            // override order.user when Guest
            if (order.users_permissions_user.username === "Guest") {
                order.users_permissions_user = { username: "Guest" }
            }

            // send order with success status code
            ctx.send({ order }, 200)
        }
    }
};
