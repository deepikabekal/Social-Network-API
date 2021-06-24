const { User } = require ('../../models');

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
        User.create({body})
        .then (dbUserData => res.json(dbUserData))
        .catch (err => {
            console.log(err);
            res.status(500).json(err);
        });
    },


}