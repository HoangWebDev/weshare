/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, createContext, useReducer } from 'react';
import { initState, reducer } from '~/features/Reducer/reducers';
import { styleMenu } from '~/features/Reducer/actions';
import { PropChildren } from '~/types/Interface/childrenInterface';

export const ResponsiveContext = createContext<{
    responsive: boolean;
    openNav: boolean;
    toggleNav: () => void;
    logout: () => void
    getToken: () => { token?: string | null; role?: string | null };
}>({
    responsive: false,
    openNav: false,
    toggleNav: () => { },
    logout: () => { },
    getToken: () => ({ token: null, role: null }),
});

function ResponsiveProvider({ children }: PropChildren) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [state, dispatch] = useReducer(reducer, initState);
    const [responsive, setResponsive] = useState(window.innerWidth < 768);
    const [openNav, setOpnNav] = useState(false);

    const toggleNav = () => {
        setOpnNav(!openNav);
        dispatch(styleMenu());
    };

    const getToken = () => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (token && role) {
            return { token, role };
        } else {
            return {};
        }
    };

    const logout = () => {
        localStorage.clear();
        window.location.reload();
    };

    const responsiveMain = () => {
        const newNav = window.innerWidth < 768;
        setResponsive(newNav);
    };

    useEffect(() => {
        window.addEventListener('resize', responsiveMain);
        return () => window.removeEventListener('resize', responsiveMain);
    }, [responsiveMain]);

    const value = {
        responsive,
        openNav,
        toggleNav,
        logout,
        getToken
    };

    return <ResponsiveContext.Provider value={value}>{children}</ResponsiveContext.Provider>;
}

export default ResponsiveProvider;
