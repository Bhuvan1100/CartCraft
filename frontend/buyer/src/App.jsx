import Header from './components/Header/Header'
import SearchBar from './components/SearchBar/SearchBar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingSpinner from './components/Spinner/Spinner';
import Footer from './components/Footer/Footer';
import { Toaster } from 'sonner';
import Homepage from './Pages.jsx/HomePage';
import KidsCollections from './components/Collections/KidsCollection';
import MensCollections from './components/Collections/MensCollection';
import WomensCollections from './components/Collections/WomensCollection';
import ProductPage from './components/Shop/ProductPage';
import ScrollToTop from './components/ScrolllToTop/ScrollToTop';
import ShopPage from './components/Shop/ShopPage';
import LoginPage from './components/Signin/Login';
import SignupPage from './components/SignUp/Signup';
import VerifyEmailPage from './components/SignUp/Emailverification';
import ShoppingCart from './components/Cart/Cart';
import { useEffect } from 'react';
import useUserStore from './Stores/UserStore';
import CurrentOrdersPage from './components/Orders/CurrentOrders';
import UserProfile from './components/UserProfile';
import { useState } from 'react';
import { auth } from './Firebase/firebase';
import PreviousOrdersPage from './components/Orders/PreviousOrders';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        useUserStore.getState().setLoginStatus(true, user.email);
      } else {
        useUserStore.getState().setLoginStatus(false);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (authLoading) {
    // Return spinner while loading
    return (
      <div className="relative w-full h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }
  return (

    <>
      <Toaster richColors position="top-right" />
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/category/:slug" element={<ShopPage />} />
          <Route path="/womensCollections" element={<WomensCollections />} />
          <Route path="/kidscollections" element={<KidsCollections />} />
          <Route path="/mensCollections" element={<MensCollections />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/previous-orders" element={<PreviousOrdersPage />} />
          <Route path="/current-orders" element={<CurrentOrdersPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
