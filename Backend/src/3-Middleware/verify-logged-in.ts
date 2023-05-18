import { NextFunction,Request,Response } from "express";
import authCyber from "../2-Utils/auth-cyber";
import { UnauthorizedErrorModel } from "../4-Models/error-model";

async function verifyLoggedIn( request: Request, response: Response, next: NextFunction) {
    try {
        
        const loggedIn = await authCyber.verifyToken(request)
        if(!loggedIn) throw new UnauthorizedErrorModel("You are not logged in")
        next()
    } catch (err:any) {
        next(err)
    }
}

export default verifyLoggedIn;