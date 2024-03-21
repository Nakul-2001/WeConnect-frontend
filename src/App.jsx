import './App.css'
import {BrowserRouter as Router , Routes, Route, Navigate} from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Home from './Pages/Home'
import { useSelector } from 'react-redux'
import Preview from './Pages/Preview'
import {Toaster} from 'react-hot-toast'

function App() {

  const {currentUser,isFetching} = useSelector((state) => state.user);

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={!currentUser ? <Preview /> : <Home/>}></Route>
        <Route path='/Login' element={!currentUser ? <Login /> : <Navigate to='/' />}></Route>
        <Route path='/Register' element={!currentUser ? <Register /> : <Navigate to='/' />}></Route>
      </Routes>
    </Router>
    <Toaster></Toaster>
    </>
  )
}

export default App
