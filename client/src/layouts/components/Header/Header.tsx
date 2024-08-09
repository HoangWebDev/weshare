/* eslint-disable @typescript-eslint/no-unused-vars */
import { useReducer, useContext, useEffect, useState } from 'react';
import { reducer, initState } from '~/features/Reducer/reducers';
import { search, styleSearch, styleMenu } from '~/features/Reducer/actions';
import { ResponsiveContext } from '~/features/Provider/ResponsiveProvider';
import Search from '~/features/Search/Search';
import Image from '~/components/Image';
import images from '~/assets/images';
import Menu from '~/components/Popper/Menu';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faGear, faRightFromBracket, faCompass } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass, faBars, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { BellIcon, BookMarkIcon, PersonIcon } from '~/components/Icons';
import { Link } from 'react-router-dom';
import { useProfile } from '~/hooks';
import ManageProfile from '~/features/ManageProfile';
import ChangePassword from '~/features/ChangePassword';

//Reducer
function Header() {
    const [openManage, setOpenManage] = useState(false);
    const [openChange, setOpenChange] = useState(false)
    //Dùng useReducer thay useState
    const [state, dispatch] = useReducer(reducer, initState);
    const context = useContext(ResponsiveContext);
    const userProfile = useProfile();

    const toggleManage = () => {
        setOpenManage(!openManage);
    };
    const toggleChange = () => {
        setOpenChange(!openChange);
    };

    const handleUpdate = (idUser: number) => {
        setOpenManage(true);
    };

    const handleChangePass = (idUser: number) => {
        setOpenChange(true)
    }

    //List items khi đăng nhập
    const LIST_ITEM = userProfile?.id_user
        ? [
            {
                icon: <FontAwesomeIcon icon={faPenToSquare} />,
                name: 'Update Profile',
                onClick: () => {
                    handleUpdate(userProfile.id_user || 0);
                },
            },
            {
                icon: <FontAwesomeIcon icon={faCompass} />,
                name: 'Change Password',
                onClick: () => {
                    handleChangePass(userProfile.id_user || 0);
                },
            }
        ]
        : [];

    return (
        <>
            <header className="grid grid-cols-3 gap-4 px-5 gap-x-5 fixed inset-x-0 top-0 mx-auto bg-white z-10">
                <Link to="/" className="col-span-1 items-center gap-x-2.5 py-[10px] hidden md:flex">
                    <Image
                        fallbackSrc={images.logo}
                        alt="Logo"
                        className="select-none size-8 rounded-md object-cover"
                    />
                    <h2 className="text-xl font-bold">WeShare</h2>
                </Link>
                {/* Search */}
                <Search />
                <div className="col-span-1 items-center justify-end gap-x-2.5 py-[10px]  hidden md:flex">
                    <BellIcon />
                    <BookMarkIcon className="text-gray-500 rounded-md p-1 bg-gray-300" />
                    {userProfile?.id_user && (
                        <Menu items={LIST_ITEM} className='max-w-[190px] flex flex-col gap-2 bg-[#e5e5e5] text-sm text-neutral-500 font-semibold rounded p-2'>
                            <div className="flex items-center gap-x-2 cursor-pointer select-none">
                                <img
                                    src={userProfile?.picture_url}
                                    alt="Avatar"
                                    className="size-7 rounded-md object-cover"
                                />
                                <h2 className="text-sm font-semibold">{userProfile.full_name}</h2>
                            </div>
                        </Menu>
                    )}
                </div>
                {/* Responsive */}
                <div className={context.responsive ? 'flex col-span-1 items-center gap-x-2.5 py-[10px]' : 'hidden'}>
                    <img src={images.logo} alt="Logo" className="select-none size-8 rounded-md object-cover" />
                    <div className="flex items-center md:hidden ">
                        <FontAwesomeIcon
                            onClick={() => {
                                dispatch(styleMenu());
                                context.toggleNav();
                            }}
                            icon={faBars}
                            className={
                                state.styleMenu
                                    ? 'bg-main text-gray-50 cursor-pointer rounded-md text-xl p-[6px] '
                                    : 'cursor-pointer text-gray-500 rounded-md text-xl p-[6px] bg-gray-300'
                            }
                        />
                    </div>
                    <FontAwesomeIcon
                        onClick={() => {
                            dispatch(search());
                            dispatch(styleSearch());
                        }}
                        icon={faMagnifyingGlass}
                        className={
                            state.styleSearch
                                ? 'bg-main text-gray-50 cursor-pointer rounded-md text-xl p-[6px]'
                                : 'cursor-pointer  text-gray-500 rounded-md text-xl p-[6px] bg-gray-300'
                        }
                    />
                </div>
                <div
                    className={
                        context.responsive ? 'flex col-span-1 items-center gap-x-2.5 relative py-[10px]' : 'hidden'
                    }
                >
                    <input
                        // ref={inputSearch}
                        type="text"
                        className={
                            state.search
                                ? 'block w-full py-1 pr-1 pl-2 rounded-md outline-none bg-neutral-100 focus:shadow-sm focus:shadow-blue-700'
                                : 'hidden'
                        }
                    />
                </div>
                <div
                    className={
                        context.responsive ? 'flex col-span-1 items-center justify-end gap-x-2.5 py-[10px]' : 'hidden'
                    }
                >
                    <BellIcon className="cursor-pointer text-gray-500 rounded-md text-xl p-[6px] bg-gray-300" />
                    <BookMarkIcon className="cursor-pointer text-gray-500 rounded-md text-xl p-[6px] bg-gray-300" />
                    <PersonIcon className="cursor-pointer text-gray-500 rounded-md text-xl p-[6px] bg-gray-300 " />

                    {/* <h2 className="account_text">Name</h2> */}
                </div>
            </header>
            {openManage && (
                <ManageProfile openManage={openManage} toggleManage={toggleManage} idUser={userProfile?.id_user || 0} />
            )}
            {openChange && (
                <ChangePassword openChange={openChange} toggleChange={toggleChange} idUser={userProfile?.id_user || 0} />
            )}
        </>
    );
}

export default Header;
