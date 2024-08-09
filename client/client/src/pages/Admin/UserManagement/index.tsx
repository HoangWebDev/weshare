/* eslint-disable @typescript-eslint/no-unused-vars */
// src/pages/Admin/UserManagement.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '~/components/Button/Button';
import Image from '~/components/Image';
import ManagementAdmin from '~/features/ManagementAdmin';
import { useFetch } from '~/hooks';

const UserManagement = () => {
    const [openManage, setOpenManage] = useState(false)
    const { users, refetchUsers } = useFetch()

    const toggleManage = (idUser: number) => {
        setOpenManage(!openManage);

    };

    return (
        <div className='mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10'>
            <div className='mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                <h2 className="text-2xl font-semibold text-black">User Management</h2>
                <nav>
                    <ol className="flex items-center gap-2">
                        <li><a className="font-medium" href="/">Dashboard /</a></li>
                        <li className="font-medium text-main">User Management</li>
                    </ol>
                </nav>
            </div>
            <div className="flex flex-col gap-5 md:gap-7 2xl:gap-10">
                <section className="rounded-sm border border-stroke bg-white py-4 shadow-default">
                    <div className="flex justify-between  px-8 pb-4">
                        <div className="w-100">
                            <input type="text" className="w-full rounded-md border border-stroke bg-transparent px-5 py-2.5 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary" placeholder="Search..." />
                        </div>
                        <div className="flex items-center font-medium">
                            <select className="bg-transparent pl-2">
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                            </select>
                            <p className="pl-2 text-black">Entries Per Page</p>
                        </div>
                    </div>
                    <table className="w-full table-auto border-collapse overflow-hidden break-words px-4 md:table-fixed md:overflow-auto md:px-8">
                        <thead className="border-separate px-4">
                            <tr className="border-t border-stroke">
                                <th className='py-3' title="Toggle SortBy">
                                    Fullname
                                </th>
                                <th className='py-3' title="Toggle SortBy">
                                    Username
                                </th>
                                <th className='py-3' title="Toggle SortBy">
                                    Password
                                </th>
                                <th className='py-3' title="Toggle SortBy">
                                    Email
                                </th>
                                <th className='py-3' title="Toggle SortBy">
                                    Phone
                                </th>
                                <th className='py-3' title="Toggle SortBy">
                                    Role
                                </th>
                                <th className='py-3'>
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.map((user =>
                                <tr key={user.id_user} className="border-t border-stroke" role="row">
                                    <td className='py-3 text-center text-sm font-semibold'>{user.full_name}</td>
                                    <td className='py-3 text-center text-sm font-semibold'>{user.username}</td>
                                    <td className='py-3 text-center text-sm font-semibold'>**************</td>
                                    <td className='py-3 text-center text-sm font-semibold'>{user.email}</td>
                                    <td className='py-3 text-center text-sm font-semibold'>{user.phone}</td>
                                    <td className='py-3 text-center text-sm font-semibold'>{user.role}</td>
                                    <td className='py-3 text-center'>
                                        <Link to={"/admin/user-update"}
                                            className='py-1 px-3 rounded bg-main mr-2 text-white'
                                        >
                                            Sửa
                                        </Link>
                                        <Button className='py-1 px-3 rounded bg-red-500 mr-2 text-white'>Xóa</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    );
};

export default UserManagement;