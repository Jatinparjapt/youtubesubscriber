const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")
const loginUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    tokens:[{
        token:{
            type:String,
            require:true,

        }
    }],
})
loginUserSchema.pre("save" , async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 12);
    }
    next()
})
module.exports = mongoose.model('subscriberLogin',loginUserSchema)