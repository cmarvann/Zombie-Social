const router = require('express').Router();
const thoughtRoutes = require('./thought-routes');
const friendRoutes = require('./friend-routes');

// add prefix of `/thoughts` to routes created in `thought-routes.js`
router.use('/thoughts', thoughtRoutes);
router.use('/friends', friendRoutes);

module.exports = router;


