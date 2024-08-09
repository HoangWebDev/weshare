const { DataTypes } = require('sequelize');
const sequelize = require("../../config/sequelize.js")

const Posts = sequelize.define('Posts', {
    // Định nghĩa các trường ở đây
    id_posts: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_user: {
        type: DataTypes.INTEGER
    },
    content: {
        type: DataTypes.STRING
    },
    images: {
         type: DataTypes.TEXT, // Dùng TEXT hoặc LONGTEXT để lưu trữ chuỗi
        get() {
            const value = this.getDataValue('images');
            return value ? value.split(',') : []; // Tách chuỗi thành mảng
        },
        set(value) {
            this.setDataValue('images', value.join(',')); // Nối mảng thành chuỗi
        }
    },
    video: {
        type: DataTypes.TEXT,
        get() {
            const value = this.getDataValue('video');
            return value ? value.split(',') : [];
        },
        set(value) {
            this.setDataValue('video', value.join(','));
        }
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

module.exports = Posts;