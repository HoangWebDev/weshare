/* eslint-disable @typescript-eslint/no-unused-vars */
import PostModel from '~/models/Post';
import * as httpRequest from '~/utils/httpRequest';

export const getPost = async () => {
    try {
        const result = await httpRequest.getApi('posts');
        return result;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const addPost = async (formData: FormData) => {
    try {
        const result = await httpRequest.postApi('posts', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const updatePost = async (id_posts: number, formData: FormData) => {
    try {
        const result = await httpRequest.putApi(`posts/${id_posts}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const deletePost = async (id: number) => {
    try {
        const result = await httpRequest.deleteApi(`posts/${id}`);
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
        return [];
    }
};
