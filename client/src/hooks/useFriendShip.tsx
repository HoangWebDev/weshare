/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import FriendShip from '~/models/FriendShip';
import * as friendshipService from '~/services/FriendShip/friendshipService';

const useFriendShip = (userIds: number, users: { id_user: number }[]) => {
    const [friendShip, setFriendShip] = useState<FriendShip[]>([]);

    useEffect(() => {
        const fetchFriendShip = async () => {
            try {
                const response = await friendshipService.checkFriendship(userIds);
                return setFriendShip(response);
            } catch (error) {
                console.error('Error fetching friendship status', error);
            }
        };

        if (users.length > 0) {
            fetchFriendShip();
        }
    }, [userIds]);

    return friendShip;
};

export default useFriendShip;
