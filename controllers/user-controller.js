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
    getUserById (req, res) {
        User.findBy({_id})
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
    }
}