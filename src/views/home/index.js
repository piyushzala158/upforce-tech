import React from "react";
import Products from "./Products";
import { getProducts } from "@/actions/productsActions";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  
  return (
    <div>
      <Products />
    </div>
  );
};

export default Home;
