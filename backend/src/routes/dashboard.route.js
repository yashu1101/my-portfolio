import { Router } from "express";
import { Dashboard } from "../controllers/dashboard.controller.js";
import { isAuthenticated } from "../middlewares/authenticate.middleware.js";
const route = Router()

route.get('/dashboard', isAuthenticated, Dashboard)
export { route as dashboardRoute }