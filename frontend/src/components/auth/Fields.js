import React, { useState } from "react"
import clsx from 'clsx'
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core/styles"

import TextField from "@material-ui/core/TextField"
import InputAdornment from "@material-ui/core/InputAdornment"

import validate from "../ui/validate"

const useStyles = makeStyles(theme => ({
    textField: {
        width: "20rem"
    },
    input: {
        color: theme.palette.secondary.main,
    },
}))

export default function Fields({ fields, errors, setErrors, values, setValues}) {
    const classes = useStyles()

    return (
        Object.keys(fields).map(field => {
            const validateHelper = (event) => {
                const valid = validate({ [field]: event.target.value })
                    setErrors({ ...errors, [field]: !valid[field] })
            }

            return !fields[field].hidden ? (
                <Grid item key={field}>
                    <TextField 
                        value={values[field]} 
                        onChange={e => {
                            if (errors[field]) {
                                validateHelper(e)
                            }
                            setValues({...values, [field]: e.target.value })
                        }}
                        classes={{root: classes.textField}}
                        onBlur={e => {validateHelper(e)}}
                        error={errors[field]}
                        helperText={errors[field] && fields[field].helperText}
                        placeholder={fields[field].placeholder} 
                        type={fields[field].type}
                        InputProps={{ 
                            startAdornment: (
                                <InputAdornment position="start">
                                    {fields[field].startAdornment}
                                </InputAdornment>
                            ),
                            endAdornment: fields[field].endAdornment ? (
                                <InputAdornment position="end">
                                    {fields[field].endAdornment}
                                </InputAdornment>
                            ) : undefined,
                            classes: { input: classes.input }
                        }} 
                    />
                </Grid>
            ) : null
        })
    )
}