
import { Routes, Route, } from 'react-router-dom';
import { Homepage, Profilepage, Savepage, MYlistpage, Listpage, Detailpage,Emailpage,Formpage,Privacy } from "../Pages/index"


export default function UserRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path="profile" element={<Profilepage />} />
            <Route path='save' element={<Savepage />} />
            <Route path='mylist' element={<MYlistpage />} />
            <Route path='listdata' element={<Listpage />} />
            <Route path='details' element={<Detailpage />} />
            <Route path='email' element={<Emailpage />} />
            <Route path='form' element={<Formpage />} />
            <Route path='privacy' element={<Privacy />} />
          
        </Routes>

    )
}
