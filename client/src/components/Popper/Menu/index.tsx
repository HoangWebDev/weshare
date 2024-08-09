import Tippy from '@tippyjs/react/headless';
import { useState, useContext } from 'react';
import { MenuProps } from '~/types/Interface/menuProp';
import MenuItem from './MenuItem';
import Button from '~/components/Button/Button';
import { useProfile } from '~/hooks';
import { ResponsiveContext } from '~/features/Provider/ResponsiveProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';

function Menu({ children, items = [], className }: MenuProps) {
    const [history, setHistory] = useState([{ data: items }]);
    const context = useContext(ResponsiveContext);
    const { token, role } = context.getToken();

    const current = history[history.length - 1];
    const userProfile = useProfile();

    const renderItems = () => {
        return current.data.map((item, index) => (
            <MenuItem
                role={role}
                key={index}
                data={item}
                onClick={item.onClick}
            />
        ));
    };

    const profileUser = () => {
        return (
            <Button to={`/@${userProfile.username}/${userProfile.id_user}`}>
                <div className="flex items-center gap-x-2 bg-zinc-300 p-2 rounded transition-colors hover:bg-gray-300">
                    <img
                        src={userProfile.picture_url}
                        className="size-8 rounded-full object-cover"
                        alt=""
                    />
                    <span className="text-black text-sm font-bold">{userProfile.full_name}</span>
                </div>
            </Button>
        );
    };

    return (
        <Tippy
            interactive
            placement="bottom-end"
            delay={[0, 700]}
            offset={[12, 8]}
            render={attrs => (
                <div tabIndex={-1} {...attrs} className="mr-3">
                    <PopperWrapper>
                        <div className={className}>
                            {role === "0" && profileUser()}
                            {renderItems()}
                            {role === "0" ?
                                <Button
                                    className="w-full"
                                    onClick={context.logout}
                                >
                                    <div className="flex items-center gap-x-2 px-2 py-1 transition-colors hover:bg-gray-300 hover:rounded">
                                        <span className="text-sm"><FontAwesomeIcon icon={faRightFromBracket} /></span>
                                        <span className="text-sm">Logout</span>
                                    </div>
                                </Button>
                                :
                                <Button
                                    className="w-full"
                                    onClick={context.logout}
                                >
                                    <div className="flex items-center gap-x-2 px-2 py-2 transition-colors hover:text-main">
                                        <span className="text-sm"><FontAwesomeIcon icon={faRightFromBracket} /></span>
                                        <span className="text-sm">Logout</span>
                                    </div>
                                </Button>
                            }
                        </div>
                    </PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
