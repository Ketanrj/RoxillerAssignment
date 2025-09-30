import { axiosPrivate } from "../api/axios";
import useAuth from "./useAuth";

const REFRESH_URL = '/api/auth/refresh'

const useRefreshtoken = () => {
    const { setAuth } = useAuth();

    return async () => {
        try {
            const res = await axiosPrivate.get(REFRESH_URL);
            if (res.status === 200) {
                const result = res.data;
                setAuth({ name: result.name, email: result.email, role: result.role, token: result.token });
                return result.token;
            }
        } catch (error) {
            throw new Error('Unable to get refresh token')
        }
    }
}

export default useRefreshtoken;