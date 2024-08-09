const { DataTypes } = require('sequelize');
const sequelize = require('../../config/sequelize');
const bcrypt = require('bcrypt');

// Định nghĩa model User
const User = sequelize.define('Users', {
    // Định nghĩa các trường dữ liệu
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true        
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,        
    },
    full_name: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
    birthday: {
        type: DataTypes.DATE
    },
    gender: {
        type: DataTypes.STRING
    },
    picture_url: {
        type: DataTypes.STRING
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    role: {
        type: DataTypes.INTEGER
    }
}, {    
    timestamps: false
});

User.beforeCreate((user, options) => {
    const salt = bcrypt.genSaltSync(10);
    user.password_hash = bcrypt.hashSync(user.password_hash, salt);
});

// User.beforeUpdate((user, options) => {
//     if (user.changed('password_hash')) {
//         const salt = bcrypt.genSaltSync(10);
//         user.password_hash = bcrypt.hashSync(user.password_hash, salt);
//     }
// });

User.comparePassword = (password, password_hash) => {
    return bcrypt.compare(password, password_hash);
}


module.exports = User;