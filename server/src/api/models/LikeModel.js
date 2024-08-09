const { DataTypes } = require('sequelize');
const sequelize = require('../../config/sequelize');
const bcrypt = require('bcrypt');

// Định nghĩa model User
const Like = sequelize.define('Likes', {
    // Định nghĩa các trường dữ liệu
    id_like: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true        
    },
    id_posts: {
        type: DataTypes.INTEGER,
    },
    id_user: {
        type: DataTypes.INTEGER,
    }, 
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {    
    timestamps: false
});

module.exports = Like;