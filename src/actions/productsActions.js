const { default: api } = require("@/api/api");
const { GET_PRODUCTS } = require("@/constants/endpoints");

export const getProducts = async (data) => {
  const res = await api({...GET_PRODUCTS,params:data});
  return res;
};
