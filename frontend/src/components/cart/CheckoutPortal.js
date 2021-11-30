import React, { useState, useEffect } from "react"
import clsx from 'clsx'
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core/styles"

import CheckoutNavigation from "./CheckoutNavigation"
import BillingConfirmation from "./BillingConfirmation"
import Details from "../settings/Details"
import Location from "../settings/Location"
import Shipping from "./Shipping"
import Payments from "../settings/Payments"
import Confirmation from "./Confirmation"
import validate from "../ui/validate"

const useStyles = makeStyles(theme => ({
    stepContainer: {
        width: "40rem",
        height: "25rem",
        backgroundColor: theme.palette.primary.main
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

export default function CheckoutPortal({ user }) {
    const classes = useStyles()
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
    const [saveCard, setSaveCard] = useState(false)


    const [errors, setErrors] = useState({})

    const [selectedShipping, setSelectedShipping] = useState(null)
    const shippingOptions = [ 
        { label: "FREE SHIPPING", price: 0 }, 
        { label: "2-DAY SHIPPING", price: 9.99 }, 
        { label: "OVERNIGHT SHIPPING", price: 29.99 }
    ]

    const errorHelper = (values, forBilling, billingValues, slot) => {
        const valid = validate(values)

        console.log("forBilling: ", forBilling)
        if (forBilling !== false && forBilling !== undefined) {
            console.log("// one slot has been marked as billing")
            const billingValid = validate(billingValues)

            if (forBilling === slot) {
                console.log("// on same slot as one marked for billing ( ie: billing and shipping address are the same )")
                // then only need to validate one set
                return Object.keys(billingValid).some(value => !billingValid[value])
            } else {
                console.log("// billing and shipping address are different")
                // validate both billing and shipping values
                return (
                    Object.keys(billingValid).some(value => !billingValid[value]) || 
                    Object.keys(valid).some(value => !valid[value]))
            }

        } else {
            console.log("// no slots marked as billing")
            return Object.keys(valid).some(value => !valid[value])
        }
    }

    console.log("CheckoutPortal.js locationValues: ", locationValues)

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
                    checkout
                />
            ),
            error: false
        },
        {
            title: "Confirmation",
            component: (
                <Confirmation 
                    detailsValues={detailsValues} 
                    billingDetails={billingDetails} 
                    detailsForBilling={detailsForBilling} 
                    locationValues={locationValues} 
                    billingLocation={billingLocation} 
                    locationForBilling={locationForBilling} 
                    shippingOptions={shippingOptions} 
                    selectedShipping={selectedShipping} 
                />
            )
        },
        {title: `Thanks ${user.username}!`},
    ]

    if (detailsForBilling != false) {
        steps = steps.filter(step => step.title !== "Billing Info")
    }

    if (locationForBilling != false) {
        steps = steps.filter(step => step.title !== "Billing Address")
    }

    useEffect(() => {
        setErrors({})
    }, [detailsSlot, locationSlot, selectedStep])

    return (
        <Grid 
            item 
            container 
            alignItems="flex-end" 
            direction="column" 
            xs={6}
        >
            <CheckoutNavigation 
                steps={steps} 
                selectedStep={selectedStep} 
                setSelectedStep={setSelectedStep} 
            />
            <Grid 
                item 
                container 
                direction="column" 
                alignItems="center" 
                classes={{ root: classes.stepContainer }}
            >
                {steps[selectedStep].component}
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