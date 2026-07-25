import { useQuery } from "@tanstack/react-query";
import axios from "axios"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const checkAuth = async() => {
    const response = await axios.get(`${BASE_URL}/checkauth`,
        { withCredentials: true }
    );
    return response;
}

export const useAuth = () => {
    return useQuery({
        queryKey: ["auth"],
        queryFn: checkAuth,
        retry: false, // Don't retry on failure
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
        refetchOnWindowFocus: false,
    })
};