const { Schema, model } = require ('mongoose');

//create schema
const UserSchema = new Schema ({
    username : {
        type : String,
        unique : true,
        required : 'Username is required',
        trim : true
    },

    email : {
        type : String,
        required : 'Email is required',
        unique : true,
        match : '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$'
    }
})