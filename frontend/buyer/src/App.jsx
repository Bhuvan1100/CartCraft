import Header from './components/Header/Header'
import SearchBar from './components/SearchBar/SearchBar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingSpinner from './components/Spinner/Spinner';
import SignupPage from './components/SignUp/Signup';

function App() {

  return (
    
    <>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<SignupPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
