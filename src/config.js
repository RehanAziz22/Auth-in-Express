const mongoose = require('mongoose')
const connect  = mongoose.connect('mongodb+srv://rehanaziz284:dbUserPassword@cluster0.cqtku.mongodb.net/')


connect.then(()=>{
    console.log("Database connected")
}).catch(()=>{
    console.log("can not connect to database")
})

const LoginSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})

const collection = new mongoose.model('users',LoginSchema)

module.exports = collection;