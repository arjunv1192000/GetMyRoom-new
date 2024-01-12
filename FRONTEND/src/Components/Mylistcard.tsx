import { FaMapMarkerAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { BiBed } from "react-icons/bi";
import { FaBath } from "react-icons/fa6";
import axios from "../Components/Utils/property/axios"
import toast, { Toaster } from 'react-hot-toast';


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
    proId:string;
}

const Mylistcard: React.FC<Props> = ({proId,title, location,bathrooms, bedrooms, date, image, price, approve }) => {


    const handleRemoveClick = async () => {
        try {
            const remove = await axios.post('/removeproperty', {postId:proId });
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
        <div className={`w-[80%] h-auto bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 overflow-hidden mt-20 ${!approve && 'bg-gray-900 bg-opacity-40 pointer-events-none relative'}`}>
            {!approve && (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white  text-red text-xl font-semibold bg-red-500 bg-opacity-80 ">
                     <h2 className="flex  font-semibold text-white text-[20px] sm:text-[28px] md:text-[28px] lg:text-[30px] ml-8  "> Waiting for admin approval...</h2>
                   
                </div>
            )}
            <div className=" flex flex-col sm:flex-row">
                <img className="object-cover w-full sm:w-2/6" src={image[0]} alt="" />

                <div className='w-full flex flex-col'>
                    <div className=' w-auto ml-2   sm:ml-10 '>
                        <h2 className="flex  font-semibold text-gray-900  text-[20px] sm:text-[28px] md:text-[28px] lg:text-[30px]  ">{title}</h2>
                    </div>
                    <div className='w-auto ml-2   sm:ml-10'>
                        <h2 className="font-semibold text-gray-900 text-[16px] sm:text-[28px] md:text-[24px] lg:text-[28px]  ">£{price}/month</h2>
                    </div>
                    <div className='w-auto ml-2 mt-3  flex flex-row sm:ml-10 sm:mt-2'>
                        <FaMapMarkerAlt className="w-3 h-3 mt-2 sm:mt-1.5 md:mt-3 " />
                        <h2 className="flex  justify-start font-semibold text-gray-900 text-[16px] sm:text-[28px] md:text-[24px] lg:text-[28px] ml-3 ">{location.locationName}</h2>
                    </div>
                    <div className="w-full  h-20 flex flex-row gap-4 sm:mt-6  ">
                        <div className='w-20 h-20  flex flex-col items-center'>
                            <BiBed color="#870e4d" fill="#870e4d" className=" w-[20px] h-[20px] mt-5" />
                            <h5 className="mb-2 text-sm  tracking-tight text-gray-900 mt-1">{bedrooms} Bed</h5>
                        </div>
                        <div className='w-20 h-20  flex flex-col items-center'>
                            <FaBath color="#870e4d" fill="#870e4d" className=" w-[20px] h-[20px] mt-5" />
                            <h5 className="mb-2 text-sm  tracking-tight text-gray-900 mt-1">{bathrooms}Bath</h5>
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
                <div className=" mr-5 flex items-center gap-5">
                    <button className="w-10 h-10 flex items-center  border rounded " onClick={handleRemoveClick} >
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

export default Mylistcard