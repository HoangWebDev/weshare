/* eslint-disable @typescript-eslint/no-unused-vars */
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { Profiler, useState } from 'react';
import { MenuProps } from '~/types/Interface/menuProp';
import MenuItem from '~/components/Popper/Menu/MenuItem';
import Button from '~/components/Button/Button';
import Image from '~/components/Image';
import { useProfile } from '~/hooks';

function MenuComment({ children, items = [] }: MenuProps) {
    const [history, setHistory] = useState([{ data: items }]);

    const current = history[history.length - 1];

    const userProfile = useProfile();

    const renderItems = () => {
        return current.data.map((item, index) => {
            return <MenuItem key={index} data={item} onClick={item.onClick} />;
        });
    };

    return (
        <Tippy
            interactive
            placement="right-start"
            delay={[0, 100]}
            offset={[12, 8]}
            hideOnClick={false}
            render={(attrs) => (
                <div tabIndex={-1} {...attrs}>
                    <PopperWrapper>
                        <div className="max-w-[190px] flex flex-col gap-2 bg-neutral-500 text-sm text-white font-semibold rounded p-2">
                            {renderItems()}
                        </div>
                    </PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default MenuComment;
