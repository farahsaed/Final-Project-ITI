const mongoose =require("mongoose");

var userSchema= mongoose.Schema({
    name:String,
    userId:String,
    phoneNumber:Number,
    userType:String,
    password:String
})

const User = mongoose.model("User", userSchema);

module.exports = User;