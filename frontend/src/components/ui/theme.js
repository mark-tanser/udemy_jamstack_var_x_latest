import { createTheme } from '@material-ui/core/styles'

const green = "#99B898"
const darkGreen = "#708670"
const tan = "#FECEA8"
const lightRed = "FF847C"
const red = "#E84A5F"
const offBlack = "#2A363B"
const grey = "#747474"


const theme = createTheme({
    palette: {
        primary: {
            main: green
        },
        secondary: {
            main: darkGreen
        },
        common: {
            tan,
            lightRed,
            red,
            offBlack
        }
    },
    typography: {
        h1: {
            fontFamily: "Philosopher",
            fontSize: "4.5rem",
            fontStyle: "italic",
            fontWeight: 700,
            color: green
        },
        h2: {
            fontFamily: "Montserrat",
            fontSize: "3rem",
            fontWeight: 500,
            color: "FFF"
        },
        h3: {
            fontFamily: "Montserrat",
            fontSize: "2rem",
            fontWeight: 300
        },
        h4: {
            fontFamily: "Philosopher",
            fontSize: "3rem",
            fontStyle: "italic",
            fontWeight: 700,
            color: "FFF"
        },
        h5: {
            fontFamily: "Philosopher",
            fontSize: "2rem",
            fontStyle: "italic",
            fontWeight: 700,
            color: "FFF"
        },
        h6: {},
        body1: {
            fontFamily: "Montserrat",
            fontSize: "1.5rem",
            color: grey
        },
    },
    overrides: {}
})

export default theme