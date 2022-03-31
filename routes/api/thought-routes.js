const router = require('express').Router();
const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controllers');

router
    .route('/')
    .get(getAllThought);

router
    .route('/:userId')
    .post(createThought);

router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);

router
    .route('/:thoughtId/reaction')
    .post(addReaction);

router
    .route('/:thoughtId/reaction/:reactionId')
    .delete(removeReaction);

module.exports = router;