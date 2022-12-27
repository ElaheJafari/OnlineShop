import { Form, Formik } from 'formik';
import React from 'react';
import Button from '../../src/components/shared/Button';
import Inputs from '../../src/components/shared/Inputs';
import appAxios from '../../src/middelwares/appAxios';
import { useCookies } from 'react-cookie'
import Image from 'next/image';
import Router from 'next/router';
import { NextPageWithLayout } from '../_app';
import AuthLayout from '../../src/layouts/AuthLayout';

interface LoginFormValuesInterface {
    email: string,
    password: string,
}

const Signin:NextPageWithLayout = () => {

    const [cookies, setCookies] = useCookies(['username']);
    const handleSubmit = async (value: LoginFormValuesInterface) => {
        try {
            const response = await appAxios.post("/user/login",
                {
                    email: value.email,
                    password: value.password,
                })
            if (response.status === 200)
                setCookies("username", JSON.stringify(response.data.user.token), {
                    path: "/",
                    maxAge: 3600, // Expires after 1hr
                    sameSite: true,
                })
                Router.push('/')

        } catch (error) {

        }

    }
    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
            }}
            onSubmit={handleSubmit}
        >
            <Form className="bg-gray-50 w-1/2 h-80 border border-gray-400 rounded flex my-10 mx-auto">
                <div className="w-3/5">
                    <div className="relative w-full h-full">
                        <Image alt={""} src={"/assest/signUp.webp"} className="object-cover" fill />
                    </div>
                </div>
                <div className="p-4">
                    <Inputs name="email" placeholder='Email' type="email" />
                    <Inputs name="password" placeholder='Password' type="password" />
                    <Button text="Submit" type="submit" className="w-full my-6" />
                </div>
            </Form>
        </Formik>
    )
}

Signin.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;
export default Signin;