import { Router } from "express";
import { getLoginPage, Login, Logout } from "../controllers/auth.controller.js";

const route = Router()

route.post('/api/auth/login', Login)
route.get('/api/auth/login', getLoginPage)
route.post('/api/auth/logout', Logout)

export { route as loginRoute }

