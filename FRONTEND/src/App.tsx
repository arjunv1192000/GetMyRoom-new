
import './App.css'
import Homepage from './Pages/Homepage'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import Loadingpage from './Components/Loadingpage';
import Loginpage from './Components/admin/Pages/Loginpage';
import Terms from "./Components/Modals/Terms"






const UserRoutes = lazy(() => import('./Routes/UserRoutes'));
const AdminRoutes=lazy(()=>import('./Routes/AdminRoutes'))



function App() {
 
  

  return (
    <BrowserRouter>
          <Routes>
            <Route path='/' element={<Suspense fallback={<Loadingpage />}><Homepage /></Suspense>} />
            <Route path='/*' element={<Suspense fallback={<Loadingpage />}><UserRoutes /></Suspense>} />
            <Route path='/admin' element={<Suspense fallback={<Loadingpage />}><Loginpage /></Suspense>} />
            <Route path='/admin/*' element={<Suspense fallback={<Loadingpage />}><AdminRoutes /></Suspense>} />
           
          </Routes>
          <Terms/>
      </BrowserRouter>

 
      
  


   
   
   
  )
}

export default App
