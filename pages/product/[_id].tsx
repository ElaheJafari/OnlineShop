import { AxiosResponse } from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Button from '../../src/components/shared/Button'
import { useAppDispatch } from '../../src/hooks/useRedux'
import MainLayout from '../../src/layouts/MainLayout'
import appAxios from '../../src/middelwares/appAxios'
import { Product } from '../../src/models/product'
import { AddToCart } from '../../src/redux/slices/cartSlice'
import { NextPageWithLayout } from '../_app'


const ProductDetail: NextPageWithLayout = () => {
    const router = useRouter();
    const { _id } = router.query;
    const [data, setData] = useState<Product | undefined>();
    const dispatch = useAppDispatch();
    const [ImgSrc, setImgSrc] = useState("");

    const GetProductDetail = async () => {
        try {
            const responce = await appAxios.get<any, AxiosResponse<Product>>(`/product/${_id}`)
            setData(responce.data);
            setImgSrc(responce.data.image);
        } catch (error) {

        }
    }
    function addToCart() {
        if (data)
            dispatch(AddToCart(data))
    }

    useEffect(() => {
        if (_id)
            GetProductDetail()
    }, [_id])

    if (!data) return <div>Loading</div>
    return (
        <div className='flex flex-col'>
            <div className="w-1/2 h-72">
                <div className="relative w-full h-full">
                    <Image alt={_id as string} src={ImgSrc} onError={() => {
                        setImgSrc("/assest/NoImage.png");
                        console.clear();
                    }} className="object-contain" fill />
                </div>
            </div>
            <div className='text-regal-blue my-4 text-xl'>{data?.name}</div>
            <div className='text-sm text-justify font-medium'>{data.description}</div>
            <Button type='button' onClick={addToCart} text={"Add to cart"} className='mt-5 self-end w-46' />
        </div>
    )
}

ProductDetail.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default ProductDetail;