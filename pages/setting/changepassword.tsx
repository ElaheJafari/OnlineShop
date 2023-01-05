import { Form, Formik } from 'formik';
import React from 'react'
import Button from '../../src/components/shared/Button';
import Inputs from '../../src/components/shared/Inputs';
import MainLayout from '../../src/layouts/MainLayout';
import SettingLayout from '../../src/layouts/SettingLayout';
import appAxios from '../../src/middelwares/appAxios';
import { useCookies } from 'react-cookie';
import Router from 'next/router';

import type { NextPageWithLayout } from '../_app';

interface ChangePasswordProps {
  old_password: string,
  new_password: string,
}
const ChangePassword: NextPageWithLayout = () => {

  const [cookies, , removeCookies] = useCookies(['username']);

  const HandleSubmit = async (values: ChangePasswordProps) => {
    try {
      await appAxios.put('/user/change-password', values,
        {
          headers: {
            authorization:
              "Bearer " + cookies.username,
          },
        })
      removeCookies('username');
      Router.push({ pathname: '/auth/signin', query: { mode: "logout" } });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SettingLayout>
      <>
        <Formik
          initialValues={{
            old_password: "",
            new_password: "",
          }}
          onSubmit={HandleSubmit}
        >
          <Form>
            <Inputs placeholder='Old Password' name='old_password' type='password' />
            <Inputs placeholder='New Password' name='new_password' type='password' />
            <Button text='Submit' type='submit' className='mt-4 w-[220px] hover:bg-[#52467e]' />
          </Form>
        </Formik>
      </>
    </SettingLayout>
  )
}


ChangePassword.getLayout = (page) => <MainLayout>{page}</MainLayout>
export default ChangePassword;