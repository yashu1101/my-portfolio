import mongoose from 'mongoose'
const activitySchema = mongoose.Schema({
    visitCount: {
        type: Number,
        default: 0
    },
    resumeClickCount: {
        type: Number,
        default: 0
    },
    hireClickCount: {
        type: Number,
        default: 0
    },
},{
    timestamps: true
})

export const Activity = mongoose.model('activity', activitySchema)