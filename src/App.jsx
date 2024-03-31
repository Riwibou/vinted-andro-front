/* https://lereacteur-vinted.netlify.app */

import './App.css'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// someting to add in public for netlify, dont forget to check what before deployement

// import of pages
import Home from './pages/Home';
import Offer from './pages/Offer';
import Signup from './pages/Signup';
import Login from './pages/Login'

// import of components
import Header from './components/Header'

function App() {
  const [token, setToken] = useState(Cookies.get("vinted-token") || null)

  const handleToken =(token) => {
    if(token) { Cookies.set("vinted-token", token, {expires: 15})
    setToken(token)
    } else {
    Cookies.remove("vinted-token")
    setToken(null)
    }
  }

  return (
    <>
    <Router>
      <Header token={token}/>
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/offer/:id" element={<Offer/>} />
          <Route path="/signup" element={<Signup handleToken={handleToken}/>}/>
          <Route path="/login" element={<Login handleToken={handleToken}/>}/>
          <Route path="*" element={<p>Error 404</p>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
