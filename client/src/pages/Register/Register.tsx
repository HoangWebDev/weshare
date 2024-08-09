import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as registerService from '~/services/Register/registerService';
import { CloseSearchIcon } from '~/components/Icons';

const Register = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await registerService.register(fullName, email, username, password);
            console.log(result);

            navigate('/login'); // Điều hướng đến trang feed sau khi đăng nhập thành công
        } catch (error) {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="max-w-[500px] w-72 bg-transparent p-3 rounded-2xl shadow-sm shadow-slate-500 relative">
                <a href="/register" className="absolute top-2 right-2">
                    <CloseSearchIcon className="text-xs duration-300 hover:text-[#5271ff]" />
                </a>
                <h1 className="text-center text-xl font-bold mt-2 mb-4">Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="text-left text-black">
                        <label htmlFor="text" className="inline-block my-3 text-sm">
                            FullName:
                        </label>
                        <br />
                        <div className="">
                            <input
                                value={fullName}
                                spellCheck={false}
                                className="w-full focus:border-[#5271ff] hover:border-[#5271ff] rounded-md outline-none border-[1px] p-1 mb-2 placeholder:text-xs placeholder:pl-1"
                                placeholder="FullName"
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="text-left text-black">
                        <label htmlFor="text" className="inline-block my-3 text-sm">
                            Email:
                        </label>
                        <br />
                        <div className="">
                            <input
                                value={email}
                                spellCheck={false}
                                className="w-full focus:border-[#5271ff] hover:border-[#5271ff] rounded-md outline-none border-[1px] p-1 mb-2 placeholder:text-xs placeholder:pl-1"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="text-left text-black">
                        <label htmlFor="text" className="inline-block my-3 text-sm">
                            Username:
                        </label>
                        <br />
                        <div className="">
                            <input
                                value={username}
                                spellCheck={false}
                                className="w-full focus:border-[#5271ff] hover:border-[#5271ff] rounded-md outline-none border-[1px] p-1 mb-2 placeholder:text-xs placeholder:pl-1"
                                placeholder="Username"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="text-left text-black">
                        <label htmlFor="pass" className="inline-block my-3 text-sm">
                            Password:
                        </label>
                        <br />
                        <div className="">
                            <input
                                value={password}
                                spellCheck={false}
                                className="w-full focus:border-[#5271ff] hover:border-[#5271ff] rounded-md outline-none border-[1px] p-1 mb-2 placeholder:text-xs placeholder:pl-1"
                                placeholder="Password"
                                type="password"
                                autoComplete="on"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    {error && <small className="text-red-500">{error}</small>}
                    <Link to={'/login'}>
                        <p className="text-xs text-right text-[#5271ff]">Log in</p>
                    </Link>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="w-48 p-2 m-2 text-sm text-white rounded-lg border-none cursor-pointer transition-all duration-75 hover:filter hover:brightness-90 bg-[#5271ff]"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
