/* eslint-disable react-hooks/rules-of-hooks */
import * as postService from '~/services/Post/postService';
import * as userService from '~/services/User/userService';
import { useQuery } from '@tanstack/react-query';
import PostModel from '~/models/Post';
import UserModel from '~/models/User';

function useFetch() {
    const {
        isLoading: isLoadingPost,
        data: posts,
        refetch: refetchPost,
    } = useQuery<PostModel[]>({
        queryKey: ['posts/getPost'],
        queryFn: async () => {
            const result = await postService.getPost();
            return result;
        },
    });

    const {
        isLoading: isLoadingUsers,
        data: users,
        refetch: refetchUsers,
    } = useQuery<UserModel[]>({
        queryKey: ['user/getUsers'],
        queryFn: async () => {
            const result = await userService.getUser();
            return result;
        },
    });

    return { isLoadingPost, posts, refetchPost, isLoadingUsers, users, refetchUsers };
}

export default useFetch;
