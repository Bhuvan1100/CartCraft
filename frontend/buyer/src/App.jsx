import Header from './components/Header/Header'
import SearchBar from './components/SearchBar/SearchBar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingSpinner from './components/Spinner/Spinner';
import SignupPage from './components/SignUp/Signup';
import LoginPage from './components/Signin/Login';
import Hero from './components/HeroSection/HeroSection';
import EmailVerification from './components/SignUp/Emailverification';

function App() {

  return (
    
    <>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/register" element={<SignupPage/>} />
          <Route path="/" element={<Hero/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/verify-email" element={<EmailVerification/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
