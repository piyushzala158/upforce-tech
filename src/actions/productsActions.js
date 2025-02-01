
//api function
import api from "@/api/api";

//constants
import {
  GET_PRODUCTS,
  GET_ALL_CATEGORIES,
  ADD_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCT_DETAILS,
  GET_PRODUCTS_BY_SEARCH,
} from "@/constants/endpoints";

//get products Action
export const getProducts = async (data) => {
  const res = await api({ ...GET_PRODUCTS, params: data });
  return res;
};

//get products by search Action
export const getProductsBySearch = async (data) => {
  const res = await api({ ...GET_PRODUCTS_BY_SEARCH, params: data });
  return res;
};

//get product details action
export const getProductDetails = async (id) => {
  const res = await api({
    ...GET_PRODUCT_DETAILS,
    endpoint: GET_PRODUCT_DETAILS.endpoint.replace("{id}", id),
  });
  return res;
};

//get product details action
export const getAllCategories = async () => {
  const res = await api({ ...GET_ALL_CATEGORIES });
  return res;
};


// add product action
export const addProduct = async (data) => {
  const res = await api({ ...ADD_PRODUCT, data });
  return res;
};

// edit product action
export const editProduct = async (id, data) => {
  const res = await api({
    ...EDIT_PRODUCT,
    endpoint: EDIT_PRODUCT.endpoint.replace("{id}", id),
    data,
  });
  return res;
};

//delete product action
export const deleteProduct = async (id) => {
  const res = await api({
    ...DELETE_PRODUCT,
    endpoint: DELETE_PRODUCT.endpoint.replace("{id}", id),
  });
  return res;
};
