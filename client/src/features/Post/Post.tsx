/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Image from '~/components/Image';
import PostModel from '~/models/Post';
import * as loginService from '~/services/Login/loginService';
import * as commentService from '~/services/Comment/commentService';
import * as likeService from '~/services/Like/likeService';
import * as postService from '~/services/Post/postService';

import { ClosePostIcon, CommentIcon, HeartIcon, ShareIcon } from '~/components/Icons';
import { Link } from 'react-router-dom';
import UserModel from '~/models/User';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Comment from '~/features/Comment/Comment';
import CommentModel from '~/models/Comment';
import LikeModel from '~/models/Like';
import { useFetch, useProfile } from '~/hooks';
import MenuComment from '~/components/Popper/MenuComment';
import { faClose, faEllipsisVertical, faEyeSlash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMutation } from '@tanstack/react-query';
import PostForm from './PostForm';

interface PostProps {
    posts: PostModel[];
    checkUser?: number | null;
    togglePostForm: () => void;
}

function Post({ posts, checkUser = null, togglePostForm }: PostProps) {
    //Open Comment Model theo id_posts, nếu null thì không mở binh luận
    const [openCommentId, setOpenCommentId] = useState<number | null>(null);
    //Get user của bài post
    const [user, setUser] = useState<Record<number, UserModel>>({});
    //Get comment theo id_posts
    const [commentShow, setCommentShow] = useState<Record<number, CommentModel[]>>({});
    //Get like theo id_post
    const [likes, setLikes] = useState<Record<number, LikeModel[]>>({});
    const [likedPosts, setLikedPosts] = useState<Record<number, boolean>>({});

    //Set Loading
    const [loading, setLoading] = useState(true);

    //Fetch API
    const { refetchPost } = useFetch();

    //User Profile
    const userProfile = useProfile();

    // Trạng thái mới để quản lý khả năng hiển thị và dữ liệu của PostForm
    const [isPostFormOpen, setIsPostFormOpen] = useState(false);
    const [postFormData, setPostFormData] = useState<PostModel | null>(null);

    useEffect(() => {
        const fetchAPI = async () => {
            console.log('Gọi API');

            if (posts && posts.length > 0) {
                //Tạo một đối tượng để lấy các user theo id_user trong bài post
                let usersData: Record<number, UserModel> = {};
                //Tạo một mảng để lấy các comment theo id_post
                let commentsData: Record<number, CommentModel[]> = {};
                //Tạo một mảng để lấy các like theo id_post
                let likesData: Record<number, LikeModel[]> = {};

                for (const post of posts) {
                    if (post.id_user && !usersData[post.id_user]) {
                        const userData = await loginService.getUserProfile(post.id_user);
                        if (userData) {
                            usersData[post.id_user] = userData;
                        }
                    }
                    if (post.id_posts && !likesData[post.id_posts]) {
                        const likeData = await likeService.getLikeByIdPost(post.id_posts);
                        if (likeData) {
                            likesData[post.id_posts] = likeData;
                        }
                    }
                    if (post.id_posts && !commentsData[post.id_posts]) {
                        const commentData = await commentService.getCommentByIdPost(post.id_posts);
                        if (commentData) {
                            commentsData[post.id_posts] = commentData;
                        }
                    }
                }

                setUser(usersData);
                setCommentShow(commentsData);
                setLikes(likesData);

                // Khởi tạo trạng thái likePosts dựa trên lượt thích
                let likedData: Record<number, boolean> = {};
                posts.forEach((post) => {
                    if (post.id_posts) {
                        //Toán tử !! dùng để chuyển đổi sang kiểu dữ liệu boolean
                        likedData[post.id_posts] = !!likesData[post.id_posts]?.some(
                            (like) => like.id_user === userProfile.id_user,
                        );
                    }
                });
                setLikedPosts(likedData);
                setLoading(false);
            }
        };

        fetchAPI();
    }, [posts]); // Rerun effect khi postsData thay đổi

    // Hiển thị bình luận theo id_posts
    const toggleComment = (idPost: number) => {
        setOpenCommentId((prevId) => (prevId === idPost ? null : idPost));
    };

    const handleLike = useCallback(
        async (idPost: number) => {
            console.log('Thực hiện like');
            if (userProfile.id_user) {
                //Kiểm tra nếu user đã like rồi thì unlike
                if (likes[idPost]?.some((like) => like.id_user === userProfile.id_user)) {
                    const result = await likeService.deleteLike(userProfile.id_user, idPost);
                    if (result) {
                        const updatedLikeData = await likeService.getLikeByIdPost(idPost);
                        if (updatedLikeData) {
                            setLikes((prevLikes) => ({
                                ...prevLikes,
                                [idPost]: updatedLikeData,
                            }));
                            setLikedPosts((prevLikedPosts) => ({
                                ...prevLikedPosts,
                                [idPost]: false,
                            }));
                        }
                    }
                } else {
                    const result = await likeService.postLike(idPost, userProfile.id_user);
                    if (result) {
                        const updatedLikeData = await likeService.getLikeByIdPost(idPost);
                        if (updatedLikeData) {
                            setLikes((prevLikes) => ({
                                ...prevLikes,
                                [idPost]: updatedLikeData,
                            }));
                            setLikedPosts((prevLikedPosts) => ({
                                ...prevLikedPosts,
                                [idPost]: true,
                            }));
                        }
                    }
                }
            }
        },
        [likes, userProfile.id_user],
    );

    //*: Kiểm tra checkUser xem có phải đang ở trang Profile để chỉ hiện các bài viết của userProfile
    const filteredPosts = useMemo(() => {
        console.log('Set post của user Profile');
        return checkUser ? posts.filter((post) => post.id_user === checkUser) : posts;
    }, [posts]);

    //*: Xử lý xóa bài viết
    const handleDeletePost = useCallback(
        async (idPost: number, idUser: number) => {
            //* Nếu userProfile.id_user có tồn tại và bằng với idUser thì tiến hành hỏi người dùng
            if (userProfile.id_user && userProfile.id_user === idUser) {
                const shouldDelete = window.confirm('Bạn có muốn xóa bài viết không?');
                if (shouldDelete) {
                    console.log('Thực hiện xóa');
                    const result = await postService.deletePost(idPost);
                    if (result) {
                        //* Hiện các bài posts còn lại
                        refetchPost();
                    } else {
                        alert('Đã xảy ra lỗi khi xóa bài viết');
                    }
                }
            } else {
                //! Nếu không userProfile.id_user không bằng idUser thì tiến hành hỏi người dùng
                const shouldHide = window.confirm('Bạn không thể xóa bài viết này, bạn có muốn ẩn bài viết không?');
                console.log(posts);
                if (shouldHide) {
                    console.log('Thực hiện ẩn bài viết');
                }
            }
        },
        [userProfile.id_user],
    );

    //*: Cấp nhật bài viết nếu đó là bài viết của user đang đăng nhập
    const handleUpdatePost = (idPost: number) => {
        const postsData = posts.find((post) => post.id_posts === idPost);
        const checkUserProfile = !!userProfile.id_user;
        if (postsData) {
            setPostFormData(postsData);
            setIsPostFormOpen(true);
        }
    };

    const MENU_POST = (idPost: number) => [
        {
            icon: <FontAwesomeIcon icon={faPenToSquare} />,
            name: 'Cập nhật bài viết',
            onClick: () => handleUpdatePost(idPost),
        },
        {
            icon: <FontAwesomeIcon icon={faEyeSlash} />,
            name: 'Ẩn bình luận',
            onClick: () => console.log('Ẩn bình luận'),
        },
    ];

    const isValidURL = (url: string): boolean => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    return (
        <div className="mx-0 mt-2 mb-5">
            {loading ? ( // Hiển thị trạng thái tải nếu dữ liệu đang được tải
                <div>Loading...</div>
            ) : (
                filteredPosts?.map((post) => (
                    <div key={post.id_posts} className="bg-white rounded-lg mx-0 my-2 p-4">
                        <div className="flex justify-between items-start">
                            <Link
                                to={`/@${post.id_user && user[post.id_user]?.username}/${post.id_user}`}
                                className="flex items-center gap-x-2"
                            >
                                {post.id_user && (
                                    <img
                                        src={user[post.id_user]?.picture_url}
                                        alt="Avatar"
                                        className="size-12 rounded-full object-cover"
                                    />
                                )}
                                <div className="">
                                    <h3 className="text-base font-semibold">
                                        {(post.id_user && user[post.id_user]?.full_name) || 'Không xác định'}
                                    </h3>
                                    <p className="text-xs text-gray-400 font-semibold">
                                        {post.created_at
                                            ? new Date(post.created_at).toLocaleDateString()
                                            : 'Ngày không rõ'}
                                    </p>
                                </div>
                            </Link>
                            {checkUser && post.id_user === userProfile.id_user ? (
                                <div className="flex gap-x-2 items-center">
                                    <button
                                        className="cursor-pointer w-5 h-5 rounded-full flex justify-center"
                                        onClick={() => { }}
                                    >
                                        {post.id_posts && (
                                            //*: Hiện menu để quản lý ẩn hiện - cập nhật bài viết nếu đó là bài viết của user đang đăng nhập
                                            <MenuComment items={MENU_POST(post.id_posts)}>
                                                <FontAwesomeIcon
                                                    icon={faEllipsisVertical}
                                                    className="text-gray-400 py-2 px-2 rounded-md hover:text-gray-500 transition-all duration-300 font-semibold"
                                                />
                                            </MenuComment>
                                        )}
                                    </button>
                                    <button
                                        className="cursor-pointer w-5 h-5 rounded-full flex justify-center"
                                        onClick={() => {
                                            post.id_posts &&
                                                post.id_user &&
                                                handleDeletePost(post.id_posts, post.id_user);
                                        }}
                                    >
                                        {/* <ClosePostIcon width="15" height="15" className="text-xs text-gray-500" /> */}
                                        <FontAwesomeIcon
                                            icon={faClose}
                                            className="text-gray-400 py-2 px-2 rounded-md hover:text-gray-500 transition-all duration-300 font-semibold"
                                        />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    className="cursor-pointer w-5 h-5 rounded-full flex justify-center"
                                    onClick={() => {
                                        post.id_posts && post.id_user && handleDeletePost(post.id_posts, post.id_user);
                                    }}
                                >
                                    <ClosePostIcon width="15" height="15" className="text-xs text-gray-500" />
                                </button>
                            )}
                        </div>
                        <div className="text-sm mt-2 font-semibold text-left">{post.content}</div>
                        {post.video && post.video.length > 0 && (
                            <div className="mt-2 w-full flex justify-center flex-wrap">
                                {post.video.map((videoUrl, index) => {
                                    // Convert File to URL if needed
                                    const videoSrc = typeof videoUrl === 'string' ? videoUrl : URL.createObjectURL(videoUrl);

                                    return (
                                        <video
                                            key={index}
                                            src={videoSrc}
                                            controls
                                            className="max-w-96 max-h-44 w-full h-60 object-cover rounded"
                                        />
                                    );
                                })}
                            </div>
                        )}
                        {post.images && post.images.length > 0 && (
                            <div className="mt-2 w-full flex justify-center flex-wrap">
                                {post.images.map((image, index) => (
                                    <Image
                                        key={index}
                                        fallbackSrc={image} // Handle each image
                                        alt={`Image ${index}`}
                                        className="max-w-96 max-h-44 w-full h-60 object-cover rounded"
                                    />
                                ))}
                            </div>
                        )}
                        <div className="flex items-center gap-x-2 mt-2">
                            <div className="cursor-pointer">
                                <span
                                    className="text-gray-500 text-xs flex items-center"
                                    onClick={() => {
                                        post.id_posts && handleLike(post.id_posts);
                                    }}
                                >
                                    <HeartIcon
                                        width="15"
                                        height="15"
                                        className={
                                            post.id_posts && likedPosts[post.id_posts]
                                                ? 'text-red-500 mr-1'
                                                : 'text-gray-500 mr-1'
                                        }
                                    />
                                    {(post.id_posts && likes[post.id_posts]?.length) || 0} Like
                                </span>
                            </div>
                            <div className="cursor-pointer">
                                <span
                                    className="text-gray-500 text-xs flex items-center"
                                    onClick={() => {
                                        post.id_posts && toggleComment(post.id_posts);
                                    }}
                                >
                                    <CommentIcon width="15" height="15" className="text-gray-500 mr-1" />
                                    {(post.id_posts && commentShow[post.id_posts]?.length) || 0} Comment
                                </span>
                            </div>
                            <div className="cursor-pointer">
                                <span className="text-gray-500 text-xs flex items-center">
                                    <ShareIcon width="15" height="15" className="text-gray-500 mr-1" />0 Share
                                </span>
                            </div>
                        </div>
                        {/* Chỉ mở bình luận nếu openCommentId bằng với id_posts */}
                        {openCommentId === post.id_posts && post.id_posts && (
                            <Comment
                                openComment={openCommentId !== null}
                                toggleComment={() => {
                                    post.id_posts && toggleComment(post.id_posts);
                                }}
                                idPost={post.id_posts}
                            />
                        )}
                    </div>
                ))
            )}
            {isPostFormOpen && (
                <PostForm
                    openPost={isPostFormOpen}
                    postsData={postFormData}
                    checkUserProfile={!!userProfile.id_user}
                    togglePostForm={() => setIsPostFormOpen(false)}
                />
            )}
        </div>
    );
}

export default Post;
