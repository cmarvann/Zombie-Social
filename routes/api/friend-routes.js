const router = require('express').Router();
const { 
    addFriend, 
    removeFriend,
} = require('../../controllers/friend-controller');

// /api/friends/thoughtId>
router.route('/:thoughtId').post(addFriend);

// /api/friends/<thoughtId>/<friendId>
router.route('/:thoughtId/:friendId')
.put(addFriend)
.delete(removeFriend);


router.route('/:thoughtId/:friendId').delete(removeFriend);


module.exports = router;
