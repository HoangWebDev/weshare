import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as loginService from '~/services/Login/loginService';
import { CloseSearchIcon } from '~/components/Icons';

const Login = () => {
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
        <div className="w-full h-screen flex items-center justify-center">
            <div className="max-w-[500px] w-72 bg-transparent p-3 rounded-2xl shadow-sm shadow-slate-500 relative">
                <Link to="/register" className="absolute top-2 right-2">
                    <CloseSearchIcon className="text-xs duration-300 hover:text-[#5271ff]" />
                </Link>
                <h1 className="text-center text-xl font-bold mt-2 mb-4">Login</h1>
                <form onSubmit={handleSubmit}>
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
                    <div className="flex justify-between">
                        <Link to={'/forgetpass'}>
                            <p className="text-xs text-right text-[#5271ff]">Forgot password?</p>
                        </Link>
                        <Link to={'/register'}>
                            <p className="text-xs text-right text-[#5271ff]">Create Account</p>
                        </Link>
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="w-48 p-2 m-2 text-sm text-white rounded-lg border-none cursor-pointer transition-all duration-75 hover:filter hover:brightness-90 bg-[#5271ff]"
                        >
                            Log in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
