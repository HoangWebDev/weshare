/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ResponsiveContext } from '~/features/Provider/ResponsiveProvider';
import Button from '~/components/Button/Button';
import Image from '~/components/Image';
import { useFetch, useProfile } from '~/hooks';
import FriendShip from '~/features/FriendShip/FriendShip';
import UserModel from '~/models/User';

function Friend() {
    const [filterUser, setFilterUser] = useState<UserModel[]>([]);
    const context = useContext(ResponsiveContext);

    const userProfile = useProfile();
    const { users, refetchUsers } = useFetch();
    const userFriend = FriendShip(users, userProfile?.id_user || 0);

    useEffect(() => {
        if (users && userProfile) {
            const filter = users.filter(
                (user) =>
                    user.role !== 1 && user.id_user !== userProfile.id_user &&
                    !userFriend.some((friend) => friend.id_user === user.id_user),
            );
            console.log("Filtered Users:", filter);
            setFilterUser(filter);
        }
    }, [users, userProfile, userFriend]);

    const handleAddFriend = (friendId: number) => {
        console.log(`Add friend with ID: ${friendId}`);
    };

    const handleRemoveFriend = (friendId: number) => {
        // Gửi yêu cầu xóa bạn bè
        console.log(`Remove friend with ID: ${friendId}`);
        // Thực hiện API call hoặc logic xóa bạn bè tại đây
    };

    return (
        <>
            <section className="fixed top-[60px] left-[16.25rem] max-h-[90vh] overflow-y-auto ml-[1rem] mr-[1rem] scrollbar hidden md:block">
                <h1 className="text-xl font-semibold text-left">Friends</h1>
                <div className="py-4">
                    <div className="ml-2 flex flex-wrap justify-start gap-2">
                        {filterUser &&
                            filterUser?.map((user) => (
                                <div
                                    key={user.id_user}
                                    className=" flex flex-col gap-y-2 p-2 rounded-lg bg-white text-center"
                                >
                                    <Link to={`/@${user.full_name}/${user.id_user}`}>
                                        {user.picture_url ? (
                                            <img
                                                src={user.picture_url}
                                                alt="Avatar"
                                                className="size-48 block rounded-lg object-cover"
                                            />
                                        ) : (
                                            <Image className="size-48 block rounded-lg object-cover" />
                                        )}
                                    </Link>
                                    <Link to={`/@${user.full_name}/${user.id_user}`}>
                                        <h2 className="text-left font-semibold">{user.full_name}</h2>
                                    </Link>
                                    <Button
                                        className="p-2 rounded bg-main text-white outline-none transition-all hover:bg-blue-600"
                                        onClick={() => handleAddFriend(user.id_user || 0)}
                                    >
                                        Thêm bạn
                                    </Button>
                                    <Button
                                        className="p-2 rounded bg-slate-400 text-white outline-none transition-all hover:bg-blue-600 hover:border-none"
                                        onClick={() => handleRemoveFriend(user.id_user || 0)}
                                    >
                                        Xóa
                                    </Button>
                                </div>
                            ))}
                    </div>
                </div>
            </section>
            {/* Responsive */}
            <section
                className={
                    context.responsive
                        ? 'w-responsive fixed top-[60px] max-h-[90vh] overflow-y-auto m-4 scrollbar'
                        : 'hidden'
                }
            >
                <div className="py-4">
                    <div className="ml-2 flex flex-wrap justify-start gap-2">
                        <Link
                            to="/friend/:id"
                            className="w-full flex items-center justify-around gap-x-2 p-2 rounded-lg bg-white text-center"
                        >
                            <Image className="w-1/5 h-full block rounded-full" />
                            <div className="w-full">
                                <h2 className="mb-2 text-left text-base font-semibold">Name</h2>
                                <div className="flex gap-x-2">
                                    <Button className="w-full p-2 rounded bg-main text-white outline-none transition-all hover:bg-blue-600">
                                        Thêm bạn
                                    </Button>
                                    <Button className="w-full p-2 rounded bg-slate-400 text-white outline-none transition-all hover:bg-blue-600 hover:border-none">
                                        Xóa
                                    </Button>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Friend;
