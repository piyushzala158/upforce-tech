//react
import React, { Suspense } from "react";

//next
import { notFound } from "next/navigation";

//action
import { getProductDetails } from "@/actions/productsActions";

//components
import Loader from "@/components/Loader/Loader";
import ProductsDetails from "@/views/productdetails";

const ProductPage = async ({ params }) => {
  //id from params
  const id = (await params).id;

  //server side api call to fetch product details
  let data;
  try {
    data = await getProductDetails(id);
  } catch (error) {
    console.log("error: ", error);
  }

  if (!data) {
    notFound();
  }

  return (
    <Suspense fallback={<Loader />}>
      <ProductsDetails data={data} />
    </Suspense>
  );
};

export default ProductPage;
