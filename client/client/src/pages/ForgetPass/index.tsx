/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import * as userService from '~/services/User/userService';
import { useNavigate } from 'react-router-dom';

const ForgetPass = () => {
    const [user, setUser] = useState<{ email: string; oldPassword: string; newPassword: string }>({
        email: '',
        oldPassword: '',
        newPassword: '',
    });

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const updateUserMutation = useMutation({
        mutationFn: async ({ email, oldPassword, newPassword }: { email: string, oldPassword: string; newPassword: string }) =>
            userService.changePassword(email, oldPassword, newPassword),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user/getUser'] });
            navigate('/login');
        },
        onError: (error) => {
            console.error('Error updating user:', error);
        },
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateUserMutation.mutate({ email: user.email, oldPassword: user.oldPassword, newPassword: user.newPassword });
    };

    return (
        <>
            <div
                className={
                    'w-6/12 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-2 bg-white rounded-lg z-30 overflow-y-hidden shadow-sm shadow-slate-500'
                }
            >
                <div className="flex items-center gap-x-2 justify-between pt-2 px-2">
                    <h3 className="text-md font-bold text-black">Change Password</h3>
                </div>
                <form className="w-full p-2 flex flex-col" onSubmit={handleSubmit}>
                    <div className="text-left text-black">
                        <label htmlFor="oldPassword" className="inline-block my-3 text-sm">
                            Email:
                        </label>
                        <br />
                        <input
                            name="email"
                            type="email"
                            value={user.email}
                            spellCheck={false}
                            className="w-full focus:border-[#5271ff] hover:border-[#5271ff] rounded-md outline-none border-[1px] p-1 placeholder:text-xs placeholder:pl-1"
                            placeholder="Email"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="text-left text-black">
                        <label htmlFor="oldPassword" className="inline-block my-3 text-sm">
                            Old Password:
                        </label>
                        <br />
                        <input
                            name="oldPassword"
                            type="password"
                            value={user.oldPassword}
                            spellCheck={false}
                            className="w-full focus:border-[#5271ff] hover:border-[#5271ff] rounded-md outline-none border-[1px] p-1 placeholder:text-xs placeholder:pl-1"
                            placeholder="Old Password"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="text-left text-black">
                        <label htmlFor="newPassword" className="inline-block my-3 text-sm">
                            New Password:
                        </label>
                        <br />
                        <input
                            name="newPassword"
                            type="password"
                            spellCheck={false}
                            value={user.newPassword}
                            className="w-full focus:border-[#5271ff] hover:border-[#5271ff] rounded-md outline-none border-[1px] p-1 placeholder:text-xs placeholder:pl-1"
                            placeholder="New Password"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="w-48 p-2 m-2 text-sm text-white rounded-lg border-none cursor-pointer transition-all duration-75 hover:filter hover:brightness-90 bg-[#5271ff]"
                        >
                            Change Pass
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ForgetPass;
