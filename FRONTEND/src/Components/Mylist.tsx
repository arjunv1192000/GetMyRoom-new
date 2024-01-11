
import { useEffect, useState } from 'react';
import Mylistcard from './Mylistcard'
import { useSelector } from "react-redux";
import axios from "./Utils/property/axios"
import { useNavigate } from 'react-router-dom';


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


const Mylist = (openLoginModal) => {
  const [property, setProperty] = useState<property[]>([]);
  const userdata = useSelector((state: RootState) => state.user.value);
  const navigate = useNavigate();

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
      <div className="mx-auto max-w-2xl px-4 py-5 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900  sm:ml-20 sm:text-3xl  ">My List</h2>
        <div className=" ml-10 sm:ml-10 ">
          {property.length === 0 ? (
            <div className='flex justify-center w-full h-40 mt-10'>

              <div onClick={() => navigate('/form')}
                className=' text-sm font-semibold text-center py-2 w-[300px] h-10 rounded-full transition ease-in-out delay-150 bg-[#870e4d]  hover:-translate-y-1 hover:scale-110 hover:bg-[#390b79] hover: duration-300transition cursor-pointer text-white'
              >
                Add your home

              </div>



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