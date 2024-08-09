const { DataTypes } = require('sequelize');
const sequelize = require('../../config/sequelize.js')

const Friendship = sequelize.define('Friendships', {
    id_friendship:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_user1:{
        type: DataTypes.INTEGER
    },
    id_user2: {
        type: DataTypes.INTEGER
    },
    status:{
        type: DataTypes.INTEGER
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

module.exports = Friendship