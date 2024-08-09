import * as httpRequest from '~/utils/httpRequest';

export const getCommentByIdPost = async (id_posts: number) => {
    try {
        const result = await httpRequest.getApiId(`comments/${id_posts}`);
        return result;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const createComment = async ( formData: FormData) => {
    try {
        const result = await httpRequest.postApi(`comments`, formData,{            
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(result);
        
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const deleteComment = async (id_comment: number) => {
    try {
        const result = await httpRequest.deleteApi(`comments/${id_comment}`);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};
