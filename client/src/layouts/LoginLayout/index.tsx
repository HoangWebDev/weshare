import React from 'react';
import { PropChildren } from '~/types/Interface/childrenInterface';

function LoginLayout({ children }: PropChildren) {
    return <div>{children}</div>;
}

export default LoginLayout;
