import React, { useEffect, useState } from 'react';
import MainLayout from '../../src/layouts/MainLayout';
import appAxios from '../../src/middelwares/appAxios';
import { useCookies } from 'react-cookie';

import type { NextPageWithLayout } from '../_app';
import { Order } from '../../src/models/order';
import Button from '../../src/components/shared/Button';
import Router from 'next/router';

const Index: NextPageWithLayout = () => {

    const [cookies, setCookies] = useCookies(['username']);
    const [orders, setOrders] = useState<Order[] | undefined>()

    const Data = async () => {
        try {
            const responce = await appAxios<Order[]>('/order/', {
                headers: {
                    authorization:
                        "Bearer " + cookies.username,
                }
            },)
            setOrders(responce.data);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        Data()
    }, [])

    if (!orders) return <div>Loading</div>
    return (
        <div>
            {orders?.map((item) => {
                return <div key={item._id} className='border'>
                    <div>{item.shippingPrice}</div>
                    <div>address:{item.shippingAddress.address}</div>
                    <Button onClick={() => Router.push(`/order/${item._id}`)} text='Detail' type='button' />
                </div>
            })}
        </div>
    )
}

Index.getLayout = (page) => <MainLayout>{page}</MainLayout>;
export default Index;