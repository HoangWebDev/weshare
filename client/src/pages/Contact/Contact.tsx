import { useContext } from 'react';
import { faSearch, faFilter, faEllipsisVertical, faCake } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ResponsiveContext } from '~/features/Provider/ResponsiveProvider';
import Image from '~/components/Image';

function Contact() {
    const context = useContext(ResponsiveContext);

    return (
        <>
            <section
                className={
                    context.responsive
                        ? 'hidden'
                        : 'block w-60 fixed top-[60px] right-5 max-h-screen overflow-y-auto scrollbar'
                }
            >
                <div className="bg-white rounded-[5px] p-[15px] mb-[10px]">
                    <div className="">
                        <h2 className="text-left text-base font-bold">Message</h2>
                        <div className="relative w-full p-[10px] rounded-[10px] flex items-center gap-x-2">
                            <FontAwesomeIcon
                                icon={faSearch}
                                className="absolute left-4 top-[18px] text-gray-500 z-10 cursor-pointer transition-all duration-300"
                            />
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full py-1 pr-1 pl-7 rounded-md outline-none bg-neutral-100 focus:shadow-sm focus:shadow-blue-700"
                            />
                            <FontAwesomeIcon
                                icon={faFilter}
                                className="absolute right-4 top-[18px] text-gray-500 z-10 cursor-pointer transition-all duration-300"
                            />
                        </div>
                    </div>
                    <div className="">
                        <div className="relative flex items-center gap-x-2">
                            <a
                                href="/"
                                className="relative text-left text-xs font-semibold mb-2 after:content-normal after:absolute after:w-full after:h-[2px] after:bg-black after:bottom-[-3px] after:left-0"
                            >
                                Primary
                            </a>
                            <a href="/" className="text-left text-xs font-semibold mb-2">
                                General
                            </a>
                            <hr className="absolute bottom-1 w-full" />
                        </div>
                        <div className="">
                            <ul>
                                <li className="relative flex items-center gap-x-2 my-2 mr-2">
                                    <Image className="size-10 rounded-full object-cover" />
                                    <span className="absolute left-7 bottom-0 w-3 h-3 bg-green-500 rounded-full border-2 border-solid border-white"></span>
                                    <h3 className="text-sm font-semibold">Name</h3>
                                </li>
                            </ul>
                            <div className="">
                                <p className="text-left text-xs font-semibold text-gray-400">View All</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-[5px] p-[15px] mb-2">
                    <div className="">
                        <div className="mb-2 flex items-center gap-x-2 justify-between">
                            <h2 className="text-left text-base font-bold">Events</h2>
                            <FontAwesomeIcon icon={faEllipsisVertical} className="text-sm text-gray-500" />
                        </div>
                    </div>
                    <hr />
                    <div className="mt-2">
                        <ul>
                            <li className="flex items-center gap-x-2">
                                <FontAwesomeIcon icon={faCake} className="text-xs text-gray-500" />
                                <p className="text-left text-xs font-semibold text-gray-500">Sinh Nhật Tí Trần</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Contact;
