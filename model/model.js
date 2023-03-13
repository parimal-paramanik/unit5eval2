


const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        
        default: "user",
        enum: ["user","seller"]
    
    }
})

const userModel = mongoose.model("user", userSchema)

module.exports = {
    userModel
}