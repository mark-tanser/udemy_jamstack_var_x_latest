import React, { useState, useEffect } from "react"
import clsx from 'clsx'
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core/styles"
import { useMediaQuery } from "@material-ui/core"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

import CheckoutNavigation from "./CheckoutNavigation"
import BillingConfirmation from "./BillingConfirmation"
import Details from "../settings/Details"
import Location from "../settings/Location"
import Shipping from "./Shipping"
import Payments from "../settings/Payments"
import Confirmation from "./Confirmation"
import Thankyou from "./Thankyou"
import validate from "../ui/validate"

const useStyles = makeStyles(theme => ({
    stepContainer: {
        width: "40rem",
        height: "25rem",
        backgroundColor: theme.palette.primary.main,
        [theme.breakpoints.down("sm")] : {
            width: "100%"
        }
    },
    container: {
        [theme.breakpoints.down("md")] : {
            marginBottom: "5rem"
        }
    },
    "@global": {
        ".MuiInput-underline:before, .MuiInput-underline:hover:not(.Mui-disabled):before": {
          borderBottom: '2px solid #fff',
        },
        ".MuiInput-underline:after": {
          borderBottom: `2px solid ${theme.palette.secondary.main}`,
        },
    }
}))

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PK)

export default function CheckoutPortal({ user }) {
    const classes = useStyles()
    const matchesMD = useMediaQuery(theme => theme.breakpoints.down("md"))
    const [selectedStep, setSelectedStep] = useState(0)
    const [detailsValues, setDetailsValues] = useState({name: "", email: "", phone: ""})
    const [billingDetails, setBillingDetails] = useState({name: "", email: "", phone: ""})
    const [detailsSlot, setDetailsSlot] = useState(0)
    const [detailsForBilling, setDetailsForBilling] = useState(false)
    const [locationValues, setLocationValues] = useState({street: "", zip: "", city: "", state: ""})
    const [billingLocation, setBillingLocation] = useState({street: "", zip: "", city: "", state: ""})
    const [locationSlot, setLocationSlot] = useState(0)
    const [locationForBilling, setLocationForBilling] = useState(false)
    const [billingSlot, setBillingSlot] = useState(0)
    const [cardError, setCardError] = useState(true)
    const [saveCard, setSaveCard] = useState(false)

    const [errors, setErrors] = useState({})

    const [order, setOrder] = useState(null)

    const [selectedShipping, setSelectedShipping] = useState(null)
    const shippingOptions = [ 
        { label: "FREE SHIPPING", price: 0 }, 
        { label: "2-DAY SHIPPING", price: 9.99 }, 
        { label: "OVERNIGHT SHIPPING", price: 29.99 }
    ]

    const errorHelper = (values, forBilling, billingValues, slot) => {
        const valid = validate(values)

        if (forBilling !== false && forBilling !== undefined) {
            // one slot has been marked as billing
            const billingValid = validate(billingValues)

            if (forBilling === slot) {
                // on same slot as one marked for billing ( ie: billing and shipping address are the same
                // then only need to validate one set
                return Object.keys(billingValid).some(value => !billingValid[value])
            } else {
                // billing and shipping address are different
                // validate both billing and shipping values
                return (
                    Object.keys(billingValid).some(value => !billingValid[value]) || 
                    Object.keys(valid).some(value => !valid[value]))
            }

        } else {
            // no slots marked as billing
            return Object.keys(valid).some(value => !valid[value])
        }
    }

    let steps = [
        {
            title: "Contact Info", 
            component: (
                <Details
                    user={user} 
                    values={detailsValues} 
                    setValues={setDetailsValues} 
                    slot={detailsSlot} 
                    setSlot={setDetailsSlot} 
                    errors={errors} 
                    setErrors={setErrors} 
                    billing={detailsForBilling}
                    setBilling={setDetailsForBilling}
                    billingValues={billingDetails}
                    setBillingValues={setBillingDetails}
                    checkout
                />
            ),
            hasActions: true,
            error: errorHelper(detailsValues, detailsForBilling, billingDetails, detailsSlot)
        },
        {
            title: "Billing Info",
            component: (    
                <Details 
                    values={billingDetails} 
                    setValues={setBillingDetails} 
                    errors={errors}
                    setErrors={setErrors}
                    checkout
                    noSlots
                />
            ),
            error: errorHelper(billingDetails)
        },
        {
            title: "Address",
            component: (
                <Location
                    user={user}
                    values={locationValues}
                    setValues={setLocationValues}
                    slot={locationSlot}
                    setSlot={setLocationSlot}
                    billing={locationForBilling}
                    setBilling={setLocationForBilling}
                    errors={errors}
                    setErrors={setErrors}
                    billingValues={billingLocation}
                    setBillingValues={setBillingLocation}
                    checkout
                 />
            ),
            hasActions: true,
            error: errorHelper(locationValues, locationForBilling, billingLocation, locationSlot)
        },
        {
            title: "Billing Address",
            component: (
                <Location 
                    values={billingLocation} 
                    setValues={setBillingLocation}
                    errors={errors}
                    setErrors={setErrors}
                    checkout
                    noSlots
                />
            ),
            error: errorHelper(billingLocation)
        },
        {
            title: "Shipping",
            component: (
                <Shipping 
                    shippingOptions={shippingOptions}
                    selectedShipping={selectedShipping}
                    setSelectedShipping={setSelectedShipping}
                />
            ),
            error: selectedShipping === null
        },
        {
            title: "Payment",
            component: (
                <Payments 
                    slot={billingSlot}
                    setSlot={setBillingSlot}
                    user={user}
                    saveCard={saveCard}
                    setSaveCard={setSaveCard}
                    setCardError={setCardError}
                    checkout
                />
            ),
            error: cardError
        },
        {
            title: "Confirmation",
            component: (
                <Confirmation 
                    user={user}
                    detailsValues={detailsValues} 
                    billingDetails={billingDetails} 
                    detailsForBilling={detailsForBilling} 
                    locationValues={locationValues} 
                    billingLocation={billingLocation} 
                    locationForBilling={locationForBilling} 
                    shippingOptions={shippingOptions} 
                    selectedShipping={selectedShipping} 
                    selectedStep={selectedStep}
                    setSelectedStep={setSelectedStep}
                    setOrder={setOrder}
                />
            )
        },
        {
            title: `Thanks ${user.username.split(" ")[0]}!`,
            component: (
                <Thankyou 
                    order={order}
                    selectedShipping={selectedShipping} 
                />
            )
        },
    ]

    if (detailsForBilling !== false) {
        steps = steps.filter(step => step.title !== "Billing Info")
    }

    if (locationForBilling !== false) {
        steps = steps.filter(step => step.title !== "Billing Address")
    }

    useEffect(() => {
        setErrors({})
    }, [detailsSlot, locationSlot, selectedStep])

    return (
        <Grid 
            item 
            container 
            alignItems={matchesMD ? "flex-start" : "flex-end"} 
            direction="column" 
            classes={{ root: classes.container }}
            lg={6}
        >
            <CheckoutNavigation 
                steps={steps} 
                selectedStep={selectedStep} 
                setSelectedStep={setSelectedStep} 
                details={detailsValues}
                setDetails={setDetailsValues}
                detailsSlot={detailsSlot}
                location={locationValues}
                setLocation={setLocationValues}
                locationSlot={locationSlot}
                setErrors={setErrors}
            />
            <Grid 
                item 
                container 
                direction="column" 
                alignItems="center" 
                classes={{ root: classes.stepContainer }}
            >
                <Elements stripe={stripePromise} >
                    {steps[selectedStep].component}
                </Elements>
            </Grid>
            {steps[selectedStep].title === "Confirmation" && 
                <BillingConfirmation 
                    detailsForBilling={detailsForBilling}
                    billingDetails={billingDetails}
                    detailsSlot={detailsSlot}
                    locationForBilling={locationForBilling}
                    billingLocation={billingLocation}
                    locationSlot = {locationSlot}
                />}
        </Grid>
    )
}