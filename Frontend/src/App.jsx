import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Settings from './pages/Settings'
import Profile from './pages/Profile'

function App() {


  return (
    <div>
 
      <Navbar />
     
      <Routes>
        <Route path="/" element={<Home></Home>} />  
        <Route path="/signup" element={<Signup></Signup>} />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/settings" element={<Settings></Settings>} />
        <Route path="/profile" element={<Profile></Profile>} />
      </Routes>

    </div>
  )
}

export default App
