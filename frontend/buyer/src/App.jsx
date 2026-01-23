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

function App() {

  return (
    
    <>
      <Toaster richColors position="top-right" />
      <BrowserRouter>
       <ScrollToTop />
      <Header />
        <Routes>
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/category/:slug" element={<ShopPage />} />
            <Route path="/womensCollections" element={<WomensCollections/>} />
            <Route path="/kidscollections" element={<KidsCollections/>} />
            <Route path="/mensCollections" element={<MensCollections/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/register" element={<SignupPage/>} />
            <Route path="/verify-email" element={<VerifyEmailPage/>} />
            <Route path="/cart" element={<ShoppingCart/>} />
            <Route path="/" element={<Homepage/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
