/* eslint-disable jsx-a11y/alt-text */
import { useState, useContext } from 'react';
import { faFolder, faLaptopCode } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CalendarIcon, HomeIcon, TvIcon, UserIcon, ImageIcon, ShopIcon, FolderIcon } from '~/components/Icons';
import { ResponsiveContext } from '~/features/Provider/ResponsiveProvider';
import { useProfile } from '~/hooks';

function Nav() {
    const context = useContext(ResponsiveContext);
    const [menu, setMenu] = useState('feed');

    const userProfile = useProfile();

    const handleMenu = (id: string) => {
        setMenu(id);
    };

    const getClass = (id: string) => {
        return `flex items-center gap-x-2 p-2 rounded w-full ${menu === id ? 'bg-main text-gray-50' : 'text-slate-400'
            }`;
    };

    return (
        <>
            <section className="w-60 fixed top-[60px] left-5 max-h-screen overflow-y-auto scrollbar hidden md:block">
                <div className="bg-white p-[15px] rounded-[5px] mb-[10px]">
                    <Link
                        to={`/@${userProfile.username}/${userProfile.id_user}`}
                        className="bg-[#f5f5f5dd] rounded-[5px] p-[5px]"
                    >
                        <div className="flex items-center gap-x-2 justify-center">
                            <img src={userProfile?.picture_url} className="rounded size-12 object-cover" />
                            <div>
                                <h2 className="font-bold">{userProfile.full_name}</h2>
                                <span className="text-gray-400 text-xs">{userProfile.email}</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-x-2 mt-[15px]">
                            <div>
                                <p className="text-sm font-bold">2.3k</p>
                                <span className="text-gray-400 text-xs">Followers</span>
                            </div>
                            <div>
                                <p className="text-sm font-bold">1.2k</p>
                                <span className="text-gray-400 text-xs">Following</span>
                            </div>
                            <div>
                                <p className="text-sm font-bold">1.2k</p>
                                <span className="text-gray-400 text-xs">Posts</span>
                            </div>
                        </div>
                    </Link>
                </div>
                <ul className="bg-white p-4 rounded-[5px] mb-2">
                    <li>
                        <Link to="/feed" className={getClass('feed')} onClick={() => handleMenu('feed')}>
                            <HomeIcon />
                            <p className="text-sm">Feed</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/friend" className={getClass('friend')} onClick={() => handleMenu('friend')}>
                            <UserIcon />
                            <p className="text-sm">Friend</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/watch" className={getClass('watch')} onClick={() => handleMenu('watch')}>
                            <TvIcon />
                            <p className="text-sm">Watch</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/event" className={getClass('event')} onClick={() => handleMenu('event')}>
                            <CalendarIcon />
                            <p className="text-sm">Event</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/photos" className={getClass('photos')} onClick={() => handleMenu('photos')}>
                            <ImageIcon />
                            <p className="text-sm">Photos</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/shop" className={getClass('shop')} onClick={() => handleMenu('shop')}>
                            <ShopIcon />
                            <p className="text-sm">Shop</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/files" className={getClass('files')} onClick={() => handleMenu('files')}>
                            <FolderIcon />
                            <p className="text-sm">Files</p>
                        </Link>
                    </li>
                    <hr />
                    <h2 className="text-left font-semibold p-2 text-gray-400">Pages You Like</h2>
                    <ul>
                        <li>
                            <a className="flex items-center gap-x-2 p-2 rounded text-slate-400 w-full" href="./">
                                <FontAwesomeIcon className="p-1 rounded text-slate-50 bg-main" icon={faLaptopCode} />
                                <p className="text-gray-950 font-semibold">Frontend Web</p>
                            </a>
                        </li>
                    </ul>
                </ul>
            </section>

            {/* Responsive */}

            <section
                className={context.responsive ? 'w-screen fixed top-[60px] max-h-screen scrollbar z-50' : 'hidden'}
            >
                <ul
                    className="block w-full bg-white rounded-[5px] p-2"
                    style={{ display: context.openNav ? 'block' : 'none' }}
                >
                    <li>
                        <Link
                            to="/feed"
                            className={getClass('feed')}
                            onClick={() => {
                                handleMenu('feed');
                                context.toggleNav();
                            }}
                        >
                            <HomeIcon />
                            <p className="text-sm">Feed</p>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/friend"
                            className={getClass('friend')}
                            onClick={() => {
                                handleMenu('friend');
                                context.toggleNav();
                            }}
                        >
                            <UserIcon />
                            <p className="text-sm">Friend</p>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/watch"
                            className={getClass('watch')}
                            onClick={() => {
                                handleMenu('watch');
                                context.toggleNav();
                            }}
                        >
                            <TvIcon />
                            <p className="text-sm">Watch</p>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/event"
                            className={getClass('event')}
                            onClick={() => {
                                handleMenu('event');
                                context.toggleNav();
                            }}
                        >
                            <CalendarIcon />
                            <p className="text-sm">Event</p>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/photos"
                            className={getClass('photos')}
                            onClick={() => {
                                handleMenu('photos');
                                context.toggleNav();
                            }}
                        >
                            <ImageIcon />
                            <p className="text-sm">Photos</p>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/shop"
                            className={getClass('shop')}
                            onClick={() => {
                                handleMenu('shop');
                                context.toggleNav();
                            }}
                        >
                            <ShopIcon />
                            <p className="text-sm">Shop</p>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/files"
                            className={getClass('files')}
                            onClick={() => {
                                handleMenu('files');
                                context.toggleNav();
                            }}
                        >
                            <FontAwesomeIcon className="text-sm p-1 rounded size-4" icon={faFolder} />
                            <p className="text-sm">Files</p>
                        </Link>
                    </li>
                    <hr />
                    <h2 className="text-left font-semibold p-2 text-gray-400">Pages You Like</h2>
                    <ul>
                        <li>
                            <a className="flex items-center gap-x-2 p-2 rounded text-slate-400 w-full" href="./">
                                <FontAwesomeIcon className="p-1 rounded text-slate-50 bg-main" icon={faLaptopCode} />
                                <p className="text-gray-950 font-semibold">Frontend Web</p>
                            </a>
                        </li>
                    </ul>
                </ul>
                <div className="absolute top-0 left-0 right-0 -bottom-full pointer-events-none"></div>
            </section>
        </>
    );
}

export default Nav;
