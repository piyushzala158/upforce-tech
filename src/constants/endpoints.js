//get products endpoint
export const GET_PRODUCTS = {
  endpoint: "/products",
  method: "GET",
  isMultipart: false,
};

// get product by search
export const GET_PRODUCTS_BY_SEARCH = {
  endpoint: "/products/search",
  method: "GET",
  isMultipart: false,
};

//get product details
export const GET_PRODUCT_DETAILS = {
  endpoint: "/products/{id}",
  method: "GET",
  isMultipart: false,
};

//get all categories
export const GET_ALL_CATEGORIES = {
  endpoint: "/products/categories",
  method: "GET",
  isMultipart: false,
};

//add product
export const ADD_PRODUCT = {
  endpoint: "/products/add",
  method: "POST",
  isMultipart: false,
};

//edit product
export const EDIT_PRODUCT = {
  endpoint: "/products/{id}",
  method: "PUT",
  isMultipart: false,
};

//delete product
export const DELETE_PRODUCT = {
  endpoint: "/products/{id}",
  method: "DELETE",
  isMultipart: false,
};
