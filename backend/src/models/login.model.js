import mongoose from "mongoose";
const loginModel = new mongoose.Schema({
email: {
    type: String,
    required: true,
    
}
})