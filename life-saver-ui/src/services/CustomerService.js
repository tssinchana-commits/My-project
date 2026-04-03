import axios from "axios";
import api from "./api";

const BASE_URL = "http://localhost:8081/customer/api/v1/customers";

// Function to get auth header
const getAuthHeader = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

// Get customer by ID
export const getCustomerById = (id) => {
  return axios.get(`${BASE_URL}/${id}`, getAuthHeader());
};

// Update customer status
export const updateCustomerStatus = (id, data) => {
  return axios.put(`${BASE_URL}/${id}/status`, data, getAuthHeader());
};