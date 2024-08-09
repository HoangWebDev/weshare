var express = require('express');
var router = express.Router();
const userController = require("../api/controllers/UserController");
const { verifyToken, combinedAuth } = require("../service/auth.token.js");

/* GET home page. */
// Định nghĩa các route
router.put('/changepassword', verifyToken, userController.changePassword);
router.post('/login', userController.login);
router.post('/', verifyToken, userController.createUser); // Chỉ admin có thể tạo user
router.get('/search', verifyToken, userController.searchUser); // Cả user và admin đều có thể xem danh sách user
router.get('/profile', verifyToken, userController.getUserProfile);
router.get('/', verifyToken, userController.getUser);
router.get('/:id_user', verifyToken, userController.getUserById);
router.put('/:id_user', verifyToken, userController.updateUser); // Chỉ admin có thể cập nhật user
router.delete('/:id_user', verifyToken, userController.deleteUser); // Chỉ admin có thể xóa user

module.exports = router;
