
import { Routes, Route, } from 'react-router-dom';
import { Homepage, Profilepage, Savepage, MYlistpage, Listpage, Detailpage,Emailpage,Formpage,Privacy,Terms } from "../Pages/index"
import Pagenotfound from '../Pages/Pagenotfound';


export default function UserRoutes() {
    return (
        <Routes>
            
            <Route path="profile" element={<Profilepage />} />
            <Route path='save' element={<Savepage />} />
            <Route path='mylist' element={<MYlistpage />} />
            <Route path='listdata' element={<Listpage />} />
            <Route path='details' element={<Detailpage />} />
            <Route path='email' element={<Emailpage />} />
            <Route path='form' element={<Formpage />} />
            <Route path='privacy' element={<Privacy />} />
            <Route path='terms' element={<Terms />} />
            <Route path='*' element={<Pagenotfound/>} />
            <Route path='/' element={<Homepage />} />
        </Routes>

    )
}
