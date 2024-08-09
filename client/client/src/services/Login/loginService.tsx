import * as httpRequest from '~/utils/httpRequest';

export const login = async (username: string, password: string) => {
    try {
        const result = await httpRequest.postApi('users/login', {
            username,
            password,
        });
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getUserProfile = async (id: number) => {
    try {
        const result = await httpRequest.getApiId(`users/${id}`);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};
