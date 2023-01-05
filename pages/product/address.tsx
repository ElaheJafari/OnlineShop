import { Form, Formik } from 'formik';
import React from 'react';
import Button from '../../src/components/shared/Button';
import Inputs from '../../src/components/shared/Inputs';
import { useAppDispatch } from '../../src/hooks/useRedux';
import MainLayout from '../../src/layouts/MainLayout';
import { setAddress } from '../../src/redux/slices/cartSlice';

import type { address } from '../../src/models/address';
import type { NextPageWithLayout } from '../_app';
import Router from 'next/router';

const Address: NextPageWithLayout = () => {
    const dispatch = useAppDispatch();
    const handleSubmit = (values: address) => {
        dispatch(setAddress(values));
        Router.push('/order/checkOut');
    }
    return (
        <>
            <Formik
                initialValues={{
                    city: "",
                    address: "",
                    postalCode: "",
                    phone: ""
                }}
                onSubmit={handleSubmit}
            >
                <Form>
                    <Inputs name='city' placeholder='City' type='text' />
                    <Inputs name='address' placeholder='Address' type='text' />
                    <Inputs name='postalCode' placeholder='Pstal Code' type='number' />
                    <Inputs name='phone' placeholder='Phone Number' type='text' />
                    <Button text='Next' type='submit' />
                </Form>
            </Formik>
        </>
    )
}

Address.getLayout = (page) => <MainLayout>{page}</MainLayout>;
export default Address;