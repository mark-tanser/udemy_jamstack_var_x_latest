import React, { useState, useContext, useEffect } from "react"
import clsx from 'clsx'
import Grid from "@material-ui/core/Grid"
import { Typography } from "@material-ui/core"

import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { makeStyles } from "@material-ui/core/styles"

import Details from "./Details"
import Payments from "./Payments"
import Location from "./Location"
import Edit from "./Edit"

import { UserContext } from "../../contexts"

const useStyles = makeStyles(theme => ({
    bottomRow: {
        borderTop: "4px solid #FFF"
    },
    sectionContainer: {
        height: "50%"
    }
}))

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PK)

export default function Settings({ setSelectedSetting }) {
    const classes = useStyles()
    const { user, dispatchUser } = useContext(UserContext)
    const [edit, setEdit]  = useState(false)
    const [changesMade, setChangesMade] = useState(false)
    const [detailsValues, setDetailsValues] = useState({name: "", phone: "", email: "", password: "********"})
    const [detailsSlot, setDetailsSlot] = useState(0)
    const [detailsErrors, setDetailsErrors] = useState({})
    const [locationValues, setLocationValues] = useState({street: "", zip: "", city: "", state: ""})
    const [locationSlot, setLocationSlot] = useState(0)
    const [locationErrors, setLocationErrors] = useState({})

    const [billingSlot, setBillingSlot] = useState(0)

    const allErrors = { ...detailsErrors, ...locationErrors}
    const isError = Object.keys(allErrors).some(error => allErrors[error] === true)

    useEffect(() => {
        setDetailsErrors({})
    }, [detailsSlot])
        
    useEffect(() => {
        setLocationErrors({})
    }, [locationSlot])
    
    return (
       <>
            <Grid container classes={{ root: classes.sectionContainer }}>
                <Details 
                    user={user} 
                    edit={edit} 
                    setChangesMade={setChangesMade}
                    values={detailsValues}
                    setValues={setDetailsValues}
                    slot={detailsSlot}
                    setSlot={setDetailsSlot}
                    errors={detailsErrors}
                    setErrors={setDetailsErrors}
                />
            <Elements stripe={stripePromise}>
                <Payments 
                    user={user} 
                    edit={edit}
                    slot={billingSlot}
                    setSlot={setBillingSlot}
                />
            </Elements>
            </Grid>
            <Grid 
                container 
                classes={{ root: clsx(classes.bottomRow, classes.sectionContainer) }}
            >
                <Location 
                    user={user} 
                    edit={edit}
                    setChangesMade={setChangesMade}
                    values={locationValues}
                    setValues={setLocationValues}
                    slot={locationSlot}
                    setSlot={setLocationSlot}
                    errors={locationErrors}
                    setErrors={setLocationErrors}
                />
                <Edit 
                    user={user} 
                    dispatchUser={dispatchUser}
                    edit={edit}
                    setEdit={setEdit} 
                    setSelectedSetting={setSelectedSetting}
                    changesMade={changesMade}
                    details={detailsValues}
                    locations={locationValues}
                    detailsSlot={detailsSlot}
                    locationSlot={locationSlot}
                    isError={isError}
                />
            </Grid>
       </>
    )
}