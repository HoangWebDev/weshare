const Like = require('../models/LikeModel.js');

class LikeController {
    async getLikes (req, res) {
        try{
            const likes = await Like.findAll();
            return res.json(likes);    
        }catch{
            console.error("Thông báo: ",error);
            return res.json(500).send("Lỗi server: ",error.message);
        }
    }   

    async getLikePosts (req, res) {
        try {
            const id_posts = parseInt(req.params.id_posts);
            const likes = await Like.findAll({
                where: {
                    id_posts: id_posts
                }            
            });
            if (likes) {
                return res.json(likes);
            }else{
                return res.status(404).send({ error: "Posts not found" });
            }
        } catch (error) {
            console.error("Thông báo: ",error);
            return res.json(500).send("Lỗi server: ",error.message);
        }
    }

    async createLike (req, res) {
        try {
            const like = await Like.create({
                id_posts: req.body.id_posts,                
                id_user: req.body.id_user,                
            })
            return res.json(like);
        } catch (error) {
            console.error("Thông báo: ",error);
            return res.json(500).send("Lỗi server: ",error.message);
        }
    }   

    async deleteLike (req, res) {
        try {
            const id_user = parseInt(req.params.id_user);
            const id_posts = parseInt(req.params.id_posts);
            const like = await Like.findAll({
                where: {
                    id_user: id_user,
                    id_posts: id_posts
                }
            });

            console.log(like);

            if (!like) {
                return res.status(404).send({ error: "Like not found" });
            }
            await Like.destroy({
                where: {
                    id_user: id_user,
                    id_posts: id_posts
                }
            })
            return res.json(like);
        } catch (error) {
            console.error("Thông báo: ",error);
            return res.json(500).send("Lỗi server: ",error.message);
        }
    }
}

module.exports = new LikeController;