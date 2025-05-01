import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import { useEffect } from 'react'
import { useAuthStore } from './store/useAuthStore'

import {Loader} from 'lucide-react';
import { Toaster } from 'react-hot-toast'

function App() {

  const { authUser,checkAuth,isCheckingAuth } = useAuthStore();

  useEffect(() => {
    const checkUserAuth = async () => {
      await checkAuth();
    };

    checkUserAuth();
  },[checkAuth]);

  if(isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-15 animate-spin" />
      </div>
    )
  }

  
  return (
    <div>
 
      <Navbar />
      <main className="pt-20 px-4"> {/* pt-16 to avoid navbar overlap */ }
      <Routes>
        <Route path="/" element={authUser ? <Home></Home> : <Navigate to="/login"></Navigate>} />  
        <Route path="/signup" element={!authUser ? <Signup></Signup> : <Navigate to="/"></Navigate>} />
        <Route path="/login" element={!authUser ? <Login></Login> : <Navigate to="/"></Navigate> } />
        <Route path="/settings" element={authUser ? <Settings></Settings> : <Navigate to="/login"></Navigate>} />
        <Route path="/profile" element={authUser ? <Profile></Profile> : <Navigate to="/login"></Navigate>} />
      </Routes>
      </main>
      
      <Toaster></Toaster>
    </div>
  )
}

export default App
