import React, { useContext, useState, useEffect } from "react"
import axios from "axios"
import clsx from 'clsx'
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { DataGrid } from "@material-ui/data-grid"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import { Chip } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import Sizes from "../product-list/Sizes"
import Swatches from "../product-list/Swatches"
import QtyButton from "../product-list/QtyButton"

import Delete from "../../images/Delete"

import { UserContext, FeedbackContext } from "../../contexts"
import { setSnackbar } from "../../contexts/actions"

const useStyles = makeStyles(theme => ({
    container: {
        height: "100%",
        width: "100%"
    },
    image: {
        height: "10rem",
        width: "10rem"
    },
    name: {
        color: "#fff"
    },
    chipRoot: {
        height: "3rem",
        width: "10rem",
        borderRadius: 50
    },
    deleteWrapper: {
        height: "2rem",
        width: "2rem"
    }
}))

export default function Favorites() {
    const classes = useStyles()
    const [products, setProducts] = useState([])
    const { user } = useContext(UserContext)
    const { dispatchFeedback } = useContext(FeedbackContext)

    const createData = data => 
        data.map(item => ({
            item: { 
                name: item.variants[0].product.name.split(" ")[0], 
                image: item.variants[0].images[0].url 
            },
            variant: { all: item.variants, current: item.variant },
            quantity: item.variants,
            price: item.variants[0].price,
            id: item.id
        }))

    const columns = [
        { field: "item", headerName: "Item", width: 250, renderCell: ({ value }) => (
            <Grid container direction="column">
                <Grid item>
                    <img 
                        src={process.env.GATSBY_STRAPI_URL + value.image} 
                        alt={value.name} 
                        className={classes.image} 
                    />
                </Grid>
                <Grid item>
                    <Typography variant="h3" classses={{ root: classes.name }}>
                        {value.name}
                    </Typography>
                </Grid>
            </Grid>
        ) }, 
        { field: "variant", headerName: "Variant", width: 275, sortable: false, renderCell: ({ value }) => (
            <Grid container direction="column">
                {value.current.id}
            </Grid>
        ) }, 
        { field: "quantity", headerName: "Quantity", width: 250, sortable: false, renderCell: ({ value }) => (
            <div>{value.id}</div>
        ) },
        { field: "price", headerName: "Price", width: 250, renderCell: ({ value }) => (
            <Chip classes={{ root: classes.chipRoot }} label={`$${value}`} />
        ) }, 
        { field: "", width: 500, sortable: false, renderCell: ({ value }) => (
            <IconButton>
                <span className={classes.deleteWrapper} >
                    <Delete />
                </span>
            </IconButton>
        ) }
    ]

    const rows = createData(products)
    

    useEffect(() => {
        axios
            .get(process.env.GATSBY_STRAPI_URL + "/favorites/userFavorites", {
                headers: { Authorization: `Bearer ${user.jwt}` } 
            })
            .then(response => { setProducts(response.data) })
            .catch(error => {
                console.log(error)
                dispatchFeedback(setSnackbar(
                    {status: "ewrror", 
                    message: "There was a problem getting your favorite products. PLease try again."})
                )
            })
    }, [])

    return (
        <Grid item container classes={{ root: classes.container }}>
            <DataGrid 
                hideFooterSelectedRowCount 
                rows={rows} 
                columns={columns} 
                pageSize={5}
            />
        </Grid>
    )
}