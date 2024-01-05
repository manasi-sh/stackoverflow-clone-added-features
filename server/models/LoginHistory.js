import mongoose from "mongoose";

const loginHistory = mongoose.Schema({
    userId: {type:String},
    timestamp: {type:Date},
    ip: {type:String},
    userBrowser: {type: String},
    userOs: {type:String},
    userDevice: {type: String},
})

export default mongoose.model('LoginHistory', loginHistory);