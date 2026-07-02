import mongoose from "mongoose";

const visitorInfoSchema = mongoose.Schema({
    visitorBrowser: {
        type: String
    },
    visitorOS: {
        type: String
    },
    visitorDevice: {
        type: String
    },
    visitorSource: {
        type: String
    },
    
    visitorCity: {
        type: String
    },
    visitorRegion: {
        type: String
    },
    visitorCountry: {
        type: String
    },
    visitorISP: {
        type: String
    },
    visitorORG: {
        type: String
    },


}, { timestamps: true })



export const VisitorInfo = mongoose.model('visitorInfo', visitorInfoSchema)