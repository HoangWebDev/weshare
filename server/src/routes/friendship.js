var express = require('express');
var router = express.Router();
const friendshipController = require('../api/controllers/FriendshipController.js');

/* GET home page. */
router.get('/', friendshipController.getFriendships);
router.get('/:id_user1', friendshipController.getFriendshipsUser);
router.delete('/:id_user1/:id_user2', friendshipController.deleteFriendship)


module.exports = router;
