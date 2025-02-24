import { config } from "dotenv"
import { initServer } from "./configs/server.js"
import { defaultUserAdmin } from "./src/user/user.controller.js"

config()
initServer()
defaultUserAdmin()