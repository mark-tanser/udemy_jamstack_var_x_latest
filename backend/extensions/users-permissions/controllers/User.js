const { sanitizeEntity } = require("strapi-utils");

const sanitizeUser = user =>
    sanitizeEntity(user, {
        model: strapi.query("user", "users-permissions").model,
    });

    module.exports = {
        async setSettings(ctx) {
            const { id, contactInfo, locations } = ctx.state.user
            const { details, detailsSlot, location, locationSlot } = ctx.request.body

            let newInfo = [...contactInfo]
            let newLocations = [...locations]

            if (typeof details !== "undefined" && typeof detailsSlot !== "undefined") {
                newInfo[detailsSlot] = details
            }

            if (typeof location !== "undefined" && typeof locationSlot !== "undefined") {
                newInfo[locationSlot] = location
            }

            let newUser = await strapi.plugins["users-permissions"].services.user.edit({ id }, { contactInfo:newInfo, locations: newLocations })

            newUser = sanitizeUser(newUser)

            ctx.send(newUser, 200)
        }
    }