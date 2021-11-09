import React, { useState } from "react"
import clsx from 'clsx'
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core/styles"

import CheckoutNavigation from "./CheckoutNavigation"
import Details from "../settings/Details"
import Location from "../settings/Location"
import Shipping from "./Shipping"

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
    const [detailsSlot, setDetailsSlot] = useState(0)
    const [detailsBilling, setDetailsBilling] = useState(false)
    const [locationValues, setLocationValues] = useState({street: "", zip: "", city: "", state: ""})
    const [locationSlot, setLocationSlot] = useState(0)
    const [locationBilling, setLocationBilling] = useState(false)


    const [errors, setErrors] = useState({})

    const [selectedShipping, setSelectedShipping] = useState(null)
    const shippingOptions = [ 
        { label: "FREE SHIPPING", price: 0 }, 
        { label: "2-DAY SHIPPING", price: 9.99 }, 
        { label: "OVERNIGHT SHIPPING", price: 29.99 }
    ]

    const steps = [
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
                    checkout
                    billing={detailsBilling}
                    setBilling={setDetailsBilling}
                />
            ) 
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
                    billing={locationBilling}
                    setBilling={setLocationBilling}
                    errors={errors}
                    setErrors={setErrors}
                    checkout
                 />
            )
        },
        {
            title: "Shipping",
            component: (
                <Shipping 
                    shippingOptions={shippingOptions}
                    selectedShipping={selectedShipping}
                    setSelectedShipping={setSelectedShipping}
                />
            )
        },
        {title: "Payment"},
        {title: "Confirmation"},
        {title: `Thanks ${user.username}!`},
    ]

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
        </Grid>
    )
}