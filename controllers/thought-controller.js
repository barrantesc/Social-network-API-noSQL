const { Thought, User } = require('../models');

const thoughtController = {
    //* Thought Routes
    // get all routes
    getAllThought(req, res){
        Thought.find({})
            .populate(
                {
                    path: 'reactions',
                    select: '-__v'
                }
            )
            .select('-__v')
            .then(thoughtData => res.json(thoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // get thought by id
    getThoughtById({ params }, res){
        Thought.findOne({ _id: params.thoughtId })
            .populate(
                {
                    path: 'reactions',
                    select: '-__v'
                }
            )
            .select('-__v')
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(400).json({ message: 'Thought not found!' });
                    return;
                }
                res.json(thoughtData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // create new thought
    createThought({ params, body }, res){
        Thought.create(body)
            .then(thoughtData => {
                return User.findByIdAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: thoughtData._id } },
                    { new: true }
                );
            })
            .then(userData => {
                if (!userData) {
                    res.status(400).json({ message: 'User not found!' });
                    return;
                }
                res.json(userData);
            })
    },
    // edit existing thought by id
    updateThought({ params, body }, res){
        Thought.findByIdAndUpdate({ _id: params.thoughtId }, body, { new: true, runValidators: true })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(400).json({ message: 'Thought not found!' });
                    return;
                }
                res.json(thoughtData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // remove thought by id
    removeThought({ params }, res){
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(400).json({ message: 'Thought not found!' });
                    return;
                }
                res.json(thoughtData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //* Reaction Routes
    // add reaction
    addReaction({ params, body }, res){
        Thought.findByIdAndUpdate(
        { _id: params.thoughtId },
        { $push: { reactions: body} },
        { new: true, runValidators: true }
        )
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(400).json({ message: 'Thought not found!' });
                    return;
                }
                res.json(thoughtData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // remove reaction
    removeReaction({ params }, res){
        Thought.findByIdAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { _id: params.reactionId } } },
            { new: true }
        )
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(400).json({ message: 'Thought not found!' });
                    return;
                }
                res.json(thoughtData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }

}

module.exports = thoughtController;