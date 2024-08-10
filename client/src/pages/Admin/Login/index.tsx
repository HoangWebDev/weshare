/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as loginService from '~/services/Login/loginService';

function LoginAdmin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await loginService.login(username, password);
            const { token, role } = result;
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            navigate('/feed'); // Điều hướng đến trang feed sau khi đăng nhập thành công
        } catch (error) {
            setError('Invalid username or password');
        }
    };

    return (
        <>
            <div className='mb-10 max-w-screen-2xl p-4 md:p-6 2xl:p-10'>
                <div className='mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                    <h2 className="text-2xl font-semibold text-black">Login</h2>
                    <nav>
                        <ol className="flex items-center gap-2">
                            <li><a className="font-medium" href="/">Dashboard /</a></li>
                            <li className="font-medium text-main">Login</li>
                        </ol>
                    </nav>
                </div>
                <div className="flex flex-col gap-5 md:gap-7 2xl:gap-10">
                    <form className="rounded-sm border border-stroke bg-white py-4 shadow" onSubmit={handleSubmit}>
                        <div className='grid grid-cols-1 sm:grid-cols-2'>
                            <div className='p-6 flex flex-col gap-4 border-r-[1px]'>
                                <div className="text-left text-black">
                                    <label htmlFor="text" className="mb-3 block text-base font-medium text-black">
                                        Username:
                                    </label>
                                    <input
                                        name="username"
                                        value={username}
                                        spellCheck={false}
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary"
                                        placeholder="Username"
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="text-left text-black">
                                    <label htmlFor="pass" className="mb-3 block text-base font-medium text-black">
                                        Password:
                                    </label>
                                    <input
                                        name="password"
                                        value={password}
                                        spellCheck={false}
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary"
                                        placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                {error && <small className="text-red-500">{error}</small>}
                                <div className="text-center">
                                    <button
                                        type="submit"
                                        className="w-80 p-2 m-2 text-sm text-white rounded-lg border-none cursor-pointer transition-all duration-75 hover:filter hover:brightness-90 bg-[#5271ff]"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default LoginAdmin;