import React, { useState, useContext } from "react"
import clsx from 'clsx'
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
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

export default function Settings({ setSelectedSetting }) {
    const classes = useStyles()
    const { user } = useContext(UserContext)
    const [edit, setEdit]  = useState(false)
    const [changesMade, setChangesMade] = useState(false)
    const [detailsValues, setDetailsValues] = useState({name: "", phone: "", email: "", password: "********"})
    const [locationValues, locationSetValues] = useState({street: "", zip: "", city: "", state: ""})
    const [locationSlot, setLocationSlot] = useState(0)
    const [detailsSlot, setDetailsSlot] = useState(0)

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
                />
                <Payments 
                    user={user} 
                    edit={edit}
                />
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
                    setValues={locationSetValues}
                    slot={locationSlot}
                    setSlot={setLocationSlot}
                />
                <Edit 
                    user={user} 
                    edit={edit}
                    setEdit={setEdit} 
                    setSelectedSetting={setSelectedSetting}
                    changesMade={changesMade}
                    details={detailsValues}
                    locations={locationValues}
                    detailsSlot={detailsSlot}
                    locationSlot={locationSlot}
                />
            </Grid>
       </>
    )
}