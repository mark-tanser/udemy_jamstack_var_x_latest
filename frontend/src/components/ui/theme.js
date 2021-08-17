import { createTheme } from '@material-ui/core/styles'

const theme = createTheme({
    palette: {
        primary: {
            main: ""
        },
        secondary: {
            main: ""
        },
        common: {
            orange: "" //provide specific versions of your ad-hoc colors here
        }
    },
    typography: {
        h1: {},
        h2: {},
        h3: {},
        h4: {},
        h5: {},
        h6: {},
        body1: {},
        body2: {}
    },
    overrides: {}
})

export default theme