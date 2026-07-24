import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const getEntitlement = async() => {
    const response = await axios.get(`${BASE_URL}/subscription/details`, {
        withCredentials: true,
    });
    return response.data;
}
export default getEntitlement;