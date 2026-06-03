import { Router } from "express";
import { addProject, addProjectForm, deleteProject, getProject } from "../controllers/project.controller.js";
import { isAuthenticated } from "../middlewares/authenticate.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const route = Router()

route.get('/api/projects/add', isAuthenticated, addProjectForm)
route.post('/api/projects', isAuthenticated, upload.single('image'), addProject)
route.post('/api/projects/delete/:id', isAuthenticated, deleteProject)
route.get('/api/projects', getProject)

export { route as projectRoute }