const { User, Thought } = require ('../models');

const userController = {
    //get all users
    getAllUser (req, res) {
        User.find({})
        .then (dbUserData => res.json(dbUserData))
        .catch (err => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    //get one user by id
    getUserById ({params}, res) {
        User.findById(params.id)
        .populate ({
            path : 'thoughts',
            select : '-__v'
        })
        .populate ({
            path : 'friends',
            select : '-__v'
        })
        .select ('-__v')
        .then (dbUserData => {
            if (!dbUserData)
            {
                res.status(404).json({message : 'User id does not exists'});
                return;
            }

            res.json(dbUserData);
        })
        .catch (err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    //create a new user
    createUser ({body}, res) {
        User.create(body)
        .then (dbUserData => res.json(dbUserData))
        .catch (err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    //update an existing user by id
    updateUser ({ body, params }, res) {
        User.findByIdAndUpdate(params.id, body, {new : true})
        .then (data => {
            console.log(data.thoughts);
            return Thought.updateMany(
                {_id : {$in : data.thoughts}},
                {$set : {username : body.username}},
                {multi : true,
                new : true}
            )
            
           //console.log(data);
        })
        .then (dbUserData => {
            if (!dbUserData)
            {
                res.status(404).json({message : 'User id does not exists!'});
                return;
            }

            console.log("User updated!");
            res.status(200).json({message : "User has been updated!"});
        })
        .catch (err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    //delete an existing user by id
    deleteUser ({params}, res) {
        User.findByIdAndDelete(params.id)
        .then (dbUserData => {
            if (!dbUserData)
            {
                res.status(404).json({message : 'User Id does not exixts'});
                return;
            }

            console.log("User deleted!");
            res.status(200).json({message : "User has been deleted!"});
        })
        .catch (err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    //remove a user's associated thoughts when deleted


    //to add a new friend to a user's friend list
    addFriend ({params, body}, res) {
        User.findByIdAndUpdate (
                {_id : params.userId },
                { $push : {friends : params.friendId}},
                {new : true}            
        )
        .then (dbUserData => {
            if (!dbUserData)
            {
                res.status(404).json({message : 'User Id does not exists!'});
                return;
            }

            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    //remove a friend from a user's friend list

    removeFriend ({params}, res) {
        User.findByIdAndUpdate(
            {_id : params.userId},
            {$pull : {friends : params.friendId}},
            {new : true}        
        )
        .then (dbUserData => {
            if (!dbUserData)
            {
                res.status(404).json({message : 'No User found with the id!'});
                return;
            }

            res.json(dbUserData);

        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    }


}

module.exports = userController;