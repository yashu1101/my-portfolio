import mongoose from "mongoose";
const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    techStack: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,

    },
    description: {
        type: String
    },
    githubLink: {
        type: String
    },
    liveLink: {
        type: String
    },
}, {
    timestamps: true
})


export const Project = mongoose.model('Project', projectSchema)