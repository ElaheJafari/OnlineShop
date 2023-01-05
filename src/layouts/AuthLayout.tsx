import React, { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import useUser from '../hooks/useUser';

import type { ReactElement } from 'react';
import type { NextPage } from 'next';

interface AuthLayoutProps {
    children: ReactElement,
}

const AuthLayout: NextPage<AuthLayoutProps> = ({ children }) => {

    const { query } = useRouter();
    const { data, error } = useUser();

    useEffect(() => {
        if (data && !error && !query.mode) 
            Router.push('/')
    }, [data, error, query])

    return (
        <>
            {children}
        </>
    )
}

export default AuthLayout;