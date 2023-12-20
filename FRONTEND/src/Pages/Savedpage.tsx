
import { useEffect, useState } from 'react';
import Footer from '../Components/Footer'
import Layout from '../Components/Layout'
import Savedlist from '../Components/Savedlist'




function Savedpage() {
 
  return (
   <Layout>
    
    <Savedlist/>
    <Footer/>
   </Layout>
  )
}

export default Savedpage