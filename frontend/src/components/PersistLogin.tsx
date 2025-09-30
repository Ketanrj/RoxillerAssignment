import useRefreshtoken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import { Outlet } from "react-router";
import { useEffect, useState } from "react";

const PersistLogin = () => {
    const { auth } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshtoken();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (error) {
                console.error('Failed to refresh token:', error);
            } finally {
                setIsLoading(false);
            }
        }

        !auth?.token ? verifyRefreshToken() : setIsLoading(false);
    }, []);

    return (
        <>
            {isLoading ? <p>Loading...</p> : <Outlet />}
        </>
    );
}

export default PersistLogin;