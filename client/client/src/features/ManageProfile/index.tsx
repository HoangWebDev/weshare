/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import * as userService from '~/services/User/userService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import UserModel from '~/models/User';

interface ManageProfileProps {
    openManage: boolean;
    toggleManage: () => void;
    idUser: number;
}
function ManageProfile({ openManage, toggleManage, idUser }: ManageProfileProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [user, setUser] = useState<UserModel>({
        id_user: 0,
        full_name: '',
        email: '',
        phone: 0,
    } as UserModel);
    console.log('User Profile:', idUser);

    const queryClient = new QueryClient();

    const { isLoading, data, refetch } = useQuery({
        queryKey: ['user/getUser', idUser],
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
            toggleManage();
        },
        onError: (error) => {
            console.error('Error updating user:', error);
        },
    });

    useEffect(() => {
        if (data) {
            setUser(data);
        }
    }, [data]);

    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const image = e.target.files && e.target.files[0];
        if (image) {
            //Sử dụng hàm URL.createObjectURL để tạo ra đường dẫn URL để hiển thị hình ảnh
            const previewImage = Object.assign(image, { preview: URL.createObjectURL(image) });
            setSelectedFile(previewImage);
        }
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
        formData.append('full_name', user.full_name || '');
        formData.append('email', user.email || '');
        formData.append('phone', user.phone?.toString() || '');
        formData.append('birthday', user.birthday?.toString() || '');
        formData.append('gender', user.gender?.toString() || '');
        if (selectedFile) {
            formData.append('image', selectedFile);
        }
        updateUserMutation.mutate(formData);
    };

    return (
        <>
            <div
                className={
                    openManage
                        ? 'w-6/12 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-2 bg-white rounded-lg z-30 overflow-y-hidden'
                        : 'hidden'
                }
            >
                <div className="flex items-center gap-x-2 justify-between pt-2 px-2">
                    <h3 className="text-md font-bold text-black">Update Profile</h3>
                    <FontAwesomeIcon
                        icon={faClose}
                        className="text-sm text-gray-500 cursor-pointer"
                        onClick={toggleManage}
                    />
                </div>
                <form className="w-full p-2 flex flex-col" onSubmit={handleSubmit}>
                    <div className="text-left text-black">
                        <label htmlFor="text" className="inline-block my-3 text-sm">
                            Fullname:
                        </label>
                        <br />
                        <input
                            name="full_name"
                            value={user.full_name}
                            spellCheck={false}
                            className="w-full focus:border-[#5271ff] hover:border-[#5271ff] rounded-md outline-none border-[1px] p-1 placeholder:text-xs placeholder:pl-1"
                            placeholder="Fullname"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="text-left text-black">
                        <label htmlFor="text" className="inline-block my-3 text-sm">
                            Email:
                        </label>
                        <br />
                        <input
                            name="email"
                            value={user.email}
                            spellCheck={false}
                            className="w-full focus:border-[#5271ff] hover:border-[#5271ff] rounded-md outline-none border-[1px] p-1 placeholder:text-xs placeholder:pl-1"
                            placeholder="Email"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="text-left text-black">
                        <label htmlFor="text" className="inline-block my-3 text-sm">
                            Phone:
                        </label>
                        <br />
                        <input
                            name="phone"
                            value={user.phone}
                            spellCheck={false}
                            className="w-full focus:border-[#5271ff] hover:border-[#5271ff] rounded-md outline-none border-[1px] p-1 placeholder:text-xs placeholder:pl-1"
                            placeholder="Phone"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="text-left text-black">
                        <label htmlFor="text" className="inline-block my-3 text-sm">
                            Birthday:
                        </label>
                        <br />
                        <input
                            name="birthday"
                            type="date"
                            value={
                                user.birthday
                                    ? user.birthday instanceof Date
                                        ? user.birthday.toISOString().split('T')[0]
                                        : user.birthday
                                    : ''
                            }
                            spellCheck={false}
                            className="w-full focus:border-[#5271ff] hover:border-[#5271ff] rounded-md outline-none border-[1px] p-1 placeholder:text-xs placeholder:pl-1"
                            placeholder="Birthday"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="text-left text-black">
                        <label htmlFor="text" className="inline-block my-3 text-sm">
                            Gender:
                        </label>
                        <br />
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
                                />
                            </div>
                        </div>
                    </div>
                    <div className="text-left text-black">
                        <label className="inline-block my-3 text-sm" htmlFor="file_input">
                            Upload file
                        </label>
                        <div className="flex flex-row items-center">
                            <input type="file" id="custom-input" onChange={handleChangeFile} hidden />
                            <label
                                htmlFor="custom-input"
                                className="block text-sm text-slate-500 mr-4 py-2 px-4 rounded-md border-0 font-semibold bg-pink-50 hover:bg-slate-100 cursor-pointer"
                            >
                                Choose file
                            </label>
                            {selectedFile ? (
                                <label className="text-sm text-slate-500">
                                    <img className="size-20" src={URL.createObjectURL(selectedFile)} alt="" />
                                </label>
                            ) : (
                                <label className="text-sm text-slate-500">No file chosen</label>
                            )}
                        </div>
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="w-48 p-2 m-2 text-sm text-white rounded-lg border-none cursor-pointer transition-all duration-75 hover:filter hover:brightness-90 bg-[#5271ff]"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            <div
                className={openManage ? 'fixed inset-0 bg-black opacity-50 z-20 overflow-y-hidden' : 'hidden'}
                onClick={toggleManage}
            ></div>
        </>
    );
}

export default ManageProfile;
