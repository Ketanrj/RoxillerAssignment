import axios from "axios";
const BASE_URL = 'http://localhost:3000';

// localhost:3000/api/admin/user/count

export default axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});