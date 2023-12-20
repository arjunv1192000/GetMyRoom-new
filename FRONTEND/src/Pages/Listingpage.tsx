import React, { useEffect, useState } from 'react'
import Footer from '../Components/Footer'
import Filterbar from '../Components/Filterbar'
import Listview from '../Components/Listview'
import Mapview from '../Components/Mapview'
import Layout from '../Components/Layout'
import { useLocation, useNavigate } from 'react-router-dom';



const Listingpage = () => {
  const location = useLocation();
  const [filters, setFilters] = useState({
    numberOfRooms: '',
    numberOfBedrooms: '',
    numberOfBathrooms: '',
    priceRange: '',
    sellerType: '',
  });

  const handleViewTypeChange = (newViewType: React.SetStateAction<string>) => {
    setViewType(newViewType);
  };

  const handleApplyFilters = (newFilters: React.SetStateAction<{ numberOfRooms: string; numberOfBedrooms: string; numberOfBathrooms: string; priceRange: string; sellerType: string }>) => {
    setFilters(newFilters);
  };
  
  console.log(filters,"fndfnsngndsgn");
  
 

  
  const queryParams = new URLSearchParams(location.search);
  const locationParam = queryParams.get('location');
  const typeParam = queryParams.get('type');

  
  const [viewType, setViewType] = React.useState('list');

 

  return (
    <Layout>
      <Filterbar onViewTypeChange={handleViewTypeChange} onApplyFilters={handleApplyFilters}  />
      {viewType === 'list' ? <Listview location={locationParam} type={typeParam} filters={filters} /> : <Mapview location={locationParam} type={typeParam} filters={filters} />}
      <Footer />
    </Layout>
  )
}

export default Listingpage