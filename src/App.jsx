import './assets/styles/globals.css'
import './assets/styles/index.css'
import SignUp from './pages/Authentication/SignUp'
import Login from './pages/Authentication/Login'
import LandingPage from './pages/LandingPage/LandingPage'
import { Routes, Route } from "react-router-dom";
import Store from './pages/Store'
import Locations from './pages/Locations'
import Contacts from './pages/Contacts'
import About from './pages/About'

function App() {
  return (
    <Routes>
      {/* AUTHENTICATION */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* NAVIGATIONS */}
      <Route path='/store' element={<Store />} />
      <Route path='/locations' element={<Locations />} />
      <Route path='/contacts' element={<Contacts />} />
      <Route path='/about' element={<About />} />
    </Routes >
  )
}

export default App;