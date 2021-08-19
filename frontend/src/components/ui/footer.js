import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'gatsby'

import facebook from '../../images/facebook.svg'
import twitter from '../../images/twitter.svg'
import instagram from '../../images/instagram.svg'

const useStyles = makeStyles(theme => ({
    footer: {
        backgroundColor: theme.palette.primary.main,
        padding: "2rem"
    },
    link: {
        color: "#fff",
        fontSize: "1.25rem"
    },
    linkColumn: {
        width: "20rem"
    },
    linkContainer: {
        [theme.breakpoints.down('md')] : {
            marginBottom: "3rem"
        }     
    },
    icon: {
        "&:hover": {
            backgroundColor: "transparent"
        }
    },
    "@global": {
        body: {
            margin: 0
        }
    }
}))

export default function Footer() {
    const classes = useStyles()

    const socialMedia = [
        {icon: facebook, alt: 'facebook', link: 'https://www.facebook.com'}, 
        {icon: twitter, alt: 'twitter', link: 'https://www.twitter.com'}, 
        {icon: instagram, alt: 'instagram', link: 'https://www.instagram.com'}
    ]

    return (
        <footer className={classes.footer}>
            <Grid container justify="space-between">

                {/* Links */}
                <Grid item classes={{root: classes.linkContainer}}>
                    <Grid container>
                        <Grid item container direction="column" classes={{root: classes.linkColumn}}>
                            <Grid item>
                                <Typography variant="h5">Contact Us</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body1" classes={{body1: classes.link}}>(555) 555-5555)</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body1" classes={{body1: classes.link}}>info@var-x.com</Typography>
                            </Grid>
                        </Grid>
                    
                        <Grid item container direction="column" classes={{root: classes.linkColumn}}>
                            <Grid item>
                                <Typography variant="h5">Customer Service</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body1" classes={{body1: classes.link}}>Contact Us</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body1" classes={{body1: classes.link}}>My Account</Typography>
                            </Grid>
                        </Grid>
                        <Grid item container direction="column" classes={{root: classes.linkColumn}}>
                            <Grid item>
                                <Typography variant="h5">Information</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body1" classes={{body1: classes.link}}>Privacy Policy</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body1" classes={{body1: classes.link}}>Terms and Conditions</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Social Media Icons*/}
                <Grid item>
                    <Grid container direction="column" alignItems="center">
                        {socialMedia.map(platform => (
                            <Grid item>
                                <IconButton classes={{ root: classes.icon }} component="a" disableRipple href={platform.link}>
                                <img src={platform.icon} alt={platform.alt} />
                                </IconButton>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </footer>
    )
}