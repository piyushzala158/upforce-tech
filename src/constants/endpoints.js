export const GET_PRODUCTS = {
  endpoint: "/products",
  method: "GET",
  isMultipart: false,
};

export const GET_ALL_CATEGORIES = {
  endpoint: "/products/categories",
  method: "GET",
  isMultipart: false,
};

export const ADD_PRODUCT = {
  endpoint: "/products/add",
  method: "POST",
  isMultipart: false,
};

export const EDIT_PRODUCT = {
  endpoint: "/products/{id}",
  method: "PUT",
  isMultipart: false,
};

export const DELETE_PRODUCT = {
  endpoint: "/products/{id}",
  method: "DELETE",
  isMultipart: false,
};
