import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://gigflow-l5jw.onrender.com/api",
    // baseURL: "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export default axiosClient;
