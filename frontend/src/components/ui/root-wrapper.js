import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './theme'

const element = ({ element }) => {
    return (
        <ThemeProvider theme={theme}>
        {element}
        </ThemeProvider>
    )
}

export default element

/* above replaces original code below which caused warning: Assign arrow function to a variable before exporting as module default
export default ({ element }) => {
    return (
        <ThemeProvider theme={theme}>
        {element}
        </ThemeProvider>
    )
}
*/