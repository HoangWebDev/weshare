/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import { Link } from "react-router-dom";
import Image from "~/components/Image";
import images from "~/assets/images";
import { PropChildren } from "~/types/Interface/childrenInterface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faArrowRightToBracket, faBorderAll, faChevronDown, faChevronUp, faListCheck, faTableCellsLarge, faTableList, faUsers, faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { faCalendar, faNewspaper } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { PersonIcon } from "~/components/Icons";

function Sidebar({ className }: PropChildren) {
    const [menu, setMenu] = useState('dashboard');
    const [menuChild, setMenuChild] = useState('login');
    const [show, setShow] = useState<{ [key: string]: boolean }>({
        authen: false,
        task: false
    });

    const handleClass = (id: string) => {
        setMenu(id);
        setShow((prev) => ({ ...prev, [id]: !prev[id] }));
    }

    const handleClassChild = (id: string) => {
        setMenuChild(id);
    }

    const getClass = (id: string) => {
        return `relative text-base flex items-center gap-2.5 rounded-sm px-4 py-2 text-gray-300 duration-300 ease-in-out hover:bg-[#333a48] ${menu === id && 'bg-[#333a48]'}`
    }

    const getClassChild = (id: string) => {
        return `relative text-base flex items-center gap-2.5 rounded-sm px-4 py-2 text-[#333a48] duration-300 ease-in-out hover:text-white ${menuChild === id && 'text-white'}`
    }

    return (
        <div className={className}>
            <header className="sticky top-0 z-50 bg-[#1c2434] p-6">
                <Link to="/" className="items-center gap-x-2.5 flex">
                    <Image
                        fallbackSrc={images.logo}
                        alt="Logo"
                        className="select-none size-8 rounded-md object-cover"
                    />
                    <h2 className="text-2xl font-semibold text-white">WeShare</h2>
                </Link>
            </header>
            <aside className="mt-5 p-4">
                <div>
                    <h3 className="mb-4 ml-4 text-base text-gray-400 font-semibold">MENU</h3>
                    <ul className="flex flex-col gap-1.5 mb-6">
                        <li>
                            <Link to="/admin/dashboard" className={getClass('dashboard')} onClick={() => handleClass('dashboard')}>
                                <FontAwesomeIcon icon={faTableCellsLarge} className="size-5" />
                                <span className="font-medium">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/profile" className={getClass('profile')} onClick={() => handleClass('profile')}>
                                <FontAwesomeIcon icon={faUserSecret} className="size-5" />
                                <span className="font-medium">Profile</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className={getClass('task')} onClick={() => handleClass('task')}>
                                <FontAwesomeIcon icon={faListCheck} className="size-5" />
                                <span className="font-medium">Task</span>
                                <FontAwesomeIcon icon={show.task ? faChevronUp : faChevronDown} className="absolute right-4 size-5" />
                            </Link>
                            <div className={`translate transform overflow-hidden ${show.task ? "false" : "hidden"}`}>
                                <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                    <li>
                                        <Link to="/admin/user-management" className={getClassChild('user')} onClick={() => handleClassChild('user')}>
                                            <FontAwesomeIcon icon={faUsers} className="size-5" />
                                            <span className="font-medium">User</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/feed-management" className={getClassChild('feed')} onClick={() => handleClassChild('feed')}>
                                            <FontAwesomeIcon icon={faNewspaper} className="size-5" />
                                            <span className="font-medium">Feed</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="mb-4 ml-4 text-base text-gray-400 font-semibold">OTHERS</h3>
                    <ul className="flex flex-col gap-1.5 mb-6">
                        <li>
                            <Link to="#" className={getClass('authen')} onClick={() => handleClass('authen')}>
                                <FontAwesomeIcon icon={faArrowRightFromBracket} className="size-5" />
                                <span className="font-medium">Authentication</span>
                                <FontAwesomeIcon icon={show.authen ? faChevronUp : faChevronDown} className="absolute right-4 size-5" />
                            </Link>
                            <div className={`translate transform overflow-hidden ${show.authen ? "false" : "hidden"}`}>
                                <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                    <li>
                                        <Link to="/admin/login" className={getClassChild('login')} onClick={() => handleClassChild('login')}>
                                            <FontAwesomeIcon icon={faArrowRightToBracket} className="size-5" />
                                            <span className="font-medium">Login</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </aside>
        </div >
    );
}

export default Sidebar;