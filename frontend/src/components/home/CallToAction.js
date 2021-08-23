import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'gatsby'

import cta from '../../images/cta.svg'

const useStyles = makeStyles(theme => ({
    account: {
        color: '#fff',
        marginLeft: '3rem',
    },
    body: {
        maxWidth: '45rem',
    },
    container: {
        marginBottom: '15rem',
    },
    buttonContainer: {
        marginTop: '2rem',
    },
}))

export default function CallToAction() {
    const classes = useStyles()

    return (
        <Grid 
            container 
            justifyContent="space-around" 
            alignItems="center"
            classes={{ root: classes.container }}
            >
                <Grid item>
                    <img src={cta} alt="quality committed" />
                </Grid>
                <Grid item>
                    <Grid container direction="column">
                        <Grid item>
                            <Typography variant="h1">
                                Commited To Quality
                            </Typography>
                        </Grid>
                        <Grid item classes={{ root: classes.body }}>
                            <Typography variant="body1">
                                At VAR X our mission is top provide confortable, durable,
                                premium, designer clothing and clothing accessories to
                                developers and technology enthusiasts.
                            </Typography>
                        </Grid>
                        <Grid 
                            item 
                            container 
                            classes={{ root: classes.buttonContainer }}
                        >
                            <Grid item>
                                <Button 
                                    component={Link} 
                                    to="/contact" 
                                    variant="outlined" 
                                    color="primary"
                                >
                                    Contact Us
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button 
                                    component={Link} 
                                    to="/account" 
                                    variant="contained" 
                                    color="primary" 
                                    classes={{ root: classes.account }}
                                >
                                    Account
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
        </Grid>
    )
}

