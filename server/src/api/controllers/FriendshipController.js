const Friendship = require("../models/FriendshipModel.js");
const { Op } = require('sequelize');

class FriendshipController {
    async getFriendships(req, res) {
        try {
            const friendship = await Friendship.findAll();
            return res.json(friendship);
        } catch (error) {
            console.error("Thông báo: ", error);
            return res.json(500).send("Lỗi server: ", error.message);
        }
    }

    async getFriendshipsUser(req, res) {
        try {
            const id_user1 = parseInt(req.params.id_user1);
            const friendship = await Friendship.findAll({
                where: {
                    id_user1: id_user1,
                    status: 1
                }
            })
            return res.json(friendship);

        } catch (error) {
            if (error.name === 'SequelizeDatabaseError') {
                res.status(500).json({ message: "Database error occurred." });
            } else if (error.name === 'SequelizeEmptyResultError') {
                res.status(404).json({ message: "No friendships found." });
            } else {
                res.status(500).json({ message: "An unknown error occurred." });
            }
        }
    }

    async createFriendship(req, res) {
        try {
            const friendship = await Friendship.create({
                id_user1: req.body.id_user1,
                id_user2: req.body.id_user2,
                status: req.body.status
            });
            return res.json(friendship);
        } catch (error) {
            console.error("Thông báo: ", error);
            return res.json(500).send("Lỗi server: ", error.message);
        }
    }

    async deleteFriendship(req, res) {
        try {
            const id_user1 = parseInt(req.params.id_user1);
            const id_user2 = parseInt(req.params.id_user2);        
            console.log(id_user1, id_user2);
            if (!isNaN(id_user1) && !isNaN(id_user2)) {
                await Friendship.destroy({
                    where: {
                        [Op.or]: [
                        { id_user1: id_user1, id_user2: id_user2 },
                        { id_user1: id_user2, id_user2: id_user1 }
                    ]
                    }
                });
                return res.json({ message: "Friendship deleted successfully" });
            }
            else {
                return res.status(404).json({ error: "Friendship not found" });
            }
        } catch (error) {
            console.error("Thông báo: ", error);
            return res.json(500).send("Lỗi server: ", error.message);
        }
    }
}

module.exports = new FriendshipController()