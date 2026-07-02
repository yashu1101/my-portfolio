import mongoose from "mongoose";
const skillSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    }


},
    {
        timestamps: true
    }
)

export const Skill = mongoose.model('Skill', skillSchema)