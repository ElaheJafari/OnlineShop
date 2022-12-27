import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import MainLayout from "../src/layouts/MainLayout";
import appAxios from '../src/middelwares/appAxios';
import { User } from '../src/models/user';

import type { NextPageWithLayout } from './_app';


const profile: NextPageWithLayout = () => {

    const [cookies, setCookies] = useCookies(["username"]);
    const [data, setData] = useState<User | undefined>();
    const [loading, setLoading] = useState(false);

    const products = async () => {
        try {
            const responce = await appAxios.get<{ user: User }>("/user/profile", {
                headers: {
                    authorization: "Bearer " + cookies.username,
                },
            });
            setData(responce.data.user)

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (cookies.username)
            products();
    }, [cookies])

    if (!data) return <div>Loading</div>
    return (
        <>
            <div className="w-1/2 h-16">
                <div className="relative w-1/2 h-16">
                    <Image alt={""} src={data?.image || ""} className="object-contain" fill />
                </div>
            </div>
            <div>
                <h2>Email:{data?.email}</h2>
                <h2>User Name:{data?.username}</h2>
                <h2>Mobile:{data?.mobile}</h2>
            </div>
        </>
    )
}


profile.getLayout = (page) => <MainLayout>{page}</MainLayout>
export default profile;