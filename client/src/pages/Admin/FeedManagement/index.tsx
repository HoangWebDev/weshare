/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-mixed-operators */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import * as userService from '~/services/User/userService';
import { Link } from "react-router-dom";
import Button from "~/components/Button/Button";
import Image from "~/components/Image";
import { useFetch } from "~/hooks";
import UserModel from "~/models/User";

function FeedManagement() {
    const [user, setUser] = useState<Record<number, UserModel>>({})
    const [search, setSearch] = useState<string>('')
    const { posts, refetchPost } = useFetch()

    useEffect(() => {
        const fetchApi = async () => {
            if (posts && posts.length > 0) {
                let usersData: Record<number, UserModel> = {};
                for (const post of posts) {
                    if (post.id_user !== null && post.id_user !== undefined) { // Check if id_user is valid
                        if (!usersData[post.id_user]) {
                            const userData = await userService.getUserById(post.id_user);
                            if (userData) {
                                usersData[post.id_user] = userData;
                            }
                        }
                    }
                }
                setUser(usersData);
            }
        };
        fetchApi();
    }, [posts]);

    const filteredPosts = useMemo(() => {
        if (!posts) return [];
        if (!search) return posts;
        return posts.filter(post =>
            post.content?.toLowerCase().includes(search.toLowerCase())
        )
    }, [search, posts])

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    return (
        <>
            <div className='mx-auto max-w-screen-2xl p-6'>
                <div className='mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                    <h2 className="text-2xl font-semibold text-black">Feed Management</h2>
                    <nav>
                        <ol className="flex items-center gap-2">
                            <li><a className="font-medium" href="/">Task /</a></li>
                            <li className="font-medium text-main">Feed Management</li>
                        </ol>
                    </nav>
                </div>
                <div className="flex flex-col gap-5 md:gap-7 2xl:gap-10">
                    <section className="rounded-sm border border-stroke bg-white py-4 shadow mb-20">
                        <div className="flex justify-between  px-8 pb-4">
                            <div className="w-100">
                                <input
                                    type="text"
                                    value={search}
                                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-2.5 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary"
                                    onChange={handleSearchChange}
                                    placeholder="Search..." />
                            </div>
                        </div>
                        <table className="w-full table-auto border-collapse overflow-hidden break-words px-4 md:table-fixed md:overflow-auto md:px-8">
                            <thead className="border-separate px-4">
                                <tr className="border-t border-stroke">
                                    <th className='py-3' title="Toggle SortBy">
                                        STT
                                    </th>
                                    <th className='py-3' title="Toggle SortBy">
                                        User
                                    </th>
                                    <th className='py-3' title="Toggle SortBy">
                                        Content
                                    </th>
                                    <th className='py-3' title="Toggle SortBy">
                                        Images
                                    </th>
                                    <th className='py-3' title="Toggle SortBy">
                                        Videos
                                    </th>
                                    <th className='py-3' title="Toggle SortBy">
                                        Date posted
                                    </th>
                                    <th className='py-3'>
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPosts?.map((post, index) => (
                                    <tr key={post.id_posts} className="border-t border-stroke" role="row">
                                        <td className='py-3 text-center text-sm font-semibold'>{index + 1}</td>
                                        <td className='py-3 text-center text-sm font-semibold'>{post.id_user && user[post.id_user]?.full_name || "Không xác định"}</td>
                                        <td className='py-3 text-center text-sm font-semibold'>{post.content}</td>
                                        <td className='py-3 text-center text-sm font-semibold size-5'>
                                            {post.images && post.images.length > 0 && (
                                                post.images.map((image, index) => (
                                                    <Image
                                                        key={index}
                                                        fallbackSrc={image} // Handle each image
                                                        alt={`Image ${index}`}
                                                        className="object-cover rounded"
                                                    />
                                                ))
                                            )}
                                        </td>
                                        <td className='py-3 text-center text-sm font-semibold size-5'>
                                            {post.video && post.video.length > 0 && (
                                                post.video.map((videoUrl, index) => {
                                                    // Convert File to URL if needed
                                                    const videoSrc = typeof videoUrl === 'string' ? videoUrl : URL.createObjectURL(videoUrl);

                                                    return (
                                                        <video
                                                            key={index}
                                                            src={videoSrc}
                                                            controls
                                                            className="object-cover rounded"
                                                        />
                                                    );
                                                })
                                            )}
                                        </td>
                                        <td className='py-3 text-center text-sm font-semibold'>
                                            {post.created_at
                                                ? post.created_at instanceof Date
                                                    ? post.created_at.toISOString().split('T')[0]
                                                    : post.created_at
                                                : ''}
                                        </td>
                                        <td className='py-3 text-center'>
                                            <Link to={`/admin/feed-infor/${post.id_posts}`}
                                                className='py-1 px-3 rounded bg-main mr-2 text-white'
                                            >
                                                Detail
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                </div>
            </div>
        </>
    );
}

export default FeedManagement;