import { getProductDetails } from "@/actions/productsActions";
import Loader from "@/components/Loader/Loader";
import ProductsDetails from "@/views/productdetails";
import React, { Suspense } from "react";

const ProductPage = async ({ params }) => {
  const id = (await params).id;

  //server side api call to fetch product details
  const data = await getProductDetails(id);

  return (
    <Suspense fallback={<Loader />}>
      <ProductsDetails data={data} />
    </Suspense>
  );
};

export default ProductPage;
