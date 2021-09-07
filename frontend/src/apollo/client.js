import fetch from 'cross-fetch'
import { ApolloCLient, InMemoryCache, HttpLink } from '@apollo/client'

export const client = new ApolloCLient({
    link: new HttpLink({
        uri: process.env.GATSBY_STRAPI_URL + '/graphql',
        fetch
    }),
    cache: new InMemoryCache()
})