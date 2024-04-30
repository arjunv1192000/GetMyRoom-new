import React from 'react'
import { FaMapMarkerAlt } from "react-icons/fa";
import { BiBed } from "react-icons/bi";
import { MdMeetingRoom } from "react-icons/md";
import { FaBath } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import axios from "../../Utils/property/axios"
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import avatar from "../../../assets/avatar.png"

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
    proId: string;
}

const Propertycard2: React.FC<Props> = ({ proId, title, location, room, bathrooms, bedrooms, date, image, price, username, userimg }) => {
    const navigate = useNavigate();

    const handleRemoveClick = async () => {
        try {
            const remove = await axios.post('/removeproperty', { postId: proId });
            if (remove.data.status == true) {

                toast.success('property remove Successfully')
                window.location.reload();


            } else {
                toast.error("error on removing job")

            }



        } catch (error) {

            console.error('Error applying for the job:', error);
        }
    };

    return (
        <div className={`w-[80%] h-auto bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 overflow-hidden mt-20`}>
            <a href="" onClick={() => navigate(`/admin/listdetails?Id=${proId}`)}>
                <div className=" flex flex-col sm:flex-row">
                    <img className="object-cover w-full h-60 sm:w-2/6" src={image[0]} alt="" />

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
            </a>
            <hr className="border-t border-gray-300 mt-1" />
            <div className='w-full h-20  flex justify-between'>
                <div className="flex items-center w-1/2">
                    <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Listed on {date}
                        </p>
                    </div>
                </div>
                <div className=" mr-10 flex items-center gap-5">
                    <div className="flex items-center  flex-row">
                        <div className="flex-shrink-0 ml-3">
                            {userimg && userimg !== 'Not available' ? (
                                <img className="w-8 h-8 rounded-full" src={userimg} alt={name} />
                            ) : (
                                <img className="w-8 h-8 rounded-full" src={avatar} alt={name} />
                            )}

                        </div>


                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {username}
                        </p>


                    </div>
                </div>
                <div className=" mr-5 flex items-center gap-5">

                    <button className="w-10 h-10 flex items-center  border rounded " onClick={handleRemoveClick}  >
                        <MdDeleteForever className="w-6 h-6 ml-2" color="#c2cbd9" fill="#c2cbd9" />
                    </button>
                </div>
            </div>

            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />

        </div>
    )
}

export default Propertycard2