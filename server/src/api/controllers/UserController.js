require('dotenv').config();
const { Op } = require('sequelize');
const User = require('../models/UserModel.js'); // Đường dẫn đến file định nghĩa model User của bạn
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const bcrypt = require('bcrypt');
const upload = require('../../config/multerConfig.js');
const cloudinary = require('../../config/cloudinaryConfig.js');
const fs = require('fs'); // Import thư viện fs để thao tác với hệ thống file
class UserController {
    // Lấy danh sách tất cả người dùng
    async getUser(req, res) {
        try {
            const user = await User.findAll();
            return res.json(user);
        } catch (error) {
            console.error('Thông báo: ', error);
            return res.json(500).send('Lỗi server: ', error.message);
        }
    }

    // Lấy thông tin người dùng theo id
    async getUserById(req, res) {
        try {
            const id_user = req.params.id_user;
            const user = await User.findByPk(id_user);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.json(user);
        } catch (error) {
            console.error('Thông báo: ', error);
            return res.json(500).send('Lỗi server: ', error.message);
        }
    }

    // Tạo mới người dùng
    async createUser(req, res) {
        const { username, password, email, full_name, birthday } = req.body;        
        try {
            const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email đã tồn tại' });
        }
            const newUser = await User.create({
                username,
                password_hash: password,
                email,
                full_name,
                birthday,
                role: 'user',
                created_at: new Date(),
            });
            return res.status(201).json(newUser);
        } catch (error) {
            console.log(error);
            console.error('Thông báo: ', error);
            return res.json(500).send('Lỗi server: ', error.message);
        }
    }

    // Cập nhật thông tin người dùng
    async updateUser(req, res) {
        upload.single('image')(req, res, async function (err) {
            if (err) {
                console.log(err);
                return res.status(400).send({ error: err.message });
            }
            try {
                const id_user = req.params.id_user;
                const user = await User.findByPk(id_user);
                if (user) {
                    // Lấy thông tin cần cập nhật từ body request
                    const { email, full_name, phone, birthday, gender, picture_url } = req.body;                    

                    let avatar = picture_url; // Giữ nguyên ảnh đại diện nếu không có file mới

                    if (req.file) {
                        // Nếu có file ảnh mới, upload lên Cloudinary và lấy secure_url
                        const result = await cloudinary.uploader.upload(req.file.path, {
                            resource_type: 'image',
                            folder: 'avatars', // Thư mục trong Cloudinary
                        });
                        avatar = result.secure_url;
                        console.log('Avatar', avatar);

                        // Xóa file tạm sau khi upload lên Cloudinary
                        fs.unlinkSync(req.file.path);
                    }

                    // Cập nhật thông tin người dùng trong database
                    const updatedUser = await user.update({                        
                        email,
                        full_name,
                        phone,
                        birthday,
                        gender,
                        picture_url: avatar,
                        updated_at: new Date(),
                    });
                    console.log('Iduser', id_user, 'Avatar', avatar);
                    console.log('UpdatedUser', updatedUser);

                    // Trả về thông tin người dùng sau khi cập nhật
                    return res.json(updatedUser);
                } else {
                    return res.status(404).json({ error: 'User not found' });
                }
            } catch (error) {
                console.error('Thông báo: ', error);
                return res.status(500).send('Lỗi server: ' + error.message);
            }
        });
    }

    // Xóa người dùng
    async deleteUser(req, res) {
        try {
            const id_user = req.params.id_user;
            const user = await User.findByPk(id_user);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            await user.destroy({
                where: {
                    id_user: id_user,
                },
            });
            return res.json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error('Thông báo: ', error);
            return res.json(500).send('Lỗi server: ', error.message);
        }
    }

    //Login
    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ where: { username } });
            if (!user) {
                return res.status(401).json({ error: 'Invalid username' });
            }
            const isValid = await User.comparePassword(password, user.password_hash);
            if (!isValid) {
                return res.status(401).json({ error: 'Invalid password' });
            }

            const token = jwt.sign(
                {
                    id_user: user.id_user,
                    username: user.username,
                    role: user.role,
                },
                secret,
                { expiresIn: '1h' },
            );
            res.setHeader('Authorization', 'Bearer ' + token);
            res.json({ message: 'Login successfully', token: token, role: user.role });
        } catch (error) {
            console.error('Thông báo: ', error);
            return res.json(500).send('Lỗi server: ', error.message);
        }
    }

    /* Get user profile */
    async getUserProfile(req, res) {
        try {
            // Trích xuất thông tin người dùng từ token
            const dataDecoded = jwt.verify(req.token, secret);

            const user = await User.findByPk(dataDecoded.id_user);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Chỉ trả về thông tin cần thiết, không trả về password_hash
            const userProfile = {
                id_user: user.id_user,
                username: user.username,
                email: user.email,
                full_name: user.full_name,
                birthday: user.birthday,
                gender: user.gender,
                picture_url: user.picture_url,
                role: user.role,
            };

            return res.json(userProfile);
        } catch (error) {
            console.error('Thông báo: ', error);
            return res.json(500).send('Lỗi server: ', error.message);
        }
    }

    //ChangePass
    async changePassword(req, res) {
    console.log('Received request body:', req.body);
    try {
        const { email, oldPassword, newPassword } = req.body;
        
        if (!email || !oldPassword || !newPassword) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        console.log('Finding user with email:', email);      
        const user = await User.findOne({ where: { email } });

        if (!user) {
            console.log('User not found with email:', email);
            return res.status(404).json({ error: 'User not found with ',email });
        }

        console.log('User found:', user);

        // Xác thực mật khẩu cũ
        const isValid = await User.comparePassword(oldPassword, user.password_hash);
        if (!isValid) {
            console.log('Invalid old password for user:', user);
            return res.status(401).json({ error: 'Invalid old password' });
        }

        // Kiểm tra mật khẩu mới có khác với mật khẩu cũ không
        const isSamePassword = await User.comparePassword(newPassword, user.password_hash);
        if (isSamePassword) {
            console.log('New password is the same as old password for user:', user);
            return res.status(400).json({ error: 'New password must be different from the old password' });
        }

        // Hash mật khẩu mới
        const newHashedPassword = await bcrypt.hash(newPassword, 10);
        console.log('New hashed password:', newHashedPassword);

        // Cập nhật mật khẩu mới
        user.password_hash = newHashedPassword;

        // Lưu thông tin người dùng
        await user.save();
        console.log('User after password change:', user);

        return res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Server error', message: error.message });
    }
}


    //Tìm kiếm users
    async searchUser(req, res) {
        try {
            const { keyword } = req.query;
            console.log(keyword);

            // Thực hiện tìm kiếm các người dùng phù hợp với từ khóa
            const users = await User.findAll({
                where: {
                    [Op.or]: [{ username: { [Op.like]: `%${keyword}%` } }, { full_name: { [Op.like]: `%${keyword}%` } }],
                },
            });

            // Kiểm tra nếu không tìm thấy người dùng nào, sử dụng users.length vì findAll trả về mảng
            if (users.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Gửi kết quả tìm kiếm về cho client
            return res.json(users);
        } catch (error) {
            console.error('Thông báo: ', error);
            return res.status(500).json({ error: 'Lỗi server: ' + error.message });
        }
    }
}

module.exports = new UserController();
