
import Footer from '../Components/Footer'
import Emailcontact from '../Components/Emailcontact'
import Layout from '../Components/Layout'
import { useLocation } from 'react-router-dom';
import axios from '../Components/Utils/property/axios'
import { useState, useEffect } from 'react';
type property = {
  Id: string;
  id: string;
  title:string;
  location: {
    coordinates: {
      lat: number;
      lng: number;
    }
    locationName: string;
  };
  room: number;
  document: string;
  floorplans: string;
  bathrooms: number;
  bedrooms: number;
  buildYear: string;
  date: string;
  approve: boolean;
  description: string;
  features: {
    interiorDetails: [string],
    otherFeatures: [string],
    outdoorDetails: [string],
    utilities: [string],
  };
  image: [string];
  price: number;
  video: string;
  userId: {
    _id: string;
    email: string;
    image: string;
    name: string;
    phone: string;
  }
  userimg: string;
  sellertype: string;
  username:string;
  useremail:string;
  Ids:string;
}


const Emailcontactpage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const IdParam = queryParams.get('Id');
  const [property, setProperty] = useState<property[]>([]);

 


  useEffect(() => {
    axios
      .get('/getsingleproperty?id=' + IdParam)
      .then((response) => {
       
        setProperty(response.data.propertydata);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, [IdParam]);

  return (
    <Layout>

      {(property.map((data) => (

        <Emailcontact
          key={data.id}
          title={data.title}
          location={data.location}
          image={data.image}
          date={data.date}
          room={data.room}
          bathrooms={data.bathrooms}
          bedrooms={data.bedrooms}
          price={data.price}
          Id={data.userId?._id}
          username={data.userId.name}
          userimg={data.userId.image}
          phone={data.userId.phone}
          useremail={data.userId.email}
          Ids={data._id}
        />
      )))}

      <Footer />
    </Layout>
  )
}

export default Emailcontactpage