import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import MainLayout from '../../src/layouts/MainLayout';
import appAxios from '../../src/middelwares/appAxios';
import { Order } from '../../src/models/order';
import { NextPageWithLayout } from '../_app';

const OrderDetail: NextPageWithLayout = () => {

    const [cookies, setCookies] = useCookies(['username']);
    const [orders, setOrders] = useState<Order | undefined>();
    const router = useRouter();
    const { _id } = router.query;

    const Data = async () => {
        try {
            const responce = await appAxios<Order>(`/order/${_id}`, {
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
        if (_id)
            Data()
    }, [_id])

    if (!orders) return <div>Loading</div>
    return (
        <div>
            <div>Product:{orders.orderItems.map((item) => {
                return <div key={item._id} className='flex'>
                    <div>{item.product.name}</div>
                    <div className='rounded-full mx-5 bg-lime-600 h-5 w-5 text-sm flex justify-center items-center text-white'>{item.qty}</div>
                </div>
            })}
            </div>
            <div>{orders.shippingPrice}</div>
        </div>
    )
}

OrderDetail.getLayout = (page) => <MainLayout>{page}</MainLayout>;
export default OrderDetail;