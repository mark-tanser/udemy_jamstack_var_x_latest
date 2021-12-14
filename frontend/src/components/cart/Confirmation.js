import React, { useState, useContext } from "react"
import axios from "axios"
import clsx from 'clsx'
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { CircularProgress } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import { Chip } from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core/styles"

import Fields from "../auth/Fields"
import { CartContext } from "../../contexts"

import confirmationIcon from "../../images/tag.svg"
import NameAdornment from "../../images/NameAdornment"
import EmailAdornment from "../../images/EmailAdornment"
import PhoneAdornment from "../../images/PhoneAdornment"
import streetAdornment from "../../images/street-adornment.svg"
import zipAdornment from "../../images/zip-adornment.svg"
import cardAdornment from "../../images/card.svg"
import promoAdornment from "../../images/promo-code.svg"

const useStyles = makeStyles(theme => ({
    nameWrapper: {
        height: 22,
        width: 22
    },
    emailWrapper: {
        height: 17,
        width: 22
    },
    phoneWrapper: {
        height: 25.122,
        width: 25.173
    },
    text: {
        fontSize: "1rem",
        color: "#fff"
    },
    card: {
        height: 18,
        width: 25
    },
    priceLabel: {
        fontSize: "1.5rem"
    },
    darkBackground: {
        backgroundColor: theme.palette.secondary.main
    },
    fieldRow: {
        height: "2.5rem"
    },
    iconWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    centerText: {
        display: "flex",
        alignItems: "center"
    },
    adornmentWrapper: {
        display: "flex",
        justifyContent: "center"
    },
    priceValue: {
        marginRight: "1rem"
    },
    fieldWrapper: {
        marginLeft: "1.25rem"
    },
    button: {
        width: "100%",
        height: "7rem",
        borderRadius: 0,
        backgroundColor: theme.palette.secondary.main,
        "&:hover": {
            backgroundColor: theme.palette.secondary.light
        }
    },
    buttonWrapper: {
        marginTop: "auto"
    },
    mainContainer: {
        height: "100%"
    },
    chipRoot: {
        backgroundColor: "#fff"
    },
    chipLabel: {
        color: theme.palette.secondary.main
    }
}))

export default function Confirmation({
    user,
    detailsValues,
    billingDetails,
    detailsForBilling,
    locationValues,
    billingLocation,
    locationForBilling,
    shippingOptions,
    selectedShipping
}) 
{
    const classes = useStyles()
    const [loading, setLoading] = useState(false)
    const { cart } = useContext(CartContext)

    const [promo, setPromo] = useState({ promo: "" })
    const [promoError, setPromoError] = useState({})

    const shipping = shippingOptions.find(option => option.label === selectedShipping)

    const subtotal = cart.reduce((total, item) => total + item.variant.price * item.qty, 0)

    const tax = subtotal * 0.075

    const firstFields = [
        {
            value: detailsValues.name,
            adornment: (
                <div className={classes.nameWrapper}>               
                    <NameAdornment color="#fff" />
                </div>
            )
        },
        {
            value: detailsValues.email,
            adornment: (
                <div className={classes.emailWrapper}>               
                    <EmailAdornment color="#fff" />
                </div>
            )
        },
        {
            value: detailsValues.phone,
            adornment: (
                <div className={classes.phoneWrapper}>               
                    <PhoneAdornment />
                </div>
            )
        },
        {
            value: locationValues.street,
            adornment: (
                <img src={streetAdornment} alt="street address" />
                
            )
        },
    ]

    const secondFields = [
        {
            value: `${locationValues.city}, ${locationValues.state} ${locationValues.zip}`,
            adornment: (
                <img src={zipAdornment} alt="city, state, zip code" />
            )
        },
        {
            value: "**** **** **** 1234",
            adornment: (
                <img src={cardAdornment} alt="credit card" className={classes.card} />
            )
        },
        {
            promo: {
                helperText: "",
                placeholder: "Promo code",
                startAdornment: <img src={promoAdornment} alt="promo code" />
            },
        }
    ]

    const prices = [
        {
            label: "SUBTOTAL",
            value: subtotal.toFixed(2)
        },
        {
            label: "SHIPPING",
            value: shipping.price.toFixed(2)
        },
        {
            label: "TAX",
            value: tax.toFixed(2)
        },
    ]

    const total = prices.reduce((total, item) => total + parseFloat(item.value), 0)

    const adornmentValue = (adornment, value) => (
        <>
            <Grid item xs={2} classes={{ root: classes.adornmentWrapper }}>
                {adornment}
            </Grid>
            <Grid item xs={10} classes={{ root: classes.centerText }}>
                <Typography variant="body1" classes={{ root: classes.text }} >
                    {value}
                </Typography>
            </Grid>
        </>
    )

    const handleOrder = () => {
        setLoading(true)

        axios.post(process.env.GATSBY_STRAPI_URL + "/orders/place", {
            shippingAddress: locationValues,
            billingAddress: billingLocation,
            shippingInfo: detailsValues,
            billingInfo: billingDetails,
            shippingOption: shipping,
            subtotal: subtotal.toFixed(2),
            tax: tax.toFixed(2),
            total: total.toFixed(2),
            items: cart,
        }, {
            headers: user.username === "Guest" ? undefined : { Authorization: `Bearer ${user.jwt}`}
        }).then(response => {
            setLoading(false)
            console.log(response)
        }).catch(error => {
            setLoading(false)
            console.error(error)
        })
    }

    return (
        <Grid itme container direction="column" classes={{ root: classes.mainContainer }}>
            <Grid item container>
                <Grid item container direction="column" xs={7}>
                    {firstFields.map((field, i) => (
                        <Grid 
                            item 
                            container 
                            key={i} 
                            alignItems="center"
                            classes={{ root: clsx(classes.fieldRow,{[classes.darkBackground]: i % 2 !== 0})}}
                        >
                            {adornmentValue(field.adornment, field.value)}
                        </Grid>
                    ))}   
                </Grid>
                <Grid item xs={5} classes={{ root: classes.iconWrapper }}>
                    <img src={confirmationIcon} alt="confirmation" />
                </Grid>
            </Grid>
            {secondFields.map((field, i) => (
                <Grid 
                    item 
                    container 
                    key={i} 
                    alignItems="center"
                    classes={{ root: clsx({[classes.darkBackground]: i % 2 !== 0})}} 
                >
                    <Grid item container xs={7}>
                        {field.promo 
                            ? (
                                <span className={classes.fieldWrapper}>
                                    <Fields 
                                        fields={field} 
                                        values={promo}
                                        setValues={setPromo}
                                        errors={promoError}
                                        setErrors={setPromoError}
                                        isWhite
                                    />
                                </span>
                            )
                            : (
                                adornmentValue(field.adornment, field.value)
                            )
                        }
                    </Grid>    
                    <Grid item container xs={5}>
                        <Grid item xs={6}>
                            <Typography variant="h5" classes={{ root: classes.priceLabel}} >
                                {prices[i].label}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography align="right" variant="body2" classes={{ root: classes.priceValue }}>
                                {`$${prices[i].value}`}
                            </Typography>
                        
                        </Grid>
                    </Grid>  
                </Grid>
            ))}
            <Grid item classes={{ root: classes.buttonWrapper }}>
                <Button classes={{ root: classes.button }} onClick={handleOrder}>
                    <Grid container justifyContent="space-around" alignItems="center">
                        <Grid item>
                            <Typography variant="h5">
                                PLACE ORDER
                            </Typography>
                        </Grid>    
                        <Grid item>
                            {loading ? <CircularProgress /> : (
                                <Chip 
                                    label={`$${total.toFixed(2)}`} 
                                    classes={{ root: classes.chipRoot, label: classes.chipLabel }} 
                                />
                            )}
                        </Grid>    
                    </Grid>
                </Button>
            </Grid>
        </Grid>
    )
}