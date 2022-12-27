import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Router from 'next/router';

import type { ReactElement } from 'react'
import type { NextPage } from 'next';
import useUser from '../hooks/useUser';

interface AuthLayoutProps {
    children: ReactElement,
}

const AuthLayout: NextPage<AuthLayoutProps> = ({ children }) => {

    const { data, error } = useUser();

    useEffect(() => {
        if (data && !error)
            Router.push('/')
    }, [data , error])

    return (
        <>
            {children}
        </>
    )
}

export default AuthLayout;