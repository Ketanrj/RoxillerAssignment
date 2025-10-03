import useRefreshtoken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router";
import { useEffect, useState } from "react";

const PersistLogin = () => {
    const { auth } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const refresh = useRefreshtoken();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (error) {
                console.error('Failed to refresh token:', error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }

        !auth?.token ? verifyRefreshToken() : setIsLoading(false);
    }, []);

    if(isError){
        return <Navigate to={'/login'} replace/>
    }

    return (
        <>
            {isLoading ? <p>Loading...</p> : <Outlet />}
        </>
    );
}

export default PersistLogin;