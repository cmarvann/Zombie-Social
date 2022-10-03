const router = require('express').Router();
const { 
    addFriend, 
    removeFriend,
    addReaction,
    removeReaction
} = require('../../controllers/friend-controller');

// /api/friends/thoughtId>
router.route('/:thoughtId').post(addFriend);

// /api/friends/<thoughtId>/<friendId>
router.route('/:thoughtId/:friendId')
.put(addFriend)
.delete(removeFriend);


router.route('/:thoughtId/:friendId/:reactionId').delete(removeReaction);


module.exports = router;
