const axios = require('axios');
require('dotenv').config();

exports.getProductById = async (id) => {
  const response = await axios.get(`${process.env.PRODUCT_SERVICE_URL}/${id}`);
  return response.data;
};

exports.updateProductStock = async (id, newStock) => {
  await axios.put(`${process.env.PRODUCT_SERVICE_URL}/${id}`, { stock: newStock });
};