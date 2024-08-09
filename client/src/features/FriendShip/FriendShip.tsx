import { useEffect, useMemo, useState } from 'react';
import { useFriendShip } from '~/hooks';
import UserModel from '~/models/User';
import * as userService from '~/services/User/userService';

function FriendShip(users: UserModel[] | undefined, userProfileId: number) {
    const [userFriend, setUserFriend] = useState<UserModel[]>([]);
    //Lọc để lấy các id_user của từng user và chỉ lọc lại khi mảng users thay đổi
    const filteredUsers = useMemo(() => (users || []).filter((user) => user.id_user) as { id_user: number }[], [users]);

    //Trả về 1 mảng các user có trạng thái status === 1 với userProfile
    const friendShip = useFriendShip(userProfileId, filteredUsers);

    //Map để tìm id_user 2 khi friendShip thay đổi
    const id_user = useMemo(() => friendShip?.map((friend) => friend.id_user2) ?? [], [friendShip]);

    useEffect(() => {
        if (id_user.length > 0) {
            const fetchFriends = async () => {
                try {
                    //Tạo một mảng để push các user vào
                    const updatedUserFriend: UserModel[] = [];
                    for (const id of id_user) {
                        const data = await userService.getUserById(id as number);
                        if (data) {
                            updatedUserFriend.push(data);
                        }
                    }
                    //Sau khi push hết các user vào thì setUserFriend
                    setUserFriend(updatedUserFriend);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };
            fetchFriends();
        } else {
            setUserFriend([]);
        }
    }, [id_user]);
    return userFriend;
}

export default FriendShip;
