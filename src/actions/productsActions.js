import api from "@/api/api";

import {
  GET_PRODUCTS,
  GET_ALL_CATEGORIES,
  ADD_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCT_DETAILS,
} from "@/constants/endpoints";

export const getProducts = async (data) => {
  const res = await api({ ...GET_PRODUCTS, params: data });
  return res;
};

export const getProductDetails = async (id) => {
  const res = await api({
    ...GET_PRODUCT_DETAILS,
    endpoint: GET_PRODUCT_DETAILS.endpoint.replace("{id}", id),
  });
  return res;
};
export const getAllCategories = async () => {
  const res = await api({ ...GET_ALL_CATEGORIES });
  return res;
};

export const addProduct = async (data) => {
  const res = await api({ ...ADD_PRODUCT, data });
  return res;
};

export const editProduct = async (id, data) => {
  const res = await api({
    ...EDIT_PRODUCT,
    endpoint: EDIT_PRODUCT.endpoint.replace("{id}", id),
    data,
  });
  return res;
};

export const deleteProduct = async (id) => {
  const res = await api({
    ...DELETE_PRODUCT,
    endpoint: DELETE_PRODUCT.endpoint.replace("{id}", id),
  });
  return res;
};
