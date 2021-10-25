import React, { useState } from "react"
import clsx from 'clsx'
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core/styles"

import Slots from "./Slots"

import card from "../../images/card.svg"

const useStyles = makeStyles(theme => ({
    number: {
        color: "#FFF",
        marginBottom: "5rem"
    },
    removeCard: {
        backgoundColor: "#FFF",
        paddingLeft: 5,
        paddingRight: 5,
        marginLeft: "2rem",
        "&:hover": {
            backgroundColor: "#FFF"
        }
    },
    removeCardText: {
        fontSize: "1rem",
        color: theme.palette.primary.main,
        fontFamily: "Philosopher",
        fontStyle: "italic"
    },
    icon: {
        marginBottom: "3rem"
    },
    paymentContainer: {
        borderLeft: "4px solid #FFF",
        position: "relative"
    },
    slotContainer: {
        position: "absolute",
        bottom: 0
    }, 
}))

export default function Payments() {
    const classes = useStyles()

    const cards = [{ last4: 1234, brand: "Visa" }]

    return (
        <Grid item container direction="column" xs={6} alignItems="center" justifyContent="center" classes={{ root: classes.paymentContainer }}>
            <Grid item>
                <img src={card} alt="payment settings" className={classes.icon}/>
            </Grid>
            <Grid item container justifyContent="center">
                <Grid item>
                    <Typography variant="h3" classes={{ root: classes.number }}>
                        {cards 
                            ? `${cards[0].brand.toUpperCase()} **** **** **** ${cards[0].last4}` 
                            : "Add A New Card During Checkout"}
                    </Typography>
                </Grid>
                { cards && (
                    <Grid item>
                        <Button variant="contained" classes={{ root: classes.removeCard }} >
                            <Typography 
                                variant="h6" 
                                classes={{ root: classes.removeCardText }}
                            >
                                remove card
                            </Typography>
                        </Button>
                   </Grid>     
                )}
            </Grid>
            <Grid item container classes={{root: classes.slotContainer}}>
                <Slots />
            </Grid>
        </Grid>
    )
}