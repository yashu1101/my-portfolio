import mongoose from 'mongoose'

export const DB = async (url) => {
    try {
        const conn = await mongoose.connect(url)
        console.log("Database Connected.")
    } catch (error) {
        console.log("Database Not Connected!" + error.message)
    }
}