var express = require('express');
var router = express.Router();
const likeController = require("../api/controllers/LikeController")
const {verifyToken, combinedAuth} = require("../service/auth.token.js")

/* GET home page. */
router.get('/', likeController.getLikes);
router.get('/:id_posts', likeController.getLikePosts);
router.post('/', likeController.createLike);
router.delete('/:id_user/:id_posts', likeController.deleteLike);


module.exports = router;
