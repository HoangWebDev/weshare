/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryClient, useMutation } from '@tanstack/react-query';
import * as postService from '~/services/Post/postService';
import Image from '~/components/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faVideo, faImage, faPaperclip, faClose } from '@fortawesome/free-solid-svg-icons';
import { PostFormProps } from '~/types/Interface/formInterface';
import Button from '~/components/Button/Button';
import { useEffect, useRef, useState } from 'react';
import { useFetch, useProfile } from '~/hooks';
import PostModel from '~/models/Post';

// Extend the File type to include a preview property
interface PreviewFile extends File {
    preview?: string;
    fileType?: string; // Sử dụng tên khác để phân biệt loại tệp
}

interface PostFormData extends PostFormProps {
    checkUserProfile?: boolean;
    postsData?: PostModel | null;
}

function PostForm({ openPost, checkUserProfile = false, postsData, togglePostForm }: PostFormData) {
    //Sử dụng postsData để truy cập đến bài đăng hiện tại và có thể cập nhật lại bài đăng đó
    const [addPost, setAddPost] = useState(postsData?.content || '');
    const [selectedFiles, setSelectedFiles] = useState<PreviewFile[]>(
        postsData?.images ? postsData.images.map(image => ({ preview: image } as PreviewFile)) : []
    );

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const userProfile = useProfile();
    const { refetchPost } = useFetch();
    const queryClient = new QueryClient();

    const mutate = useMutation({
        mutationFn: async (formData: FormData) => {
            if (checkUserProfile && postsData?.id_posts) {
                // Update post
                return await postService.updatePost(postsData.id_posts, formData);
            } else {
                // Add post
                return await postService.addPost(formData);
            }
        },
        onSuccess: () => {
            setAddPost('');
            setSelectedFiles([]);
            togglePostForm();
            queryClient.invalidateQueries({ queryKey: ['posts/getPost'] });
            refetchPost();
        },
        onError: (error) => {
            console.error('Error uploading post:', error);
            alert('Có lỗi xảy ra khi tải lên. Vui lòng kiểm tra kích thước tệp và thử lại.');
        }
    });

    const handleSubmitPost = (e: React.FormEvent) => {
        e.preventDefault();

        if (userProfile.id_user && addPost.trim()) {
            const formData = new FormData();
            formData.append('id_user', String(userProfile.id_user));
            formData.append('content', addPost);

            // Duyệt mảng selectedFiles để thêm vào formData
            selectedFiles.forEach((file) => {
                if (file instanceof File) {
                    if (file.type.startsWith('image/')) {
                        formData.append('images', file, file.name);
                    } else if (file.type.startsWith('video/')) {
                        formData.append('video', file, file.name);
                    }
                }
            });

            mutate.mutate(formData);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const files = e.target.files;
        if (files) {
            const fileArray = Array.from(files).map((file) => {
                // Tạo URL cho video nếu cần
                const preview = file.type.startsWith('video/')
                    ? URL.createObjectURL(file)
                    : URL.createObjectURL(file);
                return Object.assign(file, { preview, fileType: file.type });
            });
            setSelectedFiles(prevFiles => [...prevFiles, ...fileArray]);
        }
    };

    // Xóa ảnh
    const removeFile = (index: number) => {
        setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    };

    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <>
            <div
                className={
                    openPost
                        ? 'w-9/12 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-2 bg-white rounded-lg z-30 overflow-y-hidden'
                        : 'hidden'
                }
            >
                <div className="flex items-center gap-x-2 justify-between p-2">
                    <h3 className="text-md font-bold text-black">{checkUserProfile ? 'Update Post' : 'Create Post'}</h3>
                    <FontAwesomeIcon
                        icon={faClose}
                        className="text-sm text-gray-500 cursor-pointer"
                        onClick={() => togglePostForm()}
                    />
                </div>
                <div className="flex items-center gap-x-2 p-2">
                    <img src={userProfile.picture_url} alt="Avatar" className="size-12 rounded-full object-cover" />
                    <h3 className="text-sm font-semibold text-black">{userProfile.full_name}</h3>
                </div>

                <form className="w-full p-2 flex flex-col" onSubmit={handleSubmitPost}>
                    <textarea
                        value={addPost}
                        placeholder="What's on your mind, Huỳnh Hoàng?"
                        className="border-none outline-none py-2 px-2 mb-3 rounded-md bg-white text-gray-400 focus:shadow-sm focus:shadow-sky-400 transition-all duration-150"
                        onChange={(e) => setAddPost(e.target.value)}
                    />
                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple // Allow multiple file uploads
                        onChange={handleFileChange}
                        className="my-2 hidden"
                    />
                    <div className="flex flex-wrap gap-2 my-2">
                        {selectedFiles.map((file, index) => (
                            <div key={index} className="relative">
                                {file.fileType?.startsWith('video/') ? (
                                    <video
                                        src={file.preview}
                                        controls
                                        className="size-52 object-cover"
                                    />
                                ) : (
                                    <img
                                        src={file.preview}
                                        alt="Preview"
                                        className="size-52 object-cover"
                                    />
                                )}
                                <button
                                    type="button"
                                    onClick={() => removeFile(index)}
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 m-1"
                                    aria-label="Remove file"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center gap-x-5 my-2 p-2">
                        <FontAwesomeIcon icon={faCamera} className="cursor-pointer text-md text-blue-500" />
                        <FontAwesomeIcon icon={faVideo} className="cursor-pointer text-md text-red-500" />
                        <FontAwesomeIcon
                            icon={faImage}
                            className="cursor-pointer text-md text-green-500"
                            onClick={handleImageClick}
                        />
                        <FontAwesomeIcon icon={faPaperclip} className="cursor-pointer text-md text-yellow-500" />
                    </div>
                    <Button className="w-full bg-gray-300 text-gray-400 py-2 px-2 rounded-md hover:bg-[blue] hover:text-white transition-all duration-300 font-semibold">
                        {checkUserProfile ? 'Update Post' : 'Post'}
                    </Button>
                </form>
            </div>
            <div
                className={openPost ? 'fixed inset-0 bg-black opacity-50 z-20 overflow-y-hidden' : 'hidden'}
                onClick={() => togglePostForm()}
            ></div>
        </>
    );
}

export default PostForm;
