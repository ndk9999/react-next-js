import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export function CheckUserExist({ children }) {
    const auth = useSelector(state => state.results.userId);
    return auth ? children : <Navigate to={"/"} replace={true}></Navigate>;
}