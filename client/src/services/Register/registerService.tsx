import * as instance from '~/utils/httpRequest';

export const register = async (full_name: string, email: string, username: string, password: string) => {
    try {
        const result = await instance.postApi('users/', {
            full_name,
            email,
            username,
            password,
        });
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};
