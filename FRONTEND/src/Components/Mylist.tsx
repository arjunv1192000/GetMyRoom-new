
import { useEffect, useState } from 'react';
import Mylistcard from './Mylistcard'
import { useSelector } from "react-redux";
import axios from "./Utils/property/axios"


type RootState = {
  user: {
    value: {
      id: string | null;
      name: string | null;
      email: string | null;
      phone: string | null;
      access_token: string;
    };
  };
};


type property = {
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
}

const Mylist = () => {
  const [property, setProperty] = useState<property[]>([]);
  const userdata = useSelector((state: RootState) => state.user.value);

  const id = userdata.id;

  useEffect(() => {
    axios
      .get('/getuserproperty?id=' + id)
      .then((response) => {
        console.log(response.data.userlist);
        setProperty(response.data.userlist)
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, [id]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 ml-20">My listings</h2>
        <div className="ml-20">
          {property.length === 0 ? (
            <div className='flex justify-center w-full h-40'>

              <p className="text-gray-500 mt-4">No listings found.</p>

            </div>

          ) : (
            property.map((data) => (
              <Mylistcard
                key={data._id}
                proId={data._id}
                title={data.title}
                location={data.location}
                image={data.image}
                date={data.date}
                room={data.room}
                bathrooms={data.bathrooms}
                bedrooms={data.bedrooms}
                price={data.price}
                approve={data.approve}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Mylist