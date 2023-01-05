import Router  from 'next/router';
import React from 'react';
import { useCookies } from 'react-cookie';
import Button from '../../src/components/shared/Button';
import { useAppSelector } from '../../src/hooks/useRedux';
import MainLayout from '../../src/layouts/MainLayout';
import appAxios from '../../src/middelwares/appAxios';

import type { NextPageWithLayout } from '../_app';


const CheckOut: NextPageWithLayout = () => {
    const cartState = useAppSelector((state) => state.cartReducer);
    const [cookies, setCookies] = useCookies(['username'])
    
    const handleSubmit = async () => {
        try {
            const responce = await appAxios.post('/order/submit',
                {
                    orderItems: cartState.carts.map((item) => {
                        return { product: item._id, qty: item.count }
                    }),
                    shippingAddress: cartState.address,

                    paymentMethod: "cash",
                    shippingPrice: "5",
                    totalPrice: 3,
                },
                {
                    headers: {
                        authorization:
                            "Bearer " + cookies.username,
                    },
                })
                if(responce.status==200)
                Router.push('/order')
        } catch (error) {

        }
    }

    return (
        <>
            <div>{cartState.address?.city}</div>
            <div>{cartState.address?.address}</div>
            <div>{cartState.address?.phone}</div>
            <div>{cartState.address?.postalCode}</div>
            <Button onClick={handleSubmit} text='Done' type='submit' />
        </>
    )
}

CheckOut.getLayout = (page) => <MainLayout>{page}</MainLayout>;
export default CheckOut;