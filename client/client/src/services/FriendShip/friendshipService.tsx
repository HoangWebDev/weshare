import * as httpRequest from '~/utils/httpRequest';

export const checkFriendship = async (user1Id: number) => {
    try {
        const result = await httpRequest.getApi(`friendships/${user1Id}`);
        if (result) {
            if (result.message === 'Không có bạn bè') {
                return { message: 'Không có bạn bè' };
            }
            return result;
        }
        return null;
    } catch (error) {
        console.error('Error checking friendship:', error);
        return null;
    }
};

export const deleteFriendship = async (idUser1: number, idUser2: number) => {
    try {
        const result = await httpRequest.deleteApi(`friendships/${idUser1}/${idUser2}`);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
} 