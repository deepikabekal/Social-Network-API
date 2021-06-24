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
    },

    thoughts : [{
        type : Schema.Types.ObjectId,
        ref : 'Thought'
    }],

    friends : [{
        type : Schema.Types.ObjectId,
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
const User = mongoose.model('User', UserSchema);

//export the User model
module.exports = User;