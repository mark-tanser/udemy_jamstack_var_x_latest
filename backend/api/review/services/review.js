'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

 module.exports = {
    async average(id) {
        console.log("id:", id);

        const product = await strapi.services.product.findOne({ id });
        console.log("product:", product);

        const total = product.reviews.reduce(
            (total, review) => total + review.rating,
            0
        );
        console.log("total:", total);
        console.log("product.reviews.length:", product.reviews.length)
        
        let average = 0
        if (product.reviews.length > 0) {
            average = total / product.reviews.length
        };
  
        await strapi.services.product.update(
            { id },
            { rating: Math.round(average * 2) / 2 }
        );
    },
};
