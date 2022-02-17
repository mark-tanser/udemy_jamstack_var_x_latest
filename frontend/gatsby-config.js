require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `Var X Udemy Course`,
    description: `Jamstack approach to eccommerce website construction`,
    author: `@gatsbyjs`,
    keywords: ["jamstack", "coding", "eccommerce"],
    siteUrl: 'https://marks-sandbox.com',
    twitterUsername: '@varx',
    defaultImage: ""
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-plugin-material-ui`,
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Philosopher:700:latin', 'Montserrat:700,600,500,400,300:latin']
        }
      }
    },
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: process.env.GATSBY_STRAPI_URL,
        queryLimit: 1000, // Defaults to 100
        collectionTypes: [`product`, `category`, `variant`], // VERY IMPORTANT TO ADD ALL COLLECTION TYPES HERE
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    /*{
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    */
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
