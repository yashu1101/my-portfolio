import { Project } from "../models/project.model.js"

export const Dashboard = async (req, res) => {
    try {
        const projects = await Project.find()
        console.log(projects)
        res.render('dashboard', { projects, skills: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "MongoDB"] })
    } catch (error) {
        res.status(500).json({ message: "Internal server problem!" })
    }
}