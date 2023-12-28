
import post from "../assets/poster.jpg"
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { MdEditDocument } from "react-icons/md";
import { BiBed } from "react-icons/bi";
import { MdMeetingRoom } from "react-icons/md";
import { FaBath } from "react-icons/fa6";


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
}

const Mylistcard: React.FC<Props> = ({ title, location, room, bathrooms, bedrooms, date, image, price, approve }) => {




    return (
        <div className={`w-[80%] h-auto bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 overflow-hidden mt-20 ${!approve && 'bg-gray-900 bg-opacity-40 pointer-events-none relative'}`}>
            {!approve && (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white  text-red text-xl font-semibold bg-red-500 bg-opacity-80">
                    Waiting for admin approval...
                </div>
            )}
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
                            <MdMeetingRoom color="#870e4d" fill="#870e4d" className=" w-[20px] h-[20px] mt-5" />
                            <h5 className="mb-2 text-sm  tracking-tight text-gray-900 mt-1">{room} room</h5>
                        </div>
                        <div className='w-20 h-20  flex flex-col items-center'>
                            <BiBed color="#870e4d" fill="#870e4d" className=" w-[20px] h-[20px] mt-5" />
                            <h5 className="mb-2 text-sm  tracking-tight text-gray-900 mt-1">{bedrooms} room</h5>
                        </div>
                        <div className='w-20 h-20  flex flex-col items-center'>
                            <FaBath color="#870e4d" fill="#870e4d" className=" w-[20px] h-[20px] mt-5" />
                            <h5 className="mb-2 text-sm  tracking-tight text-gray-900 mt-1">{bathrooms}room</h5>
                        </div>
                    </div>
                </div>
            </div>
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
                    {/* <button className="w-10 h-10 flex items-center  border rounded " >
                        <MdEditDocument className="w-6 h-6 ml-2" color="#c2cbd9" fill="#c2cbd9" />
                    </button> */}
                    <button className="w-10 h-10 flex items-center  border rounded " >
                        <MdDeleteForever className="w-6 h-6 ml-2" color="#c2cbd9" fill="#c2cbd9" />
                    </button>
                </div>
            </div>
        </div>

    )
}

export default Mylistcard