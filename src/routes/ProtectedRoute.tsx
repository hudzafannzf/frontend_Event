import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function ProtectedRoute(){
    const isAuthenticate = useAuthStore((state) => state.isAuthenticate);

    // jika isAuthenticate = false maka redirect ke halaman login
    if(!isAuthenticate){
        return <Navigate to="/login" replace />
    }

    // jika true, maka boleh mengakses halaman
    return <Outlet />
}