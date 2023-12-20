import { Routes, Route, } from 'react-router-dom';
import {Dashboard,Userpage,Listedpage,Unlistedpage,Detailpage} from "../Components/admin/Pages/index"

import React from 'react'

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='user' element={<Userpage />} />
            <Route path='listed' element={<Listedpage />} />
            <Route path='unlisted' element={<Unlistedpage />} />
            <Route path='details' element={<Detailpage />} />

        </Routes>
    )
}

export default AdminRoutes