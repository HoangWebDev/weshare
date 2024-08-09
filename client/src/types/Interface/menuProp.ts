import { ReactElement } from "react"
import { PropChildren } from '~/types/Interface/childrenInterface';

interface MenuItemData {
    icon: JSX.Element;
    name: string;
    to?: string;
    onClick?: () => void
}

export interface MenuProps extends PropChildren {
    children: ReactElement;
    hideOnClick?: boolean;
    onClick?: () => void;
    items: MenuItemData[];
}

export interface MenuItemProps extends PropChildren {
    role?: string | null;
    className?: string;
    data: MenuItemData;
    onClick?: () => void;
}