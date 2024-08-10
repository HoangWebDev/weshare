/* eslint-disable no-mixed-operators */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { faCamera, faImage, faPaperclip, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as userService from '~/services/User/userService';
import * as friendshipService from '~/services/FriendShip/friendshipService';

import Button from '~/components/Button/Button';
import Image from '~/components/Image';
import { PostForm } from '~/features/Post';
import Post from '~/features/Post/Post';
import { ResponsiveContext } from '~/features/Provider/ResponsiveProvider';
import { useFetch, useProfile } from '~/hooks';
import FriendShip from '~/features/FriendShip/FriendShip';
import PostModel from '~/models/Post';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import UserModel from '~/models/User';

// Extend the File type to include a preview property
interface PreviewFile extends File {
    preview?: string;
}

function Profile() {
    const { id } = useParams<{ id: string }>();
    const idUser = Number(id);
    const [openPost, setOpenPost] = useState(false);
    const context = useContext(ResponsiveContext);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [selectedFile, setSelectedFile] = useState<PreviewFile | null>(null);
    const userProfile = useProfile();
    const queryClient = new QueryClient();

    const { data } = useQuery<UserModel>({
        queryKey: ['user/getUser', idUser],
        queryFn: async () => {
            if (idUser) {
                const result = await userService.getUserById(idUser);
                return result;
            }
        },
    });
    console.log(data);

    const { posts, users } = useFetch();
    const friendShip = FriendShip(users, data?.id_user || 0);

    const togglePostForm = () => {
        setOpenPost(!openPost);
    };

    // Lọc các bài post chỉ của id_user tương ứng
    const filteredPosts = useMemo(() => {
        if (!posts) {
            return [];
        }
        return posts.filter((post) => post.id_user === Number(id));
    }, [posts, id]);

    const updateUserPictureMutation = useMutation({
        mutationFn: async (formData: FormData) => userService.updateUser(idUser, formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user/getUser', idUser] });
        },
    });

    // useEffect để gửi file ảnh khi selectedFile thay đổi
    useEffect(() => {
        const updateUserPicture = async () => {
            if (selectedFile) {
                const formData = new FormData();
                formData.append('image', selectedFile);
                try {
                    await updateUserPictureMutation.mutateAsync(formData);
                    // Thực hiện các thay đổi hoặc hiển thị thông báo thành công
                } catch (error) {
                    // Xử lý lỗi từ API hoặc hiển thị thông báo lỗi
                    console.error('Lỗi khi cập nhật ảnh đại diện:', error);
                }
            }
        };

        updateUserPicture();
    }, [selectedFile, idUser]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const image = e.target.files && e.target.files[0];
        if (image) {
            console.log('Ảnh đã chọn:', image);

            // Sử dụng URL.createObjectURL để tạo URL xem trước
            const previewImage = Object.assign(image, { preview: URL.createObjectURL(image) });
            console.log('URL xem trước:', previewImage.preview);

            // Giải phóng URL blob cũ nếu có
            if (selectedFile?.preview) {
                URL.revokeObjectURL(selectedFile.preview);
            }

            setSelectedFile(previewImage);
        }
    };

    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleDeleteFriend = async (idUser1: number, idUser2: number) => {
        try {
            const result = await friendshipService.deleteFriendship(idUser1, idUser2);
            console.log(result);
        } catch (error) {
            console.error('Lỗi khi xóa bạn bè:', error);
        }
    };

    return (
        <div className="w-4/5">
            <div className="relative mb-40">
                <div className="h-[250px] bg-slate-400 rounded-b-md"></div>
                <div className="mb-5 absolute -bottom-2/3 left-7">
                    <div className="flex items-center gap-x-2">
                        <div className="w-44 h-44 relative">
                            {data && data.picture_url ? (
                                <img
                                    src={data.picture_url}
                                    alt="avatar"
                                    className="size-40 rounded-full p-1 bg-[#ffffff] object-cover"
                                />
                            ) : (
                                <Image className="size-40 rounded-full p-1 bg-[#ffffff] object-cover" />
                            )}
                            {userProfile.id_user === idUser &&
                                <Button>
                                    <FontAwesomeIcon
                                        onClick={handleImageClick}
                                        icon={faCamera}
                                        className="absolute bottom-4 right-4 text-xl text-gray-500 bg-[#f1f1f1] p-2 rounded-full"
                                    />
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        onChange={handleFileChange}
                                        className="my-2 hidden"
                                    />
                                </Button>
                            }
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold">{data && data.full_name}</h2>
                            <span className="text-xs font-bold text-neutral-400">{friendShip.length} bạn bè</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex gap-x-2">
                <div className="flex flex-col w-2/6 gap-y-2 sticky max-h-[100vh] top-[52px]">
                    <div className="bg-white p-2 rounded">
                        <h2 className="text-xl font-bold">Giới thiệu</h2>
                        <Button className="w-full mt-2 p-2 rounded bg-gray-400 font-semibold">Thêm tiểu sử</Button>
                    </div>
                    <div className="bg-white p-2 rounded">
                        <h2 className="text-xl font-bold">Bạn bè</h2>
                        <span className="text-sm text-slate-900">{friendShip.length} bạn</span>
                        <div className="mt-2 pl-2 flex gap-2 flex-wrap">
                            {friendShip &&
                                friendShip.map((friend) => (
                                    <div
                                        key={friend.id_user}
                                        className="w-profileFriend flex flex-col gap-y-2 text-center"
                                    >
                                        <Link to={`/@${friend.username}/${friend.id_user}`}>
                                            {friend.picture_url ? (
                                                <img
                                                    src={friend.picture_url}
                                                    alt={friend.full_name}
                                                    className="size-36 block rounded-lg object-cover"
                                                />
                                            ) : (
                                                <Image
                                                    alt={friend.full_name}
                                                    className="size-36 block rounded-lg object-cover"
                                                />
                                            )}
                                        </Link>
                                        <Link to={`/@${friend.username}/${friend.id_user}`}><h2 className="text-left text-black text-sm font-semibold">{friend.full_name}</h2></Link>
                                        <Button
                                            className="p-2 rounded bg-slate-400 text-white outline-none transition-all hover:bg-blue-600 hover:border-none"
                                            onClick={() => handleDeleteFriend(friend.id_user || 0, data && data.id_user || 0)}
                                        >
                                            Xóa
                                        </Button>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
                <div className="w-4/6">
                    <div className="p-2 bg-white rounded">
                        <div className="flex items-center gap-x-2">
                            {data && data.picture_url ? (
                                <img
                                    src={data.picture_url}
                                    className="size-12 rounded-full object-cover"
                                    alt="avatar"
                                />
                            ) : (
                                <Image className="size-12 rounded-full object-cover" alt="avatar" />
                            )}
                            <Button
                                className="w-full pl-5 text-left text-sm text-black cursor-pointer py-2 rounded-[10px] border-none outline-none bg-gray-200"
                                onClick={() => setOpenPost(!openPost)}
                            >
                                What's on your mind, {data && data.full_name}?
                            </Button>
                            <PostForm openPost={openPost} togglePostForm={togglePostForm} />
                        </div>
                        <hr className="my-1" />
                        <div className="pt-2 flex justify-start gap-x-12">
                            <Button className="flex gap-x-2 items-center">
                                <FontAwesomeIcon icon={faVideo} className="text-sm text-red-500" />
                                <p className="text-sm font-semibold text-black">Live Video</p>
                            </Button>
                            <Button className="flex gap-x-2 items-center">
                                <FontAwesomeIcon icon={faImage} className="text-sm text-green-500" />
                                <p className="text-sm font-semibold text-black">Image/Video</p>
                            </Button>
                            <Button className="flex gap-x-2 items-center">
                                <FontAwesomeIcon icon={faPaperclip} className="text-sm text-yellow-500" />
                                <p className="text-sm font-semibold text-black">Attachment</p>
                            </Button>
                        </div>
                    </div>

                    <Post posts={filteredPosts} checkUser={Number(id)} togglePostForm={togglePostForm} />
                </div>
            </div>
        </div>
    );
}

export default Profile;
