const { Schema, model, Types } = require ('mongoose');

//create user schema
const UserSchema = new Schema ({
    username : {
        type : String,
        required : 'Username is required',
        unique : true,
        trim : true,
    },

    email : {
        type : String,
        required : 'Email is required',
        unique : true,
        match : [/.+@.+\..+/]  
    },

    thoughts : [{
        type : Types.ObjectId,
        ref : 'Thought'
    }],

    friends : [{
        type : Types.ObjectId,
        ref : 'User'
    }]

}, 

{
    toJSON : {
        virtuals : true
    },
    id : false
}

);

//get total count of user's friends on retrieval
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})

//create User model using UserSchema
const User = model('User', UserSchema);

//export the User model
module.exports = User;