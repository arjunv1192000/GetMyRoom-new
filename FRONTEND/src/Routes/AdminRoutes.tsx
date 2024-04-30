import { Routes, Route, } from 'react-router-dom';
import {Dashboard,Userpage,Listedpage,Unlistedpage,Detailpage,Detaillistpage} from "../Components/admin/Pages/index"

import React from 'react'

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='user' element={<Userpage />} />
            <Route path='listed' element={<Listedpage />} />
            <Route path='unlisted' element={<Unlistedpage />} />
            <Route path='details' element={<Detailpage />} />
            <Route path='listdetails' element={<Detaillistpage />} />

        </Routes>
    )
}

export default AdminRoutes