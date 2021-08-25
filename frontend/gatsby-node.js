/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
exports.createPages = async ({ graphql, actions} ) => {
    const { createPage } = actions

    const result = await graphql(
        `
            {
                products: allStrapiProduct {
                    edges {
                        node {
                            name
                            strapiId
                            category {
                                name
                            }
                        }
                    }
                }
                categories: allStrapiCategory {
                    edges {
                        node {
                            strapiId
                            name
                            description
                        }
                    }
                }
            }
        `
    )

    if (result.errors) {
        throw result.errors
    }

    const products = result.data.products.edges
    const categories = result.data.categories.edges

    products.forEach(product => {
        createPage({
            path: `/${product.node.category.name.toLowerCase()}/${encodeURIComponent(product.node.name.toLowerCase().split(" ")[0])}`,
            //needed to add .toLowerCase() to second half also
            component: require.resolve("./src/templates/ProductDetail.js"),
            context: {
                name: product.node.name,
                id: product.node.strapiId,
                category: product.node.category.name,
            },
        })
    })

    categories.forEach(category => {
        createPage({
            path: `/${category.node.name.toLowerCase()}`, //needed to add .toLowerCase()
            component: require.resolve("./src/templates/ProductList.js"),
            context: {
                name: category.node.name,
                description: category.node.description,
                id: category.node.strapiId
            },
        })
    })

}