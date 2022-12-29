import reactLogo from './assets/react.svg'
import Header from "./components/header/Header"
import Footer from './components/footer/Footer'
import Home from "./components/home/Home"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./components/header/Header.css"
import "./components/home/home.css"
import "./components/footer/Footer.css"

import "./App.css";
function App() {

  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  )
}

export default App
