import * as httpRequest from '~/utils/httpRequest';

export const getLikeByIdPost = async (id_posts: number) => {
    try {
        const result = await httpRequest.getApiId(`likes/${id_posts}`);
        return result;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const postLike = async (id_posts: number, id_user: number) => {
    try {
        const result = await httpRequest.postApi('likes', { id_posts, id_user });
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const deleteLike = async (id_user: number, id_posts: number) => {
    try {
        const result = await httpRequest.deleteApi(`likes/${id_user}/${id_posts}`);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};
