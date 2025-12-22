import Header from './components/Header/Header'
import SearchBar from './components/SearchBar/SearchBar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingSpinner from './components/Spinner/Spinner';
import SignupPage from './components/SignUp/Signup';
import LoginPage from './components/Signin/Login';
import Hero from './components/HeroSection/HeroSection';

function App() {

  return (
    
    <>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/register" element={<SignupPage/>} />
          <Route path="/" element={<Hero/>} />
          <Route path="/login" element={<LoginPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
