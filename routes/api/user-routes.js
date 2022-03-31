const router = require('express').Router();
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    removeUser, 
    addFriend,
    removeFriend
} = require('../../controllers/user-controllers');

router
    .route('/')
    .get(getAllUser)
    .post(createUser);

router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(removeUser);

router
    .route('/:userId/friend/:friendId')
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;