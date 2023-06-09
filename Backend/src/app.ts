import cors from "cors"
import express from "express"
import appConfig from "./2-Utils/app-config"
import catchAll from "./3-Middleware/catch-all"
import routeNotFound from "./3-Middleware/route-not-found"
import authRouter from "./6-Controllers/auth-controller"
import vacationController from "./6-Controllers/vacation-controller"
import managerController from "./6-Controllers/manager-controller"
import followController from "./6-Controllers/follow-controller"
import expressFileUpload from "express-fileupload"
import fs from "fs"

const server = express()
server.use(cors())
server.use(express.json())
server.use(expressFileUpload())


server.use("/api",authRouter)
server.use("/api",vacationController)
server.use("/api",managerController)
server.use('/api',followController)
server.use("*", routeNotFound)
server.use(catchAll)

server.listen(appConfig.port, () => console.log(`Listening on http://localhost:${appConfig.port}`))