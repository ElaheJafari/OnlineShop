import Image from 'next/image';
import Router from 'next/router';
import React, { FC , useState} from 'react';
import { Product } from '../../models/product';
import Button from '../shared/Button';

const ProductListItem: FC<Product> = (item) => {

    const [ImgSrc , setImgSrc] = useState(item.image);

    return (
        <div className="cart bg-white border rounded col-span-12 m-2 p-3 max-w-[300px] min-w-[300px] mx-auto lg:col-span-3 md:col-span-4 md:min-w-[unset] md:mx-2 md:max-w-[unset] sm:col-span-6 ">
            <div className="w-full h-72">
                <div className="relative w-full h-full">
                    <Image alt={item.name} src={ImgSrc} onError={()=>{
                        setImgSrc("/assest/NoImage.png");
                        console.clear();
                        }} className="object-contain" fill />
                </div>
            </div>
            <div className="text-regal-blue text-center text-base my-2 mx-0 h-12">{item.name}</div>
            <div className="text-center text-sm my-2">{item.countInStock}</div>
            <div className="text-regal-blue my-2 float-left">{item.price}$</div>
            <div className="text-regal-blue my-2 float-right">{item.rating}</div>
            <Button type="button" onClick={() => Router.push(`/product/${item._id}`)} text={"MORE..."} className='mt-6 w-full' />
        </div>
    )
}

export default ProductListItem