import { Router } from "express";
import { isAuthenticated } from "../middlewares/authenticate.middleware.js";
import { getAnalytics, resumeButtonCount, visitCount, visitorInfo } from "../controllers/analytics.controller.js";
const route = Router()


route.post('/api/visitor-info', visitorInfo)
route.patch('/api/visit-count', visitCount)
route.patch('/api/resume-count', resumeButtonCount)


route.get('/api/analytics', isAuthenticated, getAnalytics)

export { route as analyticsRoute }