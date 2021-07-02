const { Thought, User } = require ('../models');

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
    },

    //update thought by id
    updateThought({params, body}, res) {
        Thought.findByIdAndUpdate(
            params.id, 
            body, 
            {new : true}
        )
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

    //remove thought by id
    removeThought ({params}, res) {
        Thought.findByIdAndDelete(params.id)
        .then (dbThoughtData => {
            if (!dbThoughtData)
            {
                res.status(404).json({message : 'Thought Id does not exists!'});
                return;
            }

            res.status(200).json({message : 'Thought has been deleted!'});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
        
    },

    //create a reaction stored in a single thought's reactions array field
    createReaction ({params, body}, res) {
        Thought.findByIdAndUpdate (
            {_id : params.thoughtId},
            {$push : {reactions : body}},
            {new : true}
        )
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

    //remove a reaction
    removeReaction ({params}, res) {
        Thought.findByIdAndUpdate(
            {_id : params.thoughtId},
            {$pull : {reactions : params.reactionId}},
            {new : true}
        )
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

module.exports = thoughtController;