import { Project } from "../models/project.model.js"
import { uploadOnCloudinary } from '../services/cloudinary.service.js'
import fs from 'fs'


// ************add project************
export const addProject = async (req, res) => {
    try {
        const { title, description, techStack, githubLink, liveLink } = req.body
        if (!req.file) return res.status(400).json({ message: "Image file is required!" })
        const imagePath = req.file.path

        // upload image on cloudinary

        const imageUrl = await uploadOnCloudinary('portfolio/projects', imagePath)

        if (!imageUrl) return res.status(401).json({ message: "Upload on cloudinary is failed!" })

        fs.unlinkSync(imagePath)



        // add project data in database

        const project = await Project.create({
            title,
            description,
            techStack,
            image: imageUrl,
            githubLink,
            liveLink

        })
        console.log("project added.")
        res.redirect('/')

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
}

// ************get project************

export const getProject = async (req, res) => {
    try {
        const projects = await Project.find()

        if (!projects || projects.length === 0) return res.status(404).json({ message: "There are no any project." })
        res.status(200).json({ message: "Project found.", projects, totalProject: projects.length })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}



// **************Add project form*************


export const addProjectForm = async (req, res) => {
    try {
        res.render('projectForm')
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await Project.findByIdAndDelete(id);

        if (!project) {
            return res.redirect('/');
        }

        res.redirect('/');
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}