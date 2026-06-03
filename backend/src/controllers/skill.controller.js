import { Skill } from "../models/skill.model.js";

// ************add skill************
export const addSkill = async (req, res) => {
    try {

        const { title } = req.body;

        // check if skill already exists

        const isSkillExist = await Skill.findOne({ title })
        if (isSkillExist) return res.status(400).json({ message: "Skill already exists!" })

        // add new skill

        const skill = await Skill.create({ title })
        res.status(201).json({ message: "Skill added.", skill });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// ************get skill************
export const getSkill = async (req, res) => {
    try {
        const skills = await Skill.find()
        if (!skills || skills.length === 0) return res.status(404).json({ message: "There are no any skill." })
        res.status(200).json({ message: "Skills found.", skills, totalSkills: skills.length })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// ***************Add skill form*************
export const addSkillForm = async (req, res) => {
    try {
        res.render('skillForm')
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}