import './App.css'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";


// import of pages
import Home from './pages/Home';
import Offer from './pages/Offer';

// import of components
import Header from './components/Header'

function App() {

  return (
    <>
    <Router>
      <Header/>
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/offer/:id" element={<Offer/>} />
          <Route path="*" element={<p>Error 404</p>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
