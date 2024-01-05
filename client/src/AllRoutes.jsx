import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import Questions from "./pages/Questions/Questions"
import AskQuestion from "./pages/AskQuestion/AskQuestion"
import DisplayQuestion from "./pages/Questions/DisplayQuestion"
import Tags from './pages/Tags/Tags'
import Users from './pages/Users/Users';
import UserProfile from './pages/UserProfle/UserProfile';
import Video from './pages/Video/Video'

const AllRoutes = ({ slideIn, handleSlideIn }) => {
  return (
    <Routes>
        <Route exact path='/' element={<Home slideIn={slideIn} handleSlideIn={handleSlideIn}/>}/>
        <Route exact path='/Auth' element={<Auth/>}/>
        <Route exact path='/Questions' element={<Questions slideIn={slideIn} handleSlideIn={handleSlideIn}/>}/>
        <Route exact path='/AskQuestion' element={<AskQuestion/>}/>
        <Route exact path='/Questions/:id' element={<DisplayQuestion slideIn={slideIn} handleSlideIn={handleSlideIn}/>}/>
        <Route exact path='/Tags' element={<Tags slideIn={slideIn} handleSlideIn={handleSlideIn}/>}/>
        <Route exact path='/Users' element={<Users slideIn={slideIn} handleSlideIn={handleSlideIn}/>}/>
        <Route exact path='/Users/:id' element={<UserProfile slideIn={slideIn} handleSlideIn={handleSlideIn}/>}/>
        <Route exact path='/Video' element={<Video slideIn={slideIn} handleSlideIn={handleSlideIn}/>}/>
    </Routes>
  )
}

export default AllRoutes