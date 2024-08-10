interface IUserModel {
    id_user?: number | null;
    full_name?: string;
    email?: string;
    username?: string;
    password_hash?: string;
    phone?: number;
    birthday?: Date;
    gender?: number;
    idBlocked?: number;
    picture_url?: string;
    created_at?: Date;
    updated_at?: Date;
    role?: number;
}

class UserModel implements IUserModel {
    id_user?: number | null;
    full_name?: string;
    email?: string;
    username?: string;
    password_hash?: string;
    phone?: number;
    birthday?: Date;
    gender?: number;
    isBlocked?: number;
    picture_url?: string;
    created_at?: Date;
    updated_at?: Date;
    role?: number;

    constructor(id_user: number | null,
        full_name: string, email: string, username: string,
        password_hash: string,
        phone: number,
        birthday: Date,
        gender: number,
        isBlocked: number,
        picture_url: string,
        created_at: Date,
        updated_at: Date,
        role: number
    ) {
        this.id_user = id_user;
        this.full_name = full_name;
        this.email = email;
        this.username = username;
        this.password_hash = password_hash;
        this.phone = phone;
        this.birthday = birthday;
        this.gender = gender;
        this.picture_url = picture_url;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.role = role;
    }
}

export default UserModel