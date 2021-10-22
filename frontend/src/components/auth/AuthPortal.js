import React, { useState, useContext, useEffect } from "react"
import axios from "axios"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import { makeStyles } from "@material-ui/core/styles"

import Login from "./Login"
import SignUp from "./SignUp"
import Complete from "./Complete"
import Reset from "./Reset"
import { UserContext, FeedbackContext } from "../../contexts"
import { setUser, setSnackbar } from "../../contexts/actions"

const useStyles = makeStyles(theme => ({
    container: {
        marginBottom: "8rem",
        [theme.breakpoints.down("md")]: {
            marginTop: "5rem"
        }
    },
    paper: {
        border: `2rem solid ${theme.palette.secondary.main}`,
        width: "50rem",
        height: "40rem",
        borderRadius: 0,
        [theme.breakpoints.down("md")]: {
            width: "30rem"
        },
        [theme.breakpoints.down("xs")]: {
            width: "calc(100vw - 2rem)",
            borderWidth: "1rem"
        }
    },
    inner: {
        height: "40rem",
        width: "100%",
        border: `2rem solid ${theme.palette.primary.main}`,
        [theme.breakpoints.down("xs")]: {
            width: "calc(100vw - 2rem)",
            borderWidth: "1rem"
        }
    },
    "@global": {
        ".MuiInput-underline:before, .MuiInput-underline:hover:not(.Mui-disabled):before": {
          borderBottom: `2px solid ${theme.palette.secondary.main}`,
        },
        ".MuiInput-underline:after": {
          borderBottom: `2px solid ${theme.palette.primary.main}`,
        },
    },
}))

export default function AuthPortal() {
    const classes = useStyles()
    const [selectedStep, setSelectedStep] = useState(0)
    const { user, dispatchUser } = useContext(UserContext)
    const { feedback, dispatchFeedback } = useContext(FeedbackContext)

    const steps = [
        { component: Login, label: "Login" }, 
        { component: SignUp, label: "Sign Up" },
        { component: Complete, label: "Complete" },
        { component: Reset, label: "Reset" }
    ]
    
    useEffect(() => {
        //extract code from password reset link URL
        const params = new URLSearchParams(window.location.search)
        const code = params.get("code")
        const access_token = params.get("access_token")

        if (code) {
            const resetStep = steps.find(step => step.label === "Reset")
            setSelectedStep(steps.indexOf(resetStep))
        } else if (access_token) {
            axios.get(process.env.GATSBY_STRAPI_URL + "/auth/facebook/callback", {
                params: { access_token }
            }).then(response => {
                dispatchUser(setUser({ ...response.data.user, jwt: response.data.jwt, onboarding: true }))

                window.history.replaceState(null, null, window.location.pathname)
            }).catch(error => {
                console.error(error)
                dispatchFeedback(setSnackbar({ "status": "error", message: "Connecting to Facebook failed, please try again!"}))
            })
        }
    }, [])

    return (
        <Grid container justifyContent="center" classes={{ root: classes.container }}>
            <Grid item>
                <Paper elevation={6} classes={{ root: classes.paper}}>
                    <Grid container 
                        direction="column" 
                        justifyContent="space-between" 
                        alignItems="center" 
                        classes={{ root: classes.inner }}
                    >
                        {steps.map((Step, i) => 
                            selectedStep === i ? (
                                <Step.component 
                                    setSelectedStep={setSelectedStep} 
                                    steps={steps}
                                    user={user}
                                    dispatchUser={dispatchUser}
                                    feedback={feedback}
                                    dispatchFeedback={dispatchFeedback}
                                    key={Step.label}
                                /> 
                            ) : null
                        )}
                    </Grid>
                </Paper>
            </Grid>
            
        </Grid>
    )
}