/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import * as userService from '~/services/User/userService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import UserModel from '~/models/User';
import { useNavigate, useParams } from 'react-router-dom';
import { useProfile } from '~/hooks';

function ManagementUserAdmin() {
    const { id_user } = useParams();
    const userProfile = useProfile();
    const navigate = useNavigate();
    const [user, setUser] = useState<UserModel>({ isBlocked: 0 });
    const [isBlocked, setIsBlocked] = useState(user.isBlocked);

    const idUser = Number(id_user);
    const queryClient = new QueryClient();

    const { isLoading, data, refetch } = useQuery({
        queryKey: ['user/getUser'],
        queryFn: async () => {
            if (idUser) {
                const result = await userService.getUserById(idUser);
                return result;
            }
        },
    });

    const updateUserMutation = useMutation({
        mutationFn: async (formData: FormData) => userService.updateUser(idUser, formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user/getUser', idUser] });
            refetch();
            navigate('/admin/user-management');
        },
        onError: (error) => {
            console.error('Error updating user:', error);
        },
    });

    useEffect(() => {
        if (data) {
            setUser(data);
            setIsBlocked(data.isBlocked);
        }
    }, [data]);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = Number(e.target.value);
        setIsBlocked(newValue);
        setUser({ ...user, isBlocked: newValue });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: type === 'radio' ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Updated user data:', user);
        const formData = new FormData();
        formData.append('role', String(user.role || 0));
        formData.append('isBlocked', String(isBlocked))
        updateUserMutation.mutate(formData);
    };

    return (
        <>
            <div className='mb-10 max-w-screen-2xl p-6'>
                <div className='mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                    <h2 className="text-2xl font-semibold text-black">User Information</h2>
                    <nav>
                        <ol className="flex items-center gap-2">
                            <li><a className="font-medium" href="/">Task / User /</a></li>
                            <li className="font-medium text-main">User Information</li>
                        </ol>
                    </nav>
                </div>
                <div className="flex flex-col gap-5 md:gap-7 2xl:gap-10">
                    <form className="rounded-sm border border-stroke bg-white py-4 shadow mb-20" onSubmit={handleSubmit}>
                        <div className='grid grid-cols-1 sm:grid-cols-2'>
                            <div className='p-6 flex flex-col gap-4 border-r-[1px]'>
                                <div className="text-left text-black">
                                    <label htmlFor="text" className="mb-3 block text-base font-medium text-black">
                                        Fullname:
                                    </label>
                                    <input
                                        name="full_name"
                                        defaultValue={user.full_name}
                                        spellCheck={false}
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary"
                                        placeholder="Fullname"
                                        onChange={handleInputChange}
                                        disabled={userProfile.role !== 0} // Only allow admin to change gender
                                    />
                                    <small className="text-gray-500">* The field cannot be edited</small>
                                </div>
                                <div className="text-left text-black">
                                    <label htmlFor="email" className="mb-3 block text-base font-medium text-black">
                                        Email:
                                    </label>
                                    <input
                                        name="email"
                                        defaultValue={user.email}
                                        spellCheck={false}
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary"
                                        placeholder="Email"
                                        onChange={handleInputChange}
                                        disabled={userProfile.role !== 0} // Only allow admin to change gender
                                    />
                                    <small className="text-gray-500">* The field cannot be edited</small>
                                </div>
                                <div className="text-left text-black">
                                    <label htmlFor="text" className="mb-3 block text-base font-medium text-black">
                                        Username:
                                    </label>
                                    <input
                                        name="username"
                                        defaultValue={user.username}
                                        spellCheck={false}
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary"
                                        placeholder="Username"
                                        onChange={handleInputChange}
                                        disabled={userProfile.role !== 0} // Only allow admin to change gender
                                    />
                                    <small className="text-gray-500">* The field cannot be edited</small>
                                </div>
                                <div className="text-left text-black">
                                    <label htmlFor="text" className="mb-3 block text-base font-medium text-black">
                                        Password:
                                    </label>
                                    <input
                                        name="password"
                                        defaultValue="*************"
                                        spellCheck={false}
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary"
                                        placeholder="Password"
                                        onChange={handleInputChange}
                                        disabled={userProfile.role !== 0} // Only allow admin to change gender
                                    />
                                    <small className="text-gray-500">* The field cannot be edited</small>
                                </div>
                                <div className="text-left text-black">
                                    <label htmlFor="text" className="mb-3 block text-base font-medium text-black">
                                        Phone:
                                    </label>
                                    <input
                                        name="phone"
                                        defaultValue={user.phone}
                                        spellCheck={false}
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary"
                                        placeholder="Phone"
                                        onChange={handleInputChange}
                                        disabled={userProfile.role !== 0} // Only allow admin to change gender
                                    />
                                    <small className="text-gray-500">* The field cannot be edited</small>
                                </div>
                            </div>
                            <div className='p-6 flex flex-col gap-4'>
                                <div className="text-left text-black">
                                    <label htmlFor="text" className="mb-3 block text-base font-medium text-black">
                                        Birthday:
                                    </label>
                                    <input
                                        name="birthday"
                                        defaultValue={
                                            user.birthday
                                                ? user.birthday instanceof Date
                                                    ? user.birthday.toISOString().split('T')[0]
                                                    : user.birthday
                                                : ''
                                        }
                                        spellCheck={false}
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary"
                                        placeholder="Birthday"
                                        onChange={handleInputChange}
                                        disabled={userProfile.role !== 0} // Only allow admin to change gender
                                    />
                                    <small className="text-gray-500">* The field cannot be edited</small>
                                </div>
                                <div className="text-left text-black">
                                    <label htmlFor="role" className="mb-3 block text-base font-medium text-black">
                                        Role:
                                    </label>
                                    <input
                                        name="role"
                                        defaultValue={user.role}
                                        spellCheck={false}
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary"
                                        placeholder="Role"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="text-left text-black">
                                    <label htmlFor="role" className="mb-3 block text-base font-medium text-black">
                                        Block:
                                    </label>
                                    <select
                                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2'
                                        value={isBlocked}
                                        onChange={handleSelectChange}
                                    >
                                        <option value={0}>Đang hoạt động</option>
                                        <option value={1}> Chặn</option>
                                    </select>
                                </div>
                                <div className="text-left text-black">
                                    <label htmlFor="gender" className="mb-3 block text-base font-medium text-black">
                                        Gender:
                                    </label>
                                    <div className="ml-4 flex gap-x-2 justify-start">
                                        <div className="flex gap-x-2 items-center">
                                            <label htmlFor="gender">
                                                <span className="text-sm">Male</span>
                                            </label>
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="0"
                                                checked={user.gender === 0}
                                                className="mt-1 focus:border-[#5271ff] hover:border-[#5271ff] rounded-md outline-none border-[1px] p-1 placeholder:text-xs placeholder:pl-1"
                                                onChange={handleInputChange}
                                                disabled={userProfile.role !== 0} // Only allow admin to change gender
                                            />
                                        </div>
                                        <div className="flex gap-x-2 items-center">
                                            <label htmlFor="gender">
                                                <span className="text-sm">Female</span>
                                            </label>
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="1"
                                                checked={user.gender === 1}
                                                className="mt-1 focus:border-[#5271ff] hover:border-[#5271ff] rounded-md outline-none border-[1px] p-1 placeholder:text-xs placeholder:pl-1"
                                                onChange={handleInputChange}
                                                disabled={userProfile.role !== 0} // Only allow admin to change gender
                                            />
                                        </div>
                                        <div className="flex gap-x-2 items-center">
                                            <label htmlFor="gender">
                                                <span className="text-sm">Other</span>
                                            </label>
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="2"
                                                checked={user.gender === 2}
                                                className="mt-1 focus:border-[#5271ff] hover:border-[#5271ff] rounded-md outline-none border-[1px] p-1 placeholder:text-xs placeholder:pl-1"
                                                onChange={handleInputChange}
                                                disabled={userProfile.role !== 0} // Only allow admin to change gender
                                            />
                                        </div>
                                    </div>
                                    <small className="text-gray-500">* The field cannot be edited</small>
                                </div>
                                <div className="text-left text-black">
                                    <label htmlFor="file_input" className="mb-3 block text-base font-medium text-black">
                                        Avatar
                                    </label>
                                    <div className="flex flex-row items-center">
                                        {data?.picture_url ? (
                                            <label className="text-sm text-slate-500">
                                                <img className="size-20" src={data.picture_url} alt="Current" />
                                            </label>
                                        ) : (
                                            <label className="text-sm text-slate-500">No Avatar</label>
                                        )}
                                    </div>
                                    <small className="text-gray-500">* The field cannot be edited</small>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="w-1/5 h-10 p-2 m-2 text-sm text-white rounded-lg border-none cursor-pointer transition-all duration-75 hover:filter hover:brightness-90 bg-[#5271ff]"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div >
            </div >
        </>
    );
}

export default ManagementUserAdmin;
