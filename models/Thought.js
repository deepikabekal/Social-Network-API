const {Schema, model} = require ('mongoose');
var format = require('date-fns/format');

//create reaction schema
const ReactionSchema = new Schema (
    {
        reactionId : {
            type : Schema.Types.ObjectId,
            default : new Schema.Types.ObjectId
        },

        reactionBody : {
            type : String,
            required : 'Reaction content is required',
            max : 280
        },

        username : {
            type : String,
            required : 'Username is required'
        },

        createAt : {
            type : Date,
            default : Date.now,
            get : (createdAtVal) => {
                return format (new Date(createdAtVal), 'MMMM do, YYYY at hh:mm aaa');
            }
        }
    },
    {
        toJSON : {
            getters : true
        }
    }

);


//create thought schema
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

    reactions : [ReactionSchema]
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
const Thought = model('Thought', ThoughtSchema);

//export the Thought Model
module.exports = Thought;