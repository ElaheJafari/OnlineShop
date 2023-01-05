import React, { useEffect, useState } from 'react'
import Inputs from '../../src/components/shared/Inputs';
import MainLayout from '../../src/layouts/MainLayout';
import SettingLayout from '../../src/layouts/SettingLayout';
import { Form, FormikProps, Formik, Field, FieldProps } from "formik";
import Button from '../../src/components/shared/Button';
import appAxios from '../../src/middelwares/appAxios';
import { User } from '../../src/models/user';
import { useCookies } from 'react-cookie';

import type { NextPageWithLayout } from '../_app';

interface ChangeProfileProps {
  firstname: string,
  lastname: string,
  gender: string,
  age: string,
  city: string,
}

const ChangeProfile: NextPageWithLayout = () => {

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

  const Handlesubmit = async (values: ChangeProfileProps) => {
    try {
      const responce = await appAxios.put('/user/change-profile', values,
        {
          headers: {
            authorization:
              "Bearer " + cookies.username,
          },
        });
    } catch (error) {
      console.log(error);
    }
  }

  if(!data) return <div>Loading</div>
  return (
    <SettingLayout>
      <>
        <Formik
          initialValues={{
            firstname: data?.firstname || "",
            lastname: data?.lastname || "",
            gender: data?.gender || "",
            age: data?.age || "",
            city: data?.city || "",
          }}
          onSubmit={Handlesubmit}
        >
          <Form>
            <Inputs placeholder='First Name' name='firstname' type='text' />
            <Inputs placeholder='Last Name' name='lastname' type='text' />
            <Field name='gender'>
              {({ field, form }: FieldProps) => {
                return <select value={field.value} onChange={(e) => { form.setFieldValue(field.name, e.target.value) }}>
                  <option value="male">male</option>
                  <option value="female">female</option>
                </select>
              }}
            </Field>
            <Inputs placeholder='Age' name='age' type='text' />
            <Inputs placeholder='City' name='city' type='text' />
            <Button text='submit' type='submit' className='mt-4 w-[220px] hover:bg-[#52467e]' />
          </Form>
        </Formik>
      </>
    </SettingLayout>
  )
}

ChangeProfile.getLayout = (page) => <MainLayout>{page}</MainLayout>
export default ChangeProfile;