import React, { useState } from "react"
import clsx from 'clsx'
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import Chip from "@material-ui/core/Chip"
import { makeStyles } from "@material-ui/core/styles"

import Rating from "../home/Rating"

import favorite from '../../images/favorite.svg'
import subscription from '../../images/subscription.svg'



const useStyles = makeStyles(theme => ({
    background: {
        backgroundColor: theme.palette.secondary.main,
        height: "45rem",
        width: "35rem",
    },
    center: {
        backgroundColor: theme.palette.primary.main,
        height: "35rem",
        width: "45rem",
        position: "absolute",
    },
    icon: {
        height: "4rem",
        width: "4rem",
        margin: "0.5rem 1rem"
    },
    sectionContainer: {
        height: 'calc(100% / 3)'
    },
    descriptionContainer: {
        backgroundColor: theme.palette.secondary.main,
        overflowY: "auto",
        padding: "0.5rem 1rem",
    },
    name: {
        color: "#fff"
    },
    reviewButton: {
        textTransform: 'none'
    },
    detailsContainer: {
        padding: "0.5rem 1rem",
    },
    chipContainer: {
        marginTop: "1rem"
    },
    chipRoot: {
        height: "3rem",
        width: "10rem",
        borderRadius: 50,
    },
    chipLabel: {
        fontSize: "2rem"
    },
}))

export default function ProductInfo({ name, description, variants, selectedVariant, setSelectedVariant}) {
    const classes = useStyles()

    return (
        <Grid 
            item 
            container 
            justifyContent="center" 
            direction="column" 
            xs={6}
            alignItems="flex-end"
        >
            <Grid 
                item 
                container 
                justifyContent="flex-end"
                classes={{ root: classes.background }}
            >
                <Grid item>
                    <img src={favorite} alt="add item to favorites" className={classes.icon} />
                </Grid>
                <Grid item>
                    <img src={subscription} alt="add item to subscriptions" className={classes.icon} />
                </Grid>
            </Grid>
            <Grid 
                item 
                container 
                direction="column" 
                classes={{ root: classes.center }}
            >
                <Grid item container justifyContent="space-between" classes={{ root: clsx(classes.detailsContainer, classes.sectionContainer) }}>
                    <Grid item>
                        <Grid container direction="column">
                            <Grid item>
                                <Typography variant="h1" classes={{ root: classes.name }}>{name.split(" ")[0]}</Typography>
                            </Grid>
                            <Grid item>
                                <Rating number={4.5}/>
                            </Grid>
                            <Grid item>
                                <Button>
                                    <Typography variant="body2" classes={{ root: classes.reviewButton }}>Leave A Review</Typography> 
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item classes={{ root: classes.chipContainer}}>
                        <Chip label={`$${variants[selectedVariant].price}`} classes={{ root: classes.chipRoot, label: classes.chipLabel }} />
                    </Grid>

                </Grid>

                <Grid item container classes={{ root: clsx(classes.sectionContainer, classes.descriptionContainer) }}>
                    <Grid item>
                        <Typography variant="h5">Description</Typography>
                        <Typography variant="body2">{description}</Typography>
                    </Grid>
                </Grid>

                <Grid item container classes={{ root: classes.sectionContainer }}>
                    
                </Grid>
            </Grid>
            
        </Grid>
    )
}