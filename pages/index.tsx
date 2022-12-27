import React, { useState, useEffect } from "react";
import appAxios from "../src/middelwares/appAxios";
import MainLayout from "../src/layouts/MainLayout";
import ProductListItem from "../src/components/ProductListItem/ProductListItem";

import type { AxiosResponse } from "axios";
import type { NextPageWithLayout } from "./_app";
import type { Product } from "../src/models/product";


const Home: NextPageWithLayout = () => {

  const [Product, setProduct] = useState<Product[]>([]);

  const products = async () => {
    try {
      const responce = await appAxios.get<any, AxiosResponse<Product[]>>("/product/");
      setProduct(responce.data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    products();
  }, [])

  return (
    <div className="grid grid-cols-12">
      {Product.map((item, index) => {
        return (
          <ProductListItem {...item} key={index} />
        )
      })}
    </div>
  )
}

Home.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default Home;


