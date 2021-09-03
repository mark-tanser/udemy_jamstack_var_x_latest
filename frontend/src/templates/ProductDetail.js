import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Layout from '../components/ui/layout'
import ProductImages from '../components/product-detail/ProductImages'
import ProductInfo from '../components/product-detail/ProductInfo'

export default function ProductDetail({ pageContext: { name, id, category, description, variants, product} }) {
    const [selectedVariant, setSelectedVariant] = useState(0)
    const [selectedImage, setSelectedImage] = useState(0)

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const styledVariant = variants.filter(variant => variant.style === params.get("style"))[0]

        var recentlyViewed = JSON.parse(window.localStorage.getItem("recentlyViewed"))

        if (recentlyViewed) {
            //only store last 10 viewed products
            if (recentlyViewed.length == 10) {
                recentlyViewed.shift() //removes 1st element (oldest)
            }

            if (!recentlyViewed.some(product => product.node.name === name)) {recentlyViewed.push(product)}

        } else {
            recentlyViewed = [product]
        }

        window.localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed))

        setSelectedVariant(variants.indexOf(styledVariant))
    }, [])

    return (
        <Layout>
            <Grid container direction="column">
                <Grid item container>
                    <ProductImages 
                        images={variants[selectedVariant].images} 
                        selectedImage={selectedImage}
                        setSelectedImage={setSelectedImage}
                    />
                    <ProductInfo 
                        name={name}
                        description={description}
                        variants={variants}
                        selectedVariant={selectedVariant}
                        setSelectedVariant={setSelectedVariant}
                    />
                </Grid>
            </Grid>
        </Layout>

    )
}