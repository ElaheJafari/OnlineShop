import React, { FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const NavLink: FC<{ href: string, exact?: boolean, children: React.ReactElement | string, className: string, ActiveClassName: string }> = ({
    href, exact, children, className, ActiveClassName
}) => {
    const { pathname } = useRouter();
    const isActive = exact ? pathname == href : pathname.startsWith(href);

    return (
        <Link href={href} className={className + ` ${isActive ? ActiveClassName : ""}`}>{children}</Link>
    )
}

export default NavLink;