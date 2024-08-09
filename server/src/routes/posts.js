var express = require('express');
var router = express.Router();
const postsController = require("../api/controllers/PostsController")
const { verifyToken, combinedAuth } = require("../service/auth.token.js");

/* GET home page. */
router.get('/', verifyToken, postsController.getPosts);
router.get('/:id_posts',verifyToken,  postsController.getPostsById);
router.get('/user/:id_user', verifyToken, postsController.getPostsByIdUser);
router.post('/', verifyToken, postsController.createPosts);
router.put('/:id_posts',verifyToken,  postsController.updatePosts);
router.delete('/:id_posts',verifyToken,  postsController.deletePosts);

module.exports = router;
