const Posts = require('../models/PostsModel.js');
const Comments = require('../models/CommentModel.js');
const Likes = require('../models/LikeModel.js');
const upload = require('../../config/multerConfig.js');
const cloudinary = require('../../config/cloudinaryConfig.js');
const fs = require('fs'); // Import thư viện fs để thao tác với hệ thống file
class PostsController {
    async getPosts(req, res) {
        try {
            const posts = await Posts.findAll();
            return res.json(posts);
        } catch (error) {
            console.error("Thông báo: ", error);
            return res.json(500).send("Lỗi server: ", error.message);
        }
    }

    async getPostsById(req, res) {
        try {
            const id_posts = req.params.id_posts;
            console.log(id_posts);
            const posts = await Posts.findByPk(id_posts);
            if (posts) {
                return res.json(posts);
            } else {
                return res.status(404).send({ error: "Không tìm thấy bài posts" });
            }
        } catch (error) {
            console.error("Thông báo: ", error);
            return res.json(500).send("Lỗi server: ", error.message);
        }
    }

    async getPostsByIdUser(req, res) {
        try {
            const id_user = req.params.id_user;
            const posts = await Posts.findAll({
                where: {
                    id_user: id_user
                }
            });
            return res.json(posts);
        } catch (error) {
            console.error("Thông báo: ", error);
            return res.json(500).send("Lỗi server: ", error.message);
        }
    }

    //     async createPosts(req, res) {
    //     upload.array('images', 10)(req, res, async function (err) {
    //         if (err) {
    //             console.log(err);
    //             return res.status(400).json({ error: err.message }); // Trả về JSON khi có lỗi
    //         }

    //         if (!req.files || req.files.length === 0) {
    //             return res.status(400).json({ error: 'No files were uploaded.' }); // Trả về JSON khi không có file
    //         }

    //         try {
    //             const { id_user, content } = req.body;
    //             let imageUrls = [];

    //             if (req.files && req.files.length > 0) {
    //                 for (const file of req.files) {
    //                     console.log(file.path);

    //                     const result = await cloudinary.uploader.upload(file.path, {
    //                         resource_type: 'image',
    //                         folder: 'posts',
    //                     });

    //                     imageUrls.push(result.secure_url);
    //                     fs.unlinkSync(file.path);
    //                 }
    //             }

    //             const posts = await Posts.create({
    //                 id_user,
    //                 content,
    //                 images: imageUrls,
    //             });

    //             console.log("ID_USER: ", id_user, "CONTENT: ", content, "IMAGES: ", imageUrls);
    //             return res.json(posts); // Đảm bảo trả về JSON
    //         } catch (error) {
    //             console.log("Thông báo: ", error);
    //             return res.status(500).json({ error: "Lỗi server: " + error.message }); // Trả về JSON khi có lỗi
    //         }
    //     });
    // }

    async createPosts(req, res) {
        upload.fields([{ name: 'images', maxCount: 10 }, { name: 'video', maxCount: 5 }])(req, res, async function (err) {
            if (err) {
                console.log(err);
                return res.status(400).json({ error: err.message });
            }

            const fileImages = req.files.images && req.files.images.length > 0;
            const fileVideo = req.files.video && req.files.video.length > 0;            

            try {
                const { id_user, content } = req.body;
                let imageUrls = [];
                let videoUrls = [];

                if (req.files.images && req.files.images.length > 0) {
                    for (const file of req.files.images) {
                        const result = await cloudinary.uploader.upload(file.path, {
                            resource_type: 'image',
                            folder: 'posts',
                        });
                        imageUrls.push(result.secure_url);
                        fs.unlinkSync(file.path);
                    }
                }

                if (req.files.video && req.files.video.length > 0) {
                    for (const file of req.files.video) {
                        const result = await cloudinary.uploader.upload(file.path, {
                            resource_type: 'video',
                            folder: 'posts',
                        });
                        videoUrls.push(result.secure_url);
                        fs.unlinkSync(file.path);
                    }
                }
                
                const posts = await Posts.create({
                    id_user,
                    content,
                    images: imageUrls,
                    video: videoUrls,
                });

                console.log("ID_USER: ", id_user, "CONTENT: ", content, "IMAGES: ", imageUrls, "VIDEOS: ", videoUrls);
                return res.json(posts);
            } catch (error) {
                console.log("Thông báo: ", error);
                return res.status(500).json({ error: "Lỗi server: " + error.message });
            }
        });
    }

    async updatePosts(req, res) {
        upload.single('images')(req, res, async function (err) {
            if (err) {
                console.log(err);
                return res.status(400).send({ error: err.message });
            }
            try {
                const id_posts = req.params.id_posts;
                const posts = await Posts.findByPk(id_posts);
                if (posts) {
                    const { id_user, content, image } = req.body;
                    let imageUrl = image;

                    if (req.file) {
                        // Upload hình ảnh lên Cloudinary
                        const result = await cloudinary.uploader.upload(req.file.path, {
                            resource_type: 'image',
                            folder: 'posts', // Thư mục trong Cloudinary
                        });
                        imageUrl = result.secure_url;
                        // Xóa file tạm sau khi upload lên Cloudinary
                        fs.unlinkSync(req.file.path);
                    }

                    const updatedPosts = await posts.update({
                        id_user,
                        content,
                        image: imageUrl,
                    });
                    console.log("ID_USER: ", id_user, "CONTENT: ", content, "IMAGE: ", imageUrl);
                    return res.json(updatedPosts);
                } else {
                    return res.status(404).send({ error: "Posts not found" });
                }
            } catch (error) {
                console.error("Thông báo: ", error);
                return res.json(500).send("Lỗi server: ", error.message);
            }
        })
    }

    async deletePosts(req, res) {
        try {
            const id_posts = parseInt(req.params.id_posts);
            if (!isNaN(id_posts)) {
                // Xóa các comments liên quan đến post trước
                await Comments.destroy({
                    where: {
                        id_posts: id_posts
                    }
                });

                await Likes.destroy({
                    where: {
                        id_posts: id_posts
                    }
                });

                // Sau đó mới xóa post
                await Posts.destroy({
                    where: {
                        id_posts: id_posts
                    }
                });
                return res.json({ message: "Post and related comments deleted successfully" });
            } else {
                return res.status(400).send({ error: "Invalid ID" });
            }
        } catch (error) {
            console.error("Thông báo: ", error);
            return res.status(500).send({ error: "Lỗi server: " + error.message });
        }
    }

}

module.exports = new PostsController();