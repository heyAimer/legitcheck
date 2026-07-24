import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function createCheckoutSession(plan) {
    const response = await axios.post(`${baseUrl}/api/dodo/checkout`,
        { plan },
        {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            }
        }
    );
    return response.data;
}