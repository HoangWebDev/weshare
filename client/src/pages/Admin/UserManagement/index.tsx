import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import DefaultPagination from '~/components/DefaultPagination';
import { useFetch } from '~/hooks';


const itemsPerPage = 2;

const UserManagement = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { users } = useFetch();
    const [search, setSearch] = useState<string>('');

    const filteredUsers = useMemo(() => {
        if (!users) return [];
        if (!search) return users;
        return users.filter(user =>
            (user.full_name?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
            (user.username?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
            (user.email?.toLowerCase().includes(search.toLowerCase()) ?? false)
        );
    }, [search, users]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        setCurrentPage(1); // Reset page to 1 on search
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem)

    return (
        <>
            <div className='mx-auto max-w-screen-2xl p-6'>
                <div className='mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                    <h2 className="text-2xl font-semibold text-black">User Management</h2>
                    <nav>
                        <ol className="flex items-center gap-2">
                            <li><a className="font-medium" href="/">Task /</a></li>
                            <li className="font-medium text-main">User Management</li>
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
                                    onChange={handleSearchChange}
                                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-2.5 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary"
                                    placeholder="Search..."
                                />
                            </div>
                        </div>
                        <table className="w-full table-auto border-collapse overflow-hidden break-words px-4 md:table-fixed md:overflow-auto md:px-8">
                            <thead className="border-separate px-4">
                                <tr className="border-t border-stroke">
                                    <th className='py-3' title="Toggle SortBy">STT</th>
                                    <th className='py-3' title="Toggle SortBy">Fullname</th>
                                    <th className='py-3' title="Toggle SortBy">Username</th>
                                    <th className='py-3' title="Toggle SortBy">Password</th>
                                    <th className='py-3' title="Toggle SortBy">Email</th>
                                    <th className='py-3' title="Toggle SortBy">Phone</th>
                                    <th className='py-3' title="Toggle SortBy">Block</th>
                                    <th className='py-3' title="Toggle SortBy">Role</th>
                                    <th className='py-3'>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((user, index) => (
                                    <tr key={user.id_user} className="border-t border-stroke" role="row">
                                        <td className='py-3 text-center text-sm font-semibold'>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                        <td className='py-3 text-center text-sm font-semibold'>{user.full_name}</td>
                                        <td className='py-3 text-center text-sm font-semibold'>{user.username}</td>
                                        <td className='py-3 text-center text-sm font-semibold'>**************</td>
                                        <td className='py-3 text-center text-sm font-semibold'>{user.email}</td>
                                        <td className='py-3 text-center text-sm font-semibold'>{user.phone}</td>
                                        <td className='py-3 text-center text-sm font-semibold'>{user.isBlocked === 1 ? "Chặn" : "Đang hoạt động"}</td>
                                        <td className='py-3 text-center text-sm font-semibold'>{user.role}</td>
                                        <td className='py-3 text-center'>
                                            <Link to={`/admin/user-infor/${user.id_user}`}
                                                className='py-1 px-3 rounded bg-main mr-2 text-white'>
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
            <DefaultPagination
                currentPage={currentPage}
                totalItems={filteredUsers.length}
                itemsPerPages={itemsPerPage}
                onPageChange={handlePageChange}
            />
        </>
    );
};

export default UserManagement;
