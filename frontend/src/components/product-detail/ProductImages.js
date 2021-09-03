import React, { useState } from "react"
import clsx from 'clsx'
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from  "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    selected: {
        height: '40rem',
        width: '40rem'
    },
    small: {
        height: '5rem',
        width: '5rem'
    },
    imageItem: {
        margin: '1rem',
    },
}))

export default function ProductImages({ images, selectedImage, setSelectedImage }) {
    const classes = useStyles()

    return (
        <Grid item container direction="column" alignItems="center" xs={6}>
            <Grid item>
                <img 
                    src={process.env.GATSBY_STRAPI_URL + images[selectedImage].url}
                    alt="product_large"
                    className={classes.selected}
                />
            </Grid>
            <Grid item container justifyContent="center">
                {images.map((image,i) => (
                    <Grid 
                        onClick={() => setSelectedImage(i)}
                        item classes={{ root: classes.imageItem }} 
                        key={image.url}
                    >
                        <IconButton>
                            <img 
                                src={process.env.GATSBY_STRAPI_URL + image.url} 
                                alt={'product_small${i}'} 
                                className={classes.small}
                            />
                        </IconButton>
                    </Grid>
                ))}
            </Grid>            
        </Grid>
    )
}