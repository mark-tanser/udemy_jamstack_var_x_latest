import { SET_USER } from "./action-types"

//ACTION CREATOR
export const setUser = user => ({
    //ACTION (type, payload)
    type: SET_USER,
    payload: { user }
})