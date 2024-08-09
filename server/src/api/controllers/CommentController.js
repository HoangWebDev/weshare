const Comment = require('../models/CommentModel.js');
const User = require('../models/UserModel.js');
const upload = require('../../config/multerConfig.js');
const cloudinary = require('../../config/cloudinaryConfig.js');
const fs = require('fs');

class CommentController {
    async getComments (req, res) {
        try {
            const comments = await Comment.findAll();
            return res.json(comments);
        } catch (error) {
            console.error("Thông báo: ",error);
            return res.json(500).send("Lỗi server: ",error.message);
        }
    }

    async getCommentPosts (req, res) {
        try {
            const id_posts = parseInt(req.params.id_posts);
            const comments = await Comment.findAll({
                where: {
                    id_posts: id_posts
                }                        
            })
            if (comments) {                
                return res.json(comments);                
            }else {
                return res.status(404).send({ error: "Posts not found" });
            }
        } catch (error) {
            console.error("Có lỗi: ", error);
            console.error("Thông báo: ",error);
            return res.json(500).send("Lỗi server: ",error.message);
        }
    }

    async createComment(req, res) {
        upload.single('image')(req, res, async function (err) {
            console.log(req.file);
            if (err) {
                console.log(err);
                return res.status(400).send({ error: err.message });
            }
            try {
                const { id_posts, id_user, content } = req.body;                    

                const idUser = parseInt(id_user);
                const idPosts = parseInt(id_posts);

                const user = await User.findByPk(idUser);
                if (!user) {
                    return res.status(404).send({ error: "User not found" });
                }

                let imageUrl = null;
                if (req.file) {
                    // Upload hình ảnh lên Cloudinary
                    const result = await cloudinary.uploader.upload(req.file.path, {
                        resource_type: 'image',
                        folder: 'comments'
                    });
                    imageUrl = result.secure_url;

                    // Xóa hình ảnh khi upload xong
                    fs.unlinkSync(req.file.path);
                }
                const comment = await Comment.create({
                    id_posts,
                    id_user,
                    content,
                    image: imageUrl
                })
                console.log("Comment",comment);
                return res.json(comment);
            } catch (error) {
                console.error("Thông báo: ",error);
                return res.json(500).send("Lỗi server: ",error.message);
            }
        })
    }

    async deleteComment (req, res) {
        try {
            const id_comment = parseInt(req.params.id_comment);
            const comment = await Comment.findByPk(id_comment);
            if (!comment) {
                return res.status(404).send({ error: "Comment not found" });
            }
            await Comment.destroy({
                where: {
                    id_comment: id_comment
                }
            })
            return res.json(comment);
        } catch (error) {
            console.error("Thông báo: ",error);
            return res.json(500).send("Lỗi server: ",error.message);
        }
    }
}

module.exports = new CommentController;