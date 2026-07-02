import { Router } from "express";
import { isAuthenticated } from "../middlewares/authenticate.middleware.js";
import { getAnalytics, resetAnalytics, resumeButtonCount, visitCount, visitorInfo } from "../controllers/analytics.controller.js";
const route = Router()


route.post('/api/visitor-info', visitorInfo)
route.patch('/api/visit-count', visitCount)
route.patch('/api/resume-count', resumeButtonCount)
route.post('/api/reset-analytics', isAuthenticated, resetAnalytics)


route.get('/api/analytics', isAuthenticated, getAnalytics)

export { route as analyticsRoute }