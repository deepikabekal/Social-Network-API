const {Schema, model} = require ('mongoose');
var format = require('date-fns/format');
const ReactionSchema = require ('./Reaction');


//create schema
const ThoughtSchema = new Schema ({
    thoughtText : {
        type : String,
        required : 'Thought is required',
        min : 1,
        max : 280
    },

    createdAt : {
        type : Date,
        default : Date.now,
        get : (createdAtVal) => {
            return format (new Date(createdAtVal), 'MMMM do, YYYY at hh:mm aaa');
        }
    },

    username : {
        type : String,
        required : true
    },

    reactions : [{
        type : Schema.Types.ObjectId,
        ref : 'ReactionSchema'
    }]
},
{
    toJSON : {
        virtuals : true,
        getters : true
    },
    id : false
}
);

//get the total count of the reactions on retrieval
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

//create Thought model using ThoughtSchema
const Thought = mongoose.model('Thought', ThoughtSchema);

//export the Thought Model
module.exports = Thought;