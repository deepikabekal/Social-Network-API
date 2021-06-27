const { Thought } = require ('../models');

const thoughtController = {
    //get all thoughts
    getAllThoughts (req, res) {
        Thought.find({})
        .then (dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    //get thought by id
    getThoughtById ({params}, res) {
        Thought.findById (params.id)
        .then (dbThoughtData => {
            if (!dbThoughtData)
            {
                res.status(404).json({message : 'Thought Id does not exists!'});
                return;
            }

            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    //create a new thought
    createThought ({params, body}, res) {
        Thought.create (body)
        .then (({_id}) => {
            return User.findOneAndUpdate (
                {username : body.username},
                {$push : {thoughts : _id }},
                { new  : true}
            );
        })
        .then (dbThoughtData => {
            if (!dbThoughtData)
            {
                res.status(404).json({message : 'Thought Id does not exists!'});
                return;
            }

            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
}