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

    const GetProfile = async () => {
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
            GetProfile();
    }, [cookies])

    if (!data) return <div>Loading</div>
    return (
        <>
            <div className="w-1/5 h-16 mb-3">
                <div className="relative w-full h-16">
                    <Image alt={""} src={data?.image || ""} className="object-contain" fill />
                </div>
            </div>
            <div>
                <h2>UserName: {data?.username}</h2>
                <h2>Email: {data?.email}</h2>
                <h2>Mobile: {data?.mobile}</h2>
                <h2>FirsName: {data?.firstname || ""}</h2>
                <h2>LastName: {data?.lastname || ""}</h2>
                <h2>Gender: {data?.gender || ""}</h2>
                <h2>Age: {data?.age || ""}</h2>
            </div>
        </>
    )
}


profile.getLayout = (page) => <MainLayout>{page}</MainLayout>
export default profile;