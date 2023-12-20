import React from 'react'
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { MdEditDocument } from "react-icons/md";
import { BiBed } from "react-icons/bi";
import { MdMeetingRoom } from "react-icons/md";
import { FaBath } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
type Props = {
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
    username: string;
    userimg: string;
    Id: string;
}

const Propertycard: React.FC<Props> = ({ Id, title, location, room, bathrooms, bedrooms, date, image, price, username, userimg }) => {
    const navigate = useNavigate();
    return (
        <div className={`w-[80%] h-auto bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 overflow-hidden mt-20`}>
             <a href=""onClick={() => navigate(`/admin/details?Id=${Id}`)}>
                
           
            <div className=" flex flex-col sm:flex-row">
                <img className="object-cover w-full sm:w-2/6" src={image[0]} alt="" />

                <div className='w-full flex flex-col'>
                    <div className='w-1/2 ml-10'>
                        <h2 className="flex  font-semibold text-gray-900 text-[32px] ">{title}</h2>
                    </div>
                    <div className='w-1/2 ml-10'>
                        <h2 className="font-semibold text-gray-900 text-[32px] ">{price}/month</h2>
                    </div>
                    <div className='w-1/2 flex flex-row ml-10 mt-2'>
                        <FaMapMarkerAlt className="mt-1.5 " />
                        <h2 className="flex  justify-start font-semibold text-gray-900 text-[18px] ml-3 ">{location.locationName}</h2>
                    </div>
                    <div className="w-full h-20 flex flex-row  gap-4 mt-6">
                        <div className='w-20 h-20 ml-4  flex flex-col items-center'>
                            <MdMeetingRoom color="red" fill="red" className=" w-[20px] h-[20px] mt-5" />
                            <h5 className="mb-2 text-sm  tracking-tight text-gray-900 mt-1">{room} room</h5>
                        </div>
                        <div className='w-20 h-20  flex flex-col items-center'>
                            <BiBed color="red" fill="red" className=" w-[20px] h-[20px] mt-5" />
                            <h5 className="mb-2 text-sm  tracking-tight text-gray-900 mt-1">{bathrooms} room</h5>
                        </div>
                        <div className='w-20 h-20  flex flex-col items-center'>
                            <FaBath color="red" fill="red" className=" w-[20px] h-[20px] mt-5" />
                            <h5 className="mb-2 text-sm  tracking-tight text-gray-900 mt-1">{bedrooms}room</h5>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="border-t border-gray-300 mt-1" />
            <div className='w-full h-20  flex justify-between'>
                <div className="flex items-center w-1/2">
                    <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Added on {date}
                        </p>
                    </div>
                </div>
                <div className=" mr-10 flex items-center gap-5">
                    <div className="flex items-center  flex-row">
                        <div className="flex-shrink-0 ml-3">
                            <img className="w-8 h-8 rounded-full" src={userimg} alt="Neil image" />

                        </div>


                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {username}
                        </p>


                    </div>
                </div>
            </div>
            </a>
        </div>
    )
}

export default Propertycard