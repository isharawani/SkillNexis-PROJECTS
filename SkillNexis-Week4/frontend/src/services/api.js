
import axios from "axios";

const API = axios.create({
    baseURL: "https://threeeleven-backend.onrender.com/api"
});

export default API;
