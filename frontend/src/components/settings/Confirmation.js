import React, { useState } from "react"
import axios from "axios"
import clsx from 'clsx'
import { CircularProgress } from "@material-ui/core"
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core/styles"

import Fields from "../auth/Fields"
import { EmailPassword } from "../auth/Login"

const useStyles = makeStyles(theme => ({
    title: {
        color: theme.palette.error.main
    },
    button: {
        fontFamily: "Montserrat"
    }
}))

const handleConfirm = () => {

}


export default function Confirmation({ dialogOpen, setDialogOpen,user, dispatchFeedback }) {
    const classes = useStyles()
    const [values, setValues] = useState({password: "", confirmation: ""})
    const [errors, setErrors] = useState({})
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    const { password } = EmailPassword(false, false, visible, setVisible)

    const fields = {
        password: { ...password, placeholder: "Old Password"},
        confirmation: { ...password, placeholder: "New Password"}
    }

    return (
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
            <DialogTitle disableTypography>
                <Typography variant="h3" classes={{ root: classes.title }} >
                    Change Password
                </Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You are changing your password. Please confirm old password and new password.
                </DialogContentText>
                <Fields 
                    fields={fields} 
                    values={values} 
                    setValues={setValues} 
                    errors={errors}
                    setErrors={setErrors}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setDialogOpen(false)} color="primary" classes={{ root: classes.button }}>
                    Do Not Change Password
                </Button>
                <Button onClick={handleConfirm()} color="secondary" classes={{ root: classes.button }}>
                    Yes, Change My Password
                </Button>
            </DialogActions>
            
        </Dialog>
    )
}