/* eslint-disable @typescript-eslint/no-unused-vars */
import { faBell, faChevronDown, faCompass, faMessage, faPenToSquare, faPerson, faRightFromBracket, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '~/components/Button/Button';
import { PersonIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Menu from '~/components/Popper/Menu';
import { useProfile } from '~/hooks';

const Header = () => {

    const userProfile = useProfile()

    const LIST_ITEM =
        [

            {
                icon: <PersonIcon className='size-4' />,
                name: 'Profile',
                onClick: () => {
                    console.log('Update Profile');
                },
            },
            {
                icon: <FontAwesomeIcon icon={faPenToSquare} className='size-4' />,
                name: 'Update Profile',
                onClick: () => {
                    console.log('Update Profile');
                },
            },
            {
                icon: <FontAwesomeIcon icon={faCompass} className='size-4' />,
                name: 'Change Password',
                onClick: () => {
                    console.log('Change Password');
                },
            }
        ]

    return (
        <header className='sticky top-0 z-50 bg-white w-full drop-shadow-md'>
            <div className='flex justify-between items-center px-4 py-4 md:px-6 2xl:px-11'>
                <form action="" className='relative'>
                    <Button className='absolute left-0 top-0.5'>
                        <FontAwesomeIcon icon={faSearch} className='size-5 text-gray-400' />
                    </Button>
                    <input type='search' placeholder='Search ... ' className='pl-9 focus:outline-none w-full xl:w-96' />
                </form>
                <div className="flex items-center gap-3 2xsm:gap-7">
                    <ul className='flex items-center gap-2 2xsm:gap-4'>
                        <li>
                            <Link to={'#'} className='p-[0.5rem] bg-[#eff4fb] rounded-full border-[0.5px]'>
                                <FontAwesomeIcon icon={faBell} className='size-5 text-gray-400' />
                            </Link>
                        </li>
                        <li><Link to={'#'} className='p-[0.5rem] bg-[#eff4fb] rounded-full border-[0.5px]'>
                            <FontAwesomeIcon icon={faMessage} className='size-5 text-gray-400' />
                        </Link></li>
                    </ul>
                    <Menu items={LIST_ITEM} className='flex flex-col gap-2 bg-white text-sm text-neutral-500 font-semibold rounded border-[0.5px] px-4 p-2 mt-2 md:px-6'>
                        <div className='flex items-center gap-4 select-none cursor-pointer'>
                            <span className='text-right lg:block'>
                                <span className='block text-sm font-medium text-black'>WeShare</span>
                                <span className='block text-xs'>Admin</span>
                            </span>
                            <span className='h-12 w-12'>
                                <img alt='Avatar' src={userProfile.picture_url} className='rounded-full' />
                            </span>
                            <FontAwesomeIcon icon={faChevronDown} className='size-3 text-gray-400' />
                        </div>
                    </Menu>
                </div>
            </div>
        </header>
    )
};

export default Header;