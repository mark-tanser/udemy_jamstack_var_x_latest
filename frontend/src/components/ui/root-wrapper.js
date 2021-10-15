import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import { ApolloWrapper } from '../../apollo/ApolloWrapper'
//import { UserWrapper } from "../../contexts"
import theme from './theme'

const element = ({ element }) => {
    return (
        <ThemeProvider theme={theme}>
            <ApolloWrapper>
                {element}
            </ApolloWrapper>       
        </ThemeProvider>
    )
}

export default element

