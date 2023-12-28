
import './App.css'
import Homepage from './Pages/Homepage'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import Loadingpage from './Components/Loadingpage';
import Loginpage from './Components/admin/Pages/Loginpage';
import axios from 'axios';





const UserRoutes = lazy(() => import('./Routes/UserRoutes'));
const AdminRoutes=lazy(()=>import('./Routes/AdminRoutes'))



function App() {
 
  useEffect(()=>{
    console.log('first gfgfdgjfdlhlhmd;flhmdflhdfh')
    axios.get('https://getmyroom.co.uk/api').then(resp=>console.log(resp)).then(err=>console.log(err))
  },[])

  return (
    <BrowserRouter>
          <Routes>
            <Route path='/' element={<Suspense fallback={<Loadingpage />}><Homepage /></Suspense>} />
            <Route path='/*' element={<Suspense fallback={<Loadingpage />}><UserRoutes /></Suspense>} />
            <Route path='/admin' element={<Suspense fallback={<Loadingpage />}><Loginpage /></Suspense>} />
            <Route path='/admin/*' element={<Suspense fallback={<Loadingpage />}><AdminRoutes /></Suspense>} />
           
          </Routes>
      </BrowserRouter>

 
      
  


   
   
   
  )
}

export default App
