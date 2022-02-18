import React from "react"
import Grid from "@material-ui/core/Grid"
import IconButton from  "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core/styles"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const useStyles = makeStyles(theme => ({
    selected: {
        height: '40rem',
        width: '40rem',
        [theme.breakpoints.down("sm")]: {
            height: "30rem",
            width: "30rem"
        },
        [theme.breakpoints.down("xs")]: {
            height: "20rem",
            width: "20rem"
        }
    },
    small: {
        height: '5rem',
        width: '5rem',
        [theme.breakpoints.down("sm")]: {
            height: "3rem",
            width: "3rem"
        }
    },
    imageItem: {
        margin: '1rem',
    },
}))

export default function ProductImages({ images, selectedImage, setSelectedImage }) {
    const classes = useStyles()

    return (
        <Grid item container direction="column" alignItems="center" lg={6}>
            <Grid item>
                <img 
                    src={images[selectedImage].url}
                    alt="product_large"
                    className={classes.selected}
                />
            </Grid>
            <Grid item container justifyContent="center">
                {images.map((imageData,i) => {
                    const image = getIamge(imageData.localFile)
                    return (
                        <Grid 
                            onClick={() => setSelectedImage(i)}
                            item classes={{ root: classes.imageItem }} 
                            key={i}
                        >
                            <IconButton>
                                <GatsbyImage 
                                    image={image} 
                                    alt={`product_small${i}`} 
                                    className={classes.small}
                                />
                            </IconButton>
                        </Grid>
                    )
                })}
            </Grid>            
        </Grid>
    )
}