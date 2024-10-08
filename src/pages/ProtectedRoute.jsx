import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
    const { isLogged } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogged) {
            navigate("/login");
        }
        
    }, [isLogged]);

    return <>{children}</>;
};
