import React from "react"
import { Routes, Route } from 'react-router-dom'

import Home from "../components/home/Home"
import UserCrud from  "../components/user/UserCrud"
import UserAbout from "../components/user/UserAbout"
import UserTicket from '../components/user/UserTicket'

export default props =>  (
    <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/users' element={<UserCrud />} />
        <Route path="/tickets" element={<UserTicket />} />
        <Route path='/about' element={<UserAbout />} />
        <Route path='*' element={<Home />} />
    </Routes>
)