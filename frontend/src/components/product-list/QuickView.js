import React from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import { makeStyles } from "@material-ui/core/styles"

import Rating from '../home/Rating'

import frame from '../../images/selected-frame.svg'
import explore from '../../images/explore.svg'


const useStyles = makeStyles(theme => ({
    selectedFrame: {
        backgroundImage: `url(${frame})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '60.4rem',
        width: '73.5rem',
        padding: '0 !important',
    },
    dialog: {
        maxWidth: '100%',
    },
    productImage: {
        height: '40rem',
        width: '40rem',
        marginTop: '5rem',
    },
    toolbar: {
        backgroundColor: theme.palette.primary.main,
        height: '13rem',
        marginTop: '2rem',
    },
    stock: {
        color: '#fff',
    },
    details: {
        color: '#fff',
        textTransform: 'none',
        fontSize: '1.5rem'
    },
    exploreIcon: {
        height: '1.5rem',
        width: '2rem',
        marginLeft: '0.5rem',
    },
    detailButton: {
        padding: 0,
    },
    infoContainer: {
        height: '100%',
        padding: '0.5rem 1rem',
    },
}))

export default function QuickView({ open, setOpen, url, name }) {
    const classes = useStyles()

    return (
        <Dialog 
            classes={{ paper: classes.dialog }} 
            open={open} 
            onClose={() => setOpen(false)}
        >
            <DialogContent classes={{ root: classes.selectedFrame }}>
                <Grid container direction="column" alignItems="center">
                    <Grid item>
                        <img 
                            src={url} 
                            alt="product image" 
                            className={classes.productImage}/>
                    </Grid>
                    <Grid item container classes={{ root: classes.toolbar }}>
                        <Grid item>
                            <Grid container direction="column" justifyContent="space-between" classes={{ root: classes.infoContainer}}>
                                <Grid item>
                                    <Typography variant="h4">
                                        {name}
                                    </Typography>
                                    <Rating number={4}/>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h3" classes={{ root: classes.stock }}>
                                        12 Currently in Stock
                                    </Typography>
                                    <Button classes={{ root: classes.detailButton }}>
                                        <Typography variant="h3" classes={{ root: classes.details }}>
                                            Details
                                        </Typography>
                                        <img src={explore} className={classes.exploreIcon} alt="go to product detail page" />
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
        
    )
}