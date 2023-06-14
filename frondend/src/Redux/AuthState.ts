import UserModel from "../Models/UserModel"
import jwtDecode from "jwt-decode"
import {createStore} from "redux"

// 1. Auth state
export class AuthState {
    public token:string = null
    public user:UserModel = null

    public constructor(){
        this.token = sessionStorage.getItem("token")
        if(this.token) {
            const container :{ user:UserModel} =jwtDecode(this.token)
            this.user = container.user
        }
    }
}


// 2. Auth action type
export enum AuthActionType{
    Register,
    Login,
    Logout
}


// 3. Auth action

export interface AuthAction {
    type: AuthActionType,
    payload?: string
}



// 4. Auth reducer

export function authReducer(currentState = new AuthState(), action:AuthAction):AuthState{


    // Duplicate current state
    const newState = {...currentState}

    // Desired action:
    switch(action.type){
        
        case AuthActionType.Register:
        case AuthActionType.Login:
            newState.token = action.payload
            const container: {user:UserModel} = jwtDecode(newState.token)
            newState.user = container.user
            sessionStorage.setItem("token",newState.token)
            break;
        case AuthActionType.Logout:
            newState.token= null
            newState.user = null
            sessionStorage.removeItem("token")
            break
    }

    // Return current state

    return newState
}


// 5. Create auth store
export const authStore = createStore(authReducer) 