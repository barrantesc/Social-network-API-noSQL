const { User } = require('../models');

const userController = {
    //* User Routes
    // get all users
    getAllUser(req, res){
        User.find({})
            .populate(
                {
                    path: 'thoughts',
                    select: '-__v'
                }
            )
            .populate(
                {
                    path: 'friends',
                    select: '-__v'
                }
            )
            .select('-__v')
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // get user by id
    getUserById({ params }, res){
        User.findOne({ _id: params.id })
            .populate(
                {
                    path: 'thoughts',
                    select: '-__v'
                }
            )
            // .populate(
            //     {
            //         path: 'friends',
            //         select: '-__v'
            //     }
            // )
            .select('-__v')
            .then(userData => {
                if (!userData) {
                    res.status(400).json({ message: 'User not found!' });
                    return;
                }
                res.json(userData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // create new user
    createUser({ body }, res){
        User.create(body)
            .then(userData => res.json(userData))
            .catch(err => res.status(400).json(err));
    },
    // edit existing user by id
    updateUser({ params, body}, res){
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(userData => {
                if (!userData) {
                    res.status(400).json({ message: 'User not found!' });
                    return;
                }
                res.json(userData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // remove user by id
    removeUser({ params }, res){
        User.findOneAndDelete({ _id: params.id })
            .then(userData => {
                if (!userData) {
                    res.status(400).json({ message: 'User not found!' });
                    return;
                }
                res.json(userData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //* Friend Routes
    // add friend
    addFriend({ params }, res){
        User.findByIdAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId} },
            { new: true, runValidators: true}
        )
        .then(userData => {
            if (!userData) {
                res.status(400).json({ message: 'User not found!' });
                return;
            }
            res.json(userData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    removeFriend({ params }, res){
        User.findByIdAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
        .then(userData => {
            if (!userData) {
                res.status(400).json({ message: 'User not found!' });
                return;
            }
            res.json(userData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
}

module.exports = userController;