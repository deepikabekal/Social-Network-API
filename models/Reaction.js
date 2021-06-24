const  {Schema, model} = require ('mongoose');
var format = require('date-fns/format');

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


module.exports = ThoughtSchema;