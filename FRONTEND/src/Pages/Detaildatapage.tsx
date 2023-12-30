
import Footer from '../Components/Footer'
import Single_propertyDetails from '../Components/Single_propertyDetails'
import Layout from '../Components/Layout'
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../Components/Utils/property/axios'
type property = {
  Id:string;
  id: string;
  title: string;
  location: {
    coordinates: {
      lat: number;
      lng: number;
    }
    locationName: string;
  };
  room: number;
  document:string;
  floorplans:string;
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
  userimg:string;
  sellertype:string;
  proId:string;
}


const Detaildatapage = () => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const IdParam = queryParams.get('Id');
  const [property, setProperty] = useState<property[]>([]);

  console.log(IdParam, "single");


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

        <Single_propertyDetails
          key={data.id}
          proId={data._id}
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
          // phone={data.userId.phone}
          features={data.features}
          description={data.description}
          document={data.document}
          floorplans={data.floorplans}
          buildYear={data.buildYear}
          sellertype={data.sellertype}
        />
      )))}
      <Footer />
    </Layout>
  )
}

export default Detaildatapage