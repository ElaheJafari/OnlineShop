import React from 'react';
import Link from 'next/link';

import type { ReactElement } from 'react';
import type { NextPage } from 'next';
import NavLink from '../components/shared/NavLink';


interface SettingLayoutProps {
    children: ReactElement,
}

const SettingLayout: NextPage<SettingLayoutProps> = ({ children }) => {
    return (
        <div className='flex py-2'>
            <div className='sidebar border border-gray-400 p-2 w-56 h-[500px] leading-8 flex-shrink-0'>
                <NavLink href='/setting/changeprofile' ActiveClassName='text-red-300' className='block hover:text-blue-800'>Change Profile</NavLink>
                <NavLink href='/setting/changepassword' ActiveClassName='text-red-300' className='block hover:text-blue-800'>Change Password</NavLink>
                <NavLink href='/setting/uploadavatar' ActiveClassName='text-red-300' className='block hover:text-blue-800'>Upload Avatar</NavLink>
            </div>
            <div className='main-setting w-full ml-5'>
                {children}
            </div>
        </div>
    )
}


export default SettingLayout;