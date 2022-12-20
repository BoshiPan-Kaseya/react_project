import { useState } from "react";

const useToken = () => {
    const getToken = () => {
        const tokenString = sessionStorage.getItem("token");
        const token = JSON.parse(tokenString);
        return token;
    };

    const [token, setToken] = useState(getToken());

    const saveToken = (token) => {
        sessionStorage.setItem("token", JSON.stringify(token));
        setToken(token);
    };

    return [ token, saveToken];
};

export default useToken;
