import { Form, FormikProps, Formik } from "formik";
import Button from "../../app/components/shared/Button";
import Inputs from "../../app/components/shared/Inputs";
import * as yup from 'yup';
import Router from 'next/router';
import appAxios from "../../app/middelwares/appAxios";
import Image from "next/image";
import AuthLayout from "../../app/layouts/AuthLayout";
import { NextPageWithLayout } from "../_app";

interface RegisterFormValuesInterface {
    username: string,
    email: string,
    mobile: string,
    password: string,
    Confirmpassword: string
}
const loginFormSchema = yup.object().shape({
    username: yup.string().required().min(3),
    email: yup.string().required().email(),
    password: yup.string().required().min(8).matches(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,}$/, "password format is not correct"),
    Confirmpassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
    mobile: yup.string().required().matches(/(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/, "mobile format is not correct")
})

const Register: NextPageWithLayout = () => {

    const handleSubmit = async (values: RegisterFormValuesInterface) => {
        try {
            const response = await appAxios.post("/user/signup",
                {
                    username: values.username,
                    email: values.email,
                    password: values.password,
                    mobile: values.mobile,
                })
            if (response.status === 201)
                Router.push('/auth/signin')
        } catch (error) {

        }
    }

    return (
        <>
            <Formik
                initialValues={{
                    username: "",
                    email: "",
                    mobile: "",
                    password: "",
                    Confirmpassword: ""
                }}
                onSubmit={handleSubmit}
                validationSchema={loginFormSchema}
            >
                {(props: FormikProps<RegisterFormValuesInterface>) => {
                    console.log(props);
                    
                    return <Form className="bg-gray-50 w-1/2 border border-gray-400 rounded flex my-10 mx-auto">
                        <div className="w-3/5">
                            <div className="relative w-full h-full">
                                <Image alt={""} src={"/assest/signUp.webp"} className="object-cover" fill />
                            </div>
                        </div>
                        <div className="p-4">
                            <Inputs name="username" placeholder="username" type="text" />
                            <Inputs name="email" placeholder="email" type="email" />
                            <Inputs name="mobile" placeholder="phoneNumber" type="text" />
                            <Inputs name="password" placeholder="password" type="password" />
                            <Inputs name="Confirmpassword" placeholder="ConfirmPassword" type="password" />
                            <Button text="Submit" type="submit" loading={props.isSubmitting} className="w-full my-6" />
                        </div>
                    </Form>
                }}
            </Formik>
        </>
    )
}

Register.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;
export default Register;