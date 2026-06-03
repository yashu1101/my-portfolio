import {Router} from "express";
import { addSkill, addSkillForm, getSkill } from "../controllers/skill.controller.js";
import { isAuthenticated } from "../middlewares/authenticate.middleware.js";

const route = Router()

route.get('/api/skills/add', isAuthenticated, addSkillForm)
route.post('/api/skills', isAuthenticated, addSkill)
route.get('/api/skills', isAuthenticated, getSkill)

export {route as skillRoute}