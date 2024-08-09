import * as httpRequest from '~/utils/httpRequest';

export const getUser = async () => {
    try {
        const result = await httpRequest.getApi('users');
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};
export const getUserById = async (id: number) => {
    try {
        const result = await httpRequest.getApiId(`users/${id}`);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const updateUser = async (id: number, formData: FormData) => {
    try {
        const result = await httpRequest.putApi(`users/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(result);
        return result;
    } catch (error) {
        console.error('Error updating user:', error);
        return null;
    }
};

export const changePassword = async (email: string, oldPassword: string, newPassword: string) => {
    try {
        const result = await httpRequest.putApi(`users/changepassword`, { email, oldPassword, newPassword });
        console.log('Change password result:', result);
        return result;
    } catch (error) {
        console.error(`Error changing password for user`, error);
        return null;
    }
};