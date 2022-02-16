import React, { useState, useContext } from "react"
import clsx from 'clsx'
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { Chip } from "@material-ui/core"
import { useMediaQuery } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core/styles"
import { useTheme } from "@material-ui/core"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import QtyButton from "../product-list/QtyButton"
import SubscriptionIcon from "../ui/subscription"
import SelectFrequency from "../ui/select-frequency"

import { CartContext } from "../../contexts"
import { removeFromCart, changeFrequency } from "../../contexts/actions"

import FavoriteIcon from "../ui/favorite"
import DeleteIcon from "../../images/Delete"

const useStyles = makeStyles(theme => ({
    productImage: {
        height: "10rem",
        width: "10rem"
    },
    name: {
        color: theme.palette.secondary.main
    },
    id: {
        color: theme.palette.secondary.main,
        fontSize: "1rem",
        [theme.breakpoints.down("xs")]: {
            fontSize: "0.75rem"
        }
    },
    actionWrapper: {
        height: "3rem",
        width: "3rem",
        [theme.breakpoints.down("xs")] : {
            height: "2rem",
            width: "2rem"
        }
    },
    infoContainer: {
        width: "35rem",
        height: ({ subscription }) => subscription ? "10rem" : "8rem",
        position: "relative",
        marginLeft: "1rem"
    },
    chipWrapper: {
        position: "absolute",
        top: ({ subscription }) => subscription ? "4.25rem" : "3.5rem"
    },
    itemContainer: {
        margin: "2rem 0 2rem 2rem",
        [theme.breakpoints.down("md")]: {
            margin: "2rem 0"
        }
    },
    actionButton: {
        [theme.breakpoints.down("xs")] : {
            padding: "12px 6px"
        },
        "&:hover": {
            backgroundColor: "transparent"
        }
    },
    chipRoot: {
        marginLeft: "1rem",
        "&:hover": {
            cursor: "pointer"
        }
    },
    actionContainer: {
        marginBottom: "-0.5rem"
    },
    favoriteIcon: {
        marginTop: 2
    },
    chipLabel: {
        [theme.breakpoints.down("xs")]: {
            fontSize: "1.25rem"
        }
    }
}))

export default function Item({ item }) {
    const classes = useStyles({ subscription: item.subscription })
    const theme = useTheme()
    const [frequency, setFrequency] = useState(item.subscription || "Month")
    const matchesXS = useMediaQuery(theme => theme.breakpoints.down("xs"))
    const { dispatchCart } = useContext(CartContext)

    const handleDelete = () => {
        dispatchCart(removeFromCart(item.variant, item.qty))
    }

    const handleFrequency = newFrequency => {
        dispatchCart(changeFrequency(item.variant, newFrequency))
        setFrequency(newFrequency)
    }

    const actions = [
        { component: FavoriteIcon, props: {
            color: theme.palette.secondary.main,
            size: matchesXS ? 2 : 3,
            buttonClass: clsx(classes.actionButton, classes.favoriteIcon),
            variant: item.variant.id
        }}, 
        { 
            component: SubscriptionIcon, 
            props: {
                color: theme.palette.secondary.main,
                isCart: item,
                size: matchesXS ? 2 : 3,
                cartFrequency: frequency
            } 
        },
        { icon: DeleteIcon, color: theme.palette.error.main, size: matchesXS ? "1.75rem" : "2.5rem", onClick: handleDelete }
    ]

    const image = getImage(item.variant.images[0].localFile)

    return (
        <Grid item container classes={{ root: classes.itemContainer }}>
            <Grid item>
                <GatsbyImage 
                    className={classes.productImage} 
                    image={image} 
                    alt={item.variant.id} 
                />
            </Grid>
            <Grid 
                item 
                container 
                direction={matchesXS ? "row" : "column"} 
                justifyContent="space-between"
                classes={{ root: classes.infoContainer }}
            >
                <Grid item container justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5" classes={{ root: classes.name }}>
                            {item.name}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <QtyButton 
                            name={item.name} 
                            selectedVariant={0} 
                            variants={[item.variant]} 
                            stock={[{ qty: item.stock }]} 
                            isCart
                            white
                            hideCartButton
                        />
                    </Grid>
                </Grid>
                <Grid 
                    item 
                    container 
                    alignItems="center"
                    classes={{ root: classes.chipWrapper }}
                >
                    <Grid item>
                        <Chip label={`$${item.variant.price}`} />
                    </Grid>
                    {item.subscription ? (
                        <Grid item>
                            <SelectFrequency 
                                chip={
                                    <Chip 
                                        label={`Every ${frequency}`} 
                                        classes={{ root: classes.chipRoot, label: classes.chipLabel }}
                                    />
                                } 
                                value={frequency} 
                                setValue={handleFrequency} 
                            />
                        </Grid>
                    ) : null}
                </Grid>
                <Grid item container justifyContent="space-between" alignItems="flex-end">
                    <Grid item xs={7} sm>
                        <Typography variant="body1" classes={{ root: classes.id }} >
                            ID: {item.variant.id}
                        </Typography>
                    </Grid>
                    <Grid 
                        item 
                        container 
                        justifyContent="flex-end" 
                        xs={5} 
                        sm
                        classes={{ root: classes.actionContainer }}>
                        {actions.map((action,i) => (
                            <Grid item key={i}>
                                {action.component 
                                ? (
                                    <action.component {...action.props}/>
                                ) 
                                : (
                                    <IconButton 
                                        onClick={() => action.onClick()} 
                                        disableRipple 
                                        classes={{ root: classes.actionButton }}
                                    >
                                        <span 
                                            className={classes.actionWrapper} 
                                            style={{ height: action.size, width: action.size }}
                                        >
                                            <action.icon color={action.color} />
                                        </span>
                                    </IconButton>
                                )}
                                
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}