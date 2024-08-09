/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faVideo, faImage, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { ResponsiveContext } from '~/features/Provider/ResponsiveProvider';
import PostForm from '~/features/Post/PostForm';
import Contact from '~/pages/Contact/Contact';
import Button from '~/components/Button/Button';
import Image from '~/components/Image';
import Post from '~/features/Post/Post';
import { useFetch, useProfile } from '~/hooks';
import FriendShip from '~/features/FriendShip/FriendShip';

function Feed() {
    const [openPost, setOpenPost] = useState(false);
    const context = useContext(ResponsiveContext);
    const userProfile = useProfile();
    const { posts, users } = useFetch();
    const userProfileId = userProfile.id_user ?? 0;

    const friendShip = FriendShip(users, userProfileId);

    const togglePostForm = () => {
        setOpenPost(!openPost);
    };

    return (
        <>
            <section className="w-custom fixed top-[60px] left-[16.25rem] max-h-[90vh] overflow-y-auto ml-[1rem] mr-[1rem] scrollbar hidden md:block">
                <div className="flex items-center gap-x-2 p-4 bg-white rounded-lg">
                    <div className="relative text-center">
                        <img
                            src={userProfile?.picture_url}
                            alt="Avatar"
                            className="size-20 border-solid border-[3px] p-[2px] rounded-full object-cover"
                        />
                        <FontAwesomeIcon
                            icon={faPlusCircle}
                            className="absolute right-1/2 bottom-8 translate-x-1/2 translate-y-1/2 text-2xl text-[blue] z-10 p-[2px] bg-white rounded-full"
                        />
                        <p className="text-xs font-semibold text-gray-400 mt-2">Your news</p>
                    </div>
                    {friendShip.map((item) => (
                        <div key={item.id_user} className="relative text-center">
                            {item.picture_url ? (
                                <img
                                    src={item.picture_url}
                                    alt="Avatar"
                                    className="size-20 border-solid border-[3px] p-[2px] rounded-full object-cover"
                                />
                            ) : (
                                <Image
                                    alt="Avatar"
                                    className="size-20 border-solid border-[3px] p-[2px] rounded-full object-cover"
                                />
                            )}
                            <p className="text-xs font-semibold text-gray-400 mt-2">{item.full_name}</p>
                        </div>
                    ))}
                </div>
                <div className="p-4 bg-white rounded-lg mt-2">
                    <div className="flex items-center gap-x-2">
                        <img
                            src={userProfile?.picture_url}
                            alt="Avatar"
                            className="size-12 rounded-full object-cover"
                        />
                        <Button
                            className="w-full pl-5 text-left text-sm text-gray-400 cursor-pointer py-2 rounded-[10px] border-none outline-none bg-gray-200"
                            onClick={() => setOpenPost(!openPost)}
                        >
                            What's on your mind, {userProfile.full_name}?
                        </Button>
                        <PostForm openPost={openPost} togglePostForm={togglePostForm} />
                    </div>
                    <hr className="my-1" />
                    <div className="pt-2 flex justify-start gap-x-12">
                        <Button className="flex gap-x-2 items-center">
                            <FontAwesomeIcon icon={faVideo} className="text-sm text-red-500" />
                            <p className="text-sm font-semibold text-gray-400">Live Video</p>
                        </Button>
                        <Button className="flex gap-x-2 items-center">
                            <FontAwesomeIcon icon={faImage} className="text-sm text-green-500" />
                            <p className="text-sm font-semibold text-gray-400">Image/Video</p>
                        </Button>
                        <Button className="flex gap-x-2 items-center">
                            <FontAwesomeIcon icon={faPaperclip} className="text-sm text-yellow-500" />
                            <p className="text-sm font-semibold text-gray-400">Attachment</p>
                        </Button>
                    </div>
                </div>
                <Post posts={posts || []} togglePostForm={togglePostForm} />
                <Contact />
            </section>
            {/* Responsive */}
            <section
                className={
                    context.responsive
                        ? 'w-responsive fixed top-[60px] max-h-[90vh] overflow-y-auto m-4 scrollbar'
                        : 'hidden'
                }
            >
                <div className="flex items-center gap-x-2 p-4 bg-white rounded-lg">
                    <div className="relative text-center">
                        <Image className="w-16 border-solid border-[3px] p-[2px] rounded-full object-cover" />
                        <FontAwesomeIcon
                            icon={faPlusCircle}
                            className="absolute right-1/2 bottom-8 translate-x-1/2 translate-y-1/2 text-2xl text-[blue] z-10 p-[2px] bg-white"
                        />
                        <p className="text-xs font-semibold text-gray-400 mt-2">Tin của bạn</p>
                    </div>
                    <div className="relative text-center">
                        <Image className="w-16 border-solid border-[3px] border-[#959393] p-[2px] rounded-full object-cover" />
                        <p className="text-xs font-semibold text-gray-400 mt-2">Username</p>
                    </div>
                </div>
                <div className="p-4 bg-white rounded-lg mt-2">
                    <div className="flex items-center gap-x-2">
                        <Image className="size-12 rounded-full object-cover" />
                        <button
                            className="w-full pl-5 text-left text-sm text-gray-400 cursor-pointer py-2 rounded-[10px] border-none outline-none bg-gray-200"
                            onClick={() => togglePostForm()}
                        >
                            What's on your mind, Huỳnh Hoàng?
                        </button>
                        <PostForm openPost={openPost} togglePostForm={togglePostForm} />
                    </div>
                    <hr className="my-1" />
                    <div className="pt-2 flex justify-start gap-x-4">
                        <div className="flex gap-x-2 items-center">
                            <FontAwesomeIcon icon={faVideo} className="text-sm text-red-500" />
                            <p className="text-sm font-semibold text-gray-400">Live Video</p>
                        </div>
                        <div className="flex gap-x-2 items-center">
                            <FontAwesomeIcon icon={faImage} className="text-sm text-green-500" />
                            <p className="text-sm font-semibold text-gray-400">Image/Video</p>
                        </div>
                        <div className="flex gap-x-2 items-center">
                            <FontAwesomeIcon icon={faPaperclip} className="text-sm text-yellow-500" />
                            <p className="text-sm font-semibold text-gray-400">Attachment</p>
                        </div>
                    </div>
                </div>
                <Post posts={posts || []} togglePostForm={togglePostForm} />
            </section>
        </>
    );
}

export default Feed;
