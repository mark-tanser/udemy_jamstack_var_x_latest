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
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: "https://marks-sandbox.com",
        sitemap: "https://marks-sandbox.com/sitemap.xml",
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
    {
      resolve: `gatsby-plugin-web-font-loader`,
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
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`],
          placeholder: `blurred`,
          breakpoints: [300, 600, 960, 1280, 1920]
        }
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `VAR-X`,
        short_name: `VAR-X`,
        start_url: `/`,
        background_color: `#99B898`,
        theme_color: `#99B898`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`,
      },
    },
    
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
