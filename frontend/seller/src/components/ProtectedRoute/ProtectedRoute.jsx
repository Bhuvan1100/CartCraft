import { Navigate, Outlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase/firebase";
import { useEffect, useState } from "react";
import Header from "../Header/Header";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import useAuthStore from "../../stores/SellerAuthStore";
import useSellerInfoStore from "../../stores/SellerInfoStore";

const ProtectedRoute = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const { setAuth } = useAuthStore();
    const { fetchSellerInfo } = useSellerInfoStore();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                setAuth(true, currentUser.emailVerified);

                if (currentUser.emailVerified) {
                    // Declare and call async function to await fetch
                    const fetchData = async () => {
                        await fetchSellerInfo();
                    };
                    fetchData(); 
                }
            } else {
                setAuth(false, false);
            }

            setLoading(false); // spinner ends after auth check
        });

        return unsub;
    }, [setAuth, fetchSellerInfo]);

    if (loading) return <LoadingSpinner />;

    if (!user) return <Navigate to="/signin" replace />;

    if (!user.emailVerified) return <Navigate to="/verify-email" replace />;

    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};

export default ProtectedRoute;
