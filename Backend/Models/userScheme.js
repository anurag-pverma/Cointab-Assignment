import mongoose from 'mongoose'




const blogSchema = new mongoose.Schema({
    name:{
        type: String,
        unique: true,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        required: true,
    }
    passwror
   

  });