const { DataTypes } = require('sequelize');
const sequelize = require("../../config/sequelize.js")

const Comment = sequelize.define('Comments', {
    // Định nghĩa các trường ở đây
    id_comment: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_user: {
        type: DataTypes.INTEGER
    },
    id_posts: {
        type: DataTypes.INTEGER
    },
    content: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
    },{
    // Tắt tự động timestamps
    timestamps: false
  });

module.exports = Comment;