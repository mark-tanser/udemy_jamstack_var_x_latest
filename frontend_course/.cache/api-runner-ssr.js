var plugins = [{
      plugin: require('/Users/marktanser/Dropbox/DEV/tutorials/courses/jamstack/var_x_latest/frontend_course/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/marktanser/Dropbox/DEV/tutorials/courses/jamstack/var_x_latest/frontend_course/node_modules/gatsby-plugin-material-ui/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/marktanser/Dropbox/DEV/tutorials/courses/jamstack/var_x_latest/frontend_course/node_modules/gatsby-plugin-sitemap/gatsby-ssr'),
      options: {"plugins":[],"output":"/sitemap.xml","createLinkInHead":true},
    },{
      plugin: require('/Users/marktanser/Dropbox/DEV/tutorials/courses/jamstack/var_x_latest/frontend_course/node_modules/gatsby-plugin-image/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/marktanser/Dropbox/DEV/tutorials/courses/jamstack/var_x_latest/frontend_course/node_modules/gatsby-plugin-manifest/gatsby-ssr'),
      options: {"plugins":[],"name":"VAR-X","short_name":"VAR-X","start_url":"/","background_color":"#99B898","theme_color":"#99B898","display":"minimal-ui","icon":"src/images/favicon.png","legacy":true,"theme_color_in_head":true,"cache_busting_mode":"query","crossOrigin":"anonymous","include_favicon":true,"cacheDigest":"e919d2f4353c60d76fa451819bca037c"},
    },{
      plugin: require('/Users/marktanser/Dropbox/DEV/tutorials/courses/jamstack/var_x_latest/frontend_course/node_modules/gatsby-plugin-offline/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/marktanser/Dropbox/DEV/tutorials/courses/jamstack/var_x_latest/frontend_course/gatsby-ssr'),
      options: {"plugins":[]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
