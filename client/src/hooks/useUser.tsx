// hooks/useUser.ts
import { useQuery } from "@tanstack/react-query";
import * as userService from '~/services/User/userService';
import UserModel from "~/models/User";

export const useUser = (id: number) => {
    return useQuery<UserModel>({
        queryKey: ['user/getUserById'],
        queryFn:
            async () => {
                const response = await userService.getUserById(id);
                return response.data;
            },
        enabled: !!id, // Only fetch if id is truthy        
    });
};