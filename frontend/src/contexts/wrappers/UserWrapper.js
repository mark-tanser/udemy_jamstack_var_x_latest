import React, { useReducer, createContext } from "react"
import userReducer from "../reducers/user-reducer"
import { setUser } from "../actions"

<<<<<<< HEAD
=======

>>>>>>> afa4a13da444162954a3aafdc55d3ec62118da9b
export const UserContext = createContext()
const UserProvider = UserContext.Provider

export function UserWrapper({ children }) {
    const defaultUser = { username: "Guest" }
    const [user, dispatchUser] = useReducer(userReducer, defaultUser)

    return (
        <UserProvider value={{ user, dispatchUser, defaultUser }}>
            {children}
        </UserProvider>
    )
<<<<<<< HEAD
}
=======
}
>>>>>>> afa4a13da444162954a3aafdc55d3ec62118da9b
