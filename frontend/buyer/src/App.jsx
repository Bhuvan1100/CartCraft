import Header from './components/Header/Header'
import SearchBar from './components/SearchBar/SearchBar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingSpinner from './components/Spinner/Spinner';
import SignupPage from './components/SignUp/Signup';
import LoginPage from './components/Signin/Login';
import Hero from './components/HeroSection/HeroSection';
import EmailVerification from './components/SignUp/Emailverification';
import Mainmarket from './components/Shop/Mainmarket';
import MensCollection from './components/Collections/MensCollection';
import WomensCollections from './components/Collections/WomensCollection';
import KidsCollections from './components/Collections/KidsCollection';
import ShopPage from './components/Shop/ShopPage';
import Footer from './components/Footer/Footer';
import ProductPage from './components/Shop/ProductPage';
import { Toaster } from 'sonner';

function App() {

  return (
    
    <>
      <Toaster richColors position="top-right" />
      <BrowserRouter>
      <Header />
        <Routes>
          {/* <Route path="/register" element={<SignupPage/>} />
          <Route path="/" element={<Hero/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/verify-email" element={<EmailVerification/>} /> */}

          {/* <Route path="/" element={<Mainmarket/>} /> */}
            {/* <Route path="/" element={<ShopPage/>} /> */}
            <Route path="/" element={<ProductPage/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
