import React, { useState } from "react"
import axios from "axios"
import clsx from 'clsx'
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"

import { makeStyles } from "@material-ui/core/styles"

import Fields from "./Fields"

import accountIcon from "../../images/account.svg"
import EmailAdornment from "../../images/EmailAdornment"
import passwordAdornment from "../../images/password-adornment.svg"
import hidePasswordIcon from "../../images/hide-password.svg"
import showPasswordIcon from "../../images/show-password.svg"
import addUserIcon from "../../images/add-user.svg"
import forgotPasswordIcon from "../../images/forgot.svg"
import closeIcon from "../../images/close.svg"



const useStyles = makeStyles(theme => ({
    emailAdornment: {
        height: 17,
        width: 22,
        marginBottom: 10
    },
    accountIcon: {
        marginTop: "2rem"
    },
    
    login: {
        width: "20rem",
        borderRadius: 50,
        textTransform: "none"
    },
    facebookButton: {
        marginTop: "-1rem",
    },
    facebookText: {
        fontSize: "1.5rem",
        fontWeight: 600,
        textTransform: "None"
    },
    visibleIcon: {
        padding: 0
    },
    passwordError: {
        marginTop: "0rem",
    },
    close: {
        paddingTop: 5
    },
    reset: {
        marginTop: "-4rem"
    },
}))

export const EmailPassword = (classes, hideEmail, hidePassword, visible, setVisible) => (
    {
        email: {
            helperText: "invalid email",
            placeholder: "Email",
            type: "text",
            hidden: hideEmail,
            startAdornment: (
                <span className={classes.emailAdornment}>
                    <EmailAdornment />
                </span>
            )
        },
        password: {
            helperText: "your password must be at least eight characters and you include one uppercase letter, one number, and one special character",
            placeholder: "Password",
            hidden: hidePassword,
            type: visible ? "text" : "password",
            startAdornment: <img src={passwordAdornment} alt="password" />,
            endAdornment: (
                <IconButton 
                    classes={{ root: classes.visibleIcon }} 
                    onClick={() => setVisible(!visible)}
                >
                    <img 
                        src={visible ? showPasswordIcon : hidePasswordIcon} 
                        alt={`${visible ? "Show" : "Hide"} Password`} 
                    />
                </IconButton>
                
            ),
        },
    }
)

export default function Login({ steps, setSelectedStep }) {
    const classes = useStyles()

    const [values,setValues] = useState({
        email: "",
        password: ""
    })

    const [errors, setErrors] = useState({})
    const [visible, setVisible] = useState(false)
    const [forgot, setForgot] = useState(false)

    const fields = EmailPassword(classes, false, forgot, visible, setVisible)

    const navigateSignUp = () => {
        const signUp = steps.find(step => step.label === "Sign Up")

        setSelectedStep(steps.indexOf(signUp))
    }

    const handleLogin = () => {
        axios.post(process.env.GATSBY_STRAPI_URL + '/auth/local', {
            identifier: values.email, 
            password: values.password
        }).then(response => {
            console.log("User Profile", response.data.user)
            console.log("JWT", response.data.jwt)
        }).catch(error => {
            console.error(error)
        })
    }

    const disabled = Object.keys(errors).some(error => errors[error] === true) || 
        Object.keys(errors).length !== Object.keys(values).length

    return (
        <>
            <Grid item classes={{ root: classes.accountIcon }}>
                <img src={accountIcon} alt="login page" />
            </Grid>
            
            <Fields fields={fields} errors={errors} setErrors={setErrors} values={values} setValues={setValues} />
            <Grid item>
                <Button 
                    variant="contained" 
                    color="secondary" 
                    disabled={!forgot && disabled}
                    onClick={() => forgot ? null : handleLogin}
                    classes={{ root: clsx(classes.login, {[classes.reset]: forgot
                    }) }}
                >
                    <Typography variant="h5">
                        {forgot ? "reset password" : "login"}
                    </Typography>
                </Button>
            </Grid>

            {forgot ? null : (
                <Grid item>
                    <Button classes={{ root: clsx(classes.facebookButton, {
                        [classes.passwordError]: errors.password
                    }) }}>
                        <Typography variant="h3" classes={{ root: classes.facebookText }}>
                            login with Facebook
                        </Typography>
                    </Button>
                </Grid>
            )}
            
            <Grid item container justifyContent="space-between">
                <Grid item>
                    <IconButton onClick={navigateSignUp}>
                        <img src={addUserIcon} alt="sign up" />
                    </IconButton>
                </Grid>
                <Grid item classes={{ root: clsx({
                    [classes.close]: forgot
                }) }}>
                    <IconButton onClick={() => setForgot(!forgot)}>
                        <img src={forgot ? closeIcon : forgotPasswordIcon} alt={forgot ? "back to login" : "forgot password"} />
                    </IconButton>
                </Grid>
            </Grid>
        </>
    )
}