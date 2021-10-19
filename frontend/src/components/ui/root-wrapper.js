<<<<<<< HEAD
import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import { ApolloWrapper } from '../../apollo/ApolloWrapper'
import { UserWrapper } from "../../contexts"
import theme from './theme'
=======
import React from "react"
import { ThemeProvider } from "@material-ui/core/styles"
import { ApolloWrapper } from "../../apollo/ApolloWrapper"
import { UserWrapper } from "../../contexts"
import theme from "./theme"
>>>>>>> afa4a13da444162954a3aafdc55d3ec62118da9b

export default ({ element }) => {
    return (
        <ThemeProvider theme={theme}>
            <ApolloWrapper>
<<<<<<< HEAD
                <UserWrapper>{element}</UserWrapper>
=======
                <UserWrapper>
                    {element}
                </UserWrapper>
>>>>>>> afa4a13da444162954a3aafdc55d3ec62118da9b
            </ApolloWrapper>       
        </ThemeProvider>
    )
}


