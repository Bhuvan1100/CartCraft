import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase/firebase";
import { useEffect, useState } from "react";
import Header from "../Header/Header";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import { Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return unsub;
    }, []);

    if (loading) return <LoadingSpinner />; // or <LoadingSpinner />

    if (!user) return <Navigate to="/signin" replace />;

    return (
        <>
            <Header />   {/* ✅ only when authenticated */}
            <Outlet />
        </>
    );
};

export default ProtectedRoute;
