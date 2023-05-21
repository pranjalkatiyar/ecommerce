import axios from "axios";

// https://ecommerce-wdq0.onrender.com/api/v1
// http://localhost:4000/api/v1
const axiosInstance=axios.create({
    baseURL:'http://localhost:4000/api/v1',
    timeout:1000,
 })

export default axiosInstance;
