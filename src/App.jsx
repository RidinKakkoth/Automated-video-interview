import { Route, Routes } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar/Navbar"
import Home from "./pages/Home/Home"
// import Footer from "./components/Footer/Footer"
import { useState } from "react"
import LoginPopup from "./components/LoginPopup/LoginPopup"
import Skills from "./pages/Skills/Skills"
import Interview from "./components/Interview/Interview";

const App = () => {

  const[showLogin,setShowLogin]=useState(false)

  return (
    <>
    {showLogin?<LoginPopup  setShowLogin={setShowLogin}/>:<></>}
    <div className="app">
    <ToastContainer/>
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/skills" element={<Skills/>} />
        <Route path="/interview/:id" element={<Interview/>} />
      </Routes>
    </div>
    {/* <Footer/> */}
    </>
  )
}

export default App