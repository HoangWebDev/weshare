/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import Button from '~/components/Button/Button';
import Image from '~/components/Image';
import * as commentService from '~/services/Comment/commentService';
import * as userService from '~/services/User/userService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faEllipsisVertical, faTrash, faEyeSlash, faImage } from '@fortawesome/free-solid-svg-icons';
import { CommentFormProps } from '~/types/Interface/formInterface';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import CommentModel from '~/models/Comment';
import UserModel from '~/models/User';
import { Link } from 'react-router-dom';
import { useProfile } from '~/hooks';
import MenuComment from '~/components/Popper/MenuComment';

interface PreviewFile extends File {
    preview?: string;
}

function Comment({ openComment, toggleComment, idPost }: CommentFormProps) {
    const [user, setUser] = useState<Record<number, UserModel>>({});
    const [selectedFile, setSelectedFile] = useState<PreviewFile | null>(null);
    const [commentPost, setCommentPost] = useState('');

    const userProfile = useProfile();
    const queryClient = useQueryClient();
    const fileInput = useRef<HTMLInputElement | null>(null);

    const {
        isLoading,
        data: commentData,
        refetch,
    } = useQuery({
        queryKey: ['comments/getComment', idPost],
        queryFn: async () => {
            const result = (await commentService.getCommentByIdPost(idPost)) as CommentModel[];
            return result;
        },
    });

    const createCommentMutation = useMutation({
        mutationFn: async (formData: FormData) => {
            return await commentService.createComment(formData);
        },
        onSuccess: () => {
            setCommentPost('');
            queryClient.invalidateQueries({ queryKey: ['comments/getComment'] });
            // Refetch comments sau khi thêm comment
            refetch();
        },
    });

    const deleteCommentMutation = useMutation({
        mutationFn: async (idComment: number) => {
            return await commentService.deleteComment(idComment);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments/getComment'] });
            // Refetch comments sau khi thêm comment
            refetch();
        },
    });

    useEffect(() => {
        const fetchAPI = async () => {
            if (commentData && commentData.length > 0) {
                //Tạo một đối tượng để nhận các user theo id_user trong comment
                let users: Record<number, UserModel> = {};
                for (const comment of commentData) {
                    if (comment.id_user && !users[comment.id_user]) {
                        const userData = await userService.getUserById(comment.id_user);
                        if (userData) {
                            users[comment.id_user] = userData;
                        }
                    }
                }
                setUser(users);
            }
        };

        fetchAPI();
    }, [commentData]);

    const handleSubmitComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (userProfile.id_user && commentPost.trim()) {
            const formData = new FormData();
            formData.append('id_user', String(userProfile.id_user));
            formData.append('id_posts', String(idPost));
            formData.append('content', commentPost);
            if (selectedFile) {
                formData.append('image', selectedFile);
            }
            createCommentMutation.mutate(formData); // Pass the FormData object directly
            setSelectedFile(null);
        }
    };

    const handleDelete = (idComment: number) => {
        console.log('Xóa comment: ', idComment);
        // Ensure `commentData` is available and find the comment with `idComment`
        const commentToDelete = commentData?.find(comment => comment.id_comment === idComment);

        if (commentToDelete && userProfile.id_user === commentToDelete.id_user) {
            deleteCommentMutation.mutate(idComment);
        } else {
            console.log('Unauthorized or comment not found.');
        }
    };

    const MENU_COMMENT = (idComment: number) => [
        {
            icon: <FontAwesomeIcon icon={faTrash} />,
            name: 'Xóa bình luận',
            onClick: () => handleDelete(idComment),
        },
        {
            icon: <FontAwesomeIcon icon={faEyeSlash} />,
            name: 'Ẩn bình luận',
            onClick: () => console.log('Ẩn bình luận'),
        },
    ];

    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const image = e.target.files && e.target.files[0];
        if (image) {
            const previewImage = Object.assign(image, {
                preview: URL.createObjectURL(image),
            })
            setSelectedFile(previewImage);
        }
    };

    const handleChangeInputFile = () => {
        if (fileInput.current) {
            fileInput.current.click();
        }
    }

    return (
        <>
            <div className={openComment ? 'mt-2' : 'hidden'}>
                <hr />
                <div className="mt-2">
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : (
                        commentData?.map((comment) => (
                            <div key={comment.id_comment} className="flex gap-x-2 items-start my-2">
                                <Link to={`/profile/${comment.id_user}`}>
                                    <img
                                        src={comment.id_user ? user[comment.id_user]?.picture_url : ''}
                                        className="w-8 h-8 rounded-full"
                                        alt=""
                                    />
                                </Link>
                                <Link to={`/profile/${comment.id_user}`}>
                                    <div className="flex flex-col">
                                        <div className="p-1 bg-neutral-500 rounded w-max">
                                            <div className="text-xs font-semibold text-white">
                                                {comment.id_user && user[comment.id_user]?.full_name}
                                            </div>
                                            <div className="text-sm text-white">{comment.content}</div>
                                            <div>
                                                {comment.image && (
                                                    <img
                                                        src={comment.image}
                                                        className="w-96 h-60 object-contain rounded"
                                                        alt=""
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <div className="text-gray-500 text-xs">
                                            {comment.created_at
                                                ? new Date(comment.created_at).toLocaleDateString()
                                                : 'Ngày không rõ'}
                                        </div>
                                    </div>
                                </Link>
                                <div>
                                    {comment.id_comment && (
                                        <MenuComment items={MENU_COMMENT(comment?.id_comment)}>
                                            <FontAwesomeIcon
                                                icon={faEllipsisVertical}
                                                className="text-gray-400 py-2 px-2 rounded-md hover:text-gray-500 transition-all duration-300 font-semibold"
                                            />
                                        </MenuComment>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                    <div className="flex gap-x-2">
                        <img src={userProfile.picture_url} className="size-8 rounded-full object-cover" alt="" />
                        <form className='w-full' onSubmit={handleSubmitComment}>
                            <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                                <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                                    <label htmlFor="comment" className="sr-only">Your comment</label>
                                    <textarea
                                        value={commentPost}
                                        id="comment"
                                        className="w-full px-0 text-sm text-gray-900 bg-white border-none outline-none dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required
                                        onChange={(e) => setCommentPost(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                                    <Button className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                                        Post comment
                                        <FontAwesomeIcon
                                            icon={faPaperPlane}
                                            className="py-2 px-2 font-semibold"
                                        />
                                    </Button>
                                    <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
                                        <input ref={fileInput} type="file" hidden onChange={handleChangeFile} />
                                        {selectedFile?.preview ? (
                                            <img src={selectedFile?.preview} alt="Preview" className="size-12 object-cover" />
                                        ) : (
                                            ""
                                        )}
                                        <button
                                            onClick={handleChangeInputFile}
                                            type="button"
                                            className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                            <FontAwesomeIcon icon={faImage} className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Comment;
