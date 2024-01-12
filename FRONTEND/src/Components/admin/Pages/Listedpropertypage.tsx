import React from 'react'
import Layout from '../Components/Layout'
import Propertycard2 from '../Components/Propertycard2'
import { useEffect, useState } from 'react';
import axios from "../../admin/Utils/axios"

type Property = {
  id: string;
  title: string;
  location: {
    coordinates: {
      lat: number;
      lng: number;
    };
    locationName: string;
  };
  room: number;
  bathrooms: number;
  bedrooms: number;
  buildYear: string;
  date: string;
  approve: boolean;
  description: string;
  features: {
    interiorDetails: [string];
    otherFeatures: [string];
    outdoorDetails: [string];
    utilities: [string];
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
  };
  sellertype: string;
  proId: string;
};


const Listedpropertypage = () => {

  const [property, setProperty] = useState<Property[]>([]);

  useEffect(() => {
    axios
      .get('/getuserlistedproperty')
      .then((response) => {
        console.log(response.data.userdata);
        setProperty(response.data.userdata)
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);


  return (
    <Layout>
      <div className='bg-white'>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 ">

          {(property.map((data) => (

            <Propertycard2
              key={data.id}
              proId={data._id}
              title={data.title}
              location={data.location}
              image={data.image}
              date={data.date}
              bathrooms={data.bathrooms}
              bedrooms={data.bedrooms}
              price={data.price}
              username={data.userId.name}
              userimg={data.userId.image}
            />
          )))}

         

        </div>
      </div>



    </Layout>
  )
}

export default Listedpropertypage