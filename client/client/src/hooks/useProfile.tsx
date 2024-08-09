/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as loginService from '~/services/Login/loginService';
import { jwtDecode } from 'jwt-decode';
import UserModel from '~/models/User';

function useProfile() {
    const [userProfile, setUserProfile] = useState<UserModel>({});
    const token = localStorage.getItem('token'); // Lấy token từ localStorage
    if (token) {
        const decodedToken = jwtDecode<UserModel>(token); // Giải mã token
        const idUser = decodedToken.id_user; // Sau khi giải mã lấy id_user của user vừa đăng nhập
        if (idUser) {
            const { data } = useQuery<UserModel>({
                //Sài useQuery fetch theo idUser
                queryKey: ['userProfile', idUser],
                queryFn: async () => {
                    const result = await loginService.getUserProfile(idUser);
                    return result;
                },
                enabled: !!idUser, // Điều kiện đúng khi có idUser sẽ gọi API
            });
            useEffect(() => {
                if (data) {
                    setUserProfile(data);
                }
            }, [data]);
        }
    } else {
        console.log('Không tìm thấy token trong localStorage');
    }

    return userProfile;
}

export default useProfile;
