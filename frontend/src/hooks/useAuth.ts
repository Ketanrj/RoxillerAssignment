import { AuthContext } from "../context/Authprovider";
import { useContext } from "react";

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;