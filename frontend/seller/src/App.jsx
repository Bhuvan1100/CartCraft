import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SellerInfo from './components/SellerInfo/SellerInfo';
import AddItem from './components/AddItems/AddItems';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import VerifyEmail from './components/SignUp/Emailverification';

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SellerInfo />} />
          <Route path="/add-items" element={<AddItem />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
