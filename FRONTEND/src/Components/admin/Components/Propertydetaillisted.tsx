import React from 'react'
import { useState } from 'react'
import { FaRegImage } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoVideocam } from "react-icons/io5";
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { BiBed } from "react-icons/bi";
import { MdMeetingRoom } from "react-icons/md";
import { FaBath } from "react-icons/fa6";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import toast, { Toaster } from 'react-hot-toast';
import Map from '../../Map';
import axios from "../Utils/axios"
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
    Id: string;
    username: string;
    userimage: string;
    proId: string;
}



const Propertydetaillisted: React.FC<Props> = ({ title, proId, location, room, bathrooms, bedrooms, date, image, price, Id, description, username, features, userimg, floorplans, sellertype, email }) => {
    const navigate = useNavigate();
    const [isExpanded1, setIsExpanded1] = useState(false);
    const [isExpanded2, setIsExpanded2] = useState(false);
    const [isExpanded4, setIsExpanded4] = useState(false);
    const [isExpanded5, setIsExpanded5] = useState(false);
    const [isExpanded3, setIsExpanded3] = useState(false);
    const [isExpanded6, setIsExpanded6] = useState(false);
    const [isExpanded7, setIsExpanded7] = useState(false);
    const [contentType, setContentType] = useState('image');

   





    const handleToggle1 = () => {
        setIsExpanded1(!isExpanded1);
    };
    const handleToggle2 = () => {
        setIsExpanded2(!isExpanded2);
    };
    const handleToggle3 = () => {
        setIsExpanded3(!isExpanded3);
    };
    const handleToggle4 = () => {
        setIsExpanded4(!isExpanded4);
    };
    const handleToggle5 = () => {
        setIsExpanded5(!isExpanded5);
    };
    const handleToggle6 = () => {
        setIsExpanded6(!isExpanded6);
    };
    const handleToggle7 = () => {
        setIsExpanded7(!isExpanded7);

    };

    const handleButtonClick = (type: React.SetStateAction<string>) => {
        setContentType(type);
    };


    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    // const originalDateString = buildYear;
    // const dateObject = new Date(originalDateString);
    // const formatted = dateObject.toLocaleString('en-US', options);

   
  return (
    <div className='w-full h-auto bg-[#f7f4fb] flex flex-col justify-center items-center '>
    <div className='w-[95%] sm:w-[80%] md:w-[80%] lg:w-[80%] h-auto mt-10 flex flex-col justify-center items-center'>
        <div className='w-full h-auto flex flex-col'>
            <div className='w-full h-auto flex flex-col sm:flex-row'>
                <div className='w-1/2'>
                    <h2 className="flex  font-semibold text-gray-900 text-[32px] ">{title}</h2>

                </div>
                <div className='w-1/2'>
                    {/*------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

                    <h2 className="flex sm:justify-end  font-semibold text-gray-900 text-[32px] ">${price}/month</h2>

                </div>


            </div>
            <div className='w-full   flex flex-col sm:flex-row'>
                <div className='w-1/2 flex flex-row '>
                    <FaMapMarkerAlt className="mt-1.9 " />
                    <h2 className="flex  justify-start font-semibold text-gray-900 text-[18px] ml-3 "> {location.locationName}</h2>

                </div>


            </div>
        </div>


        {/*-------------------------------------------------------------------img container---------------------------------------------------------------------------------------------- */}
        <div className='w-full h-auto shadow-md mt-3  mb-10'>

            {contentType === 'image' && (




                <div className='w-full h-[600px] bg-black   '>
                    <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                        {image.map((imageUrl, index) => (
                            <SwiperSlide key={index}>
                                <img className='w-full h-[600px] object-fit' src={imageUrl} alt={`Image ${index + 1}`} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>



            )}
            {contentType === 'location' && (
                <div className="w-full h-[600px] bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 overflow-hidden ">
                    <Map location={location} />
                </div>


            )}
            {/* {contentType === 'video' && (
                <video className='w-full h-[500px]' controls>
                    <source src={video} type='video/mp4' />
                    Your browser does not support the video tag.
                </video>
            )} */}
            <div className='w-[150px] h-auto mt-3  flex flex-row gap-2 mb-5'>
                <button
                    className={`w-10 h-10 bg-black bg-opacity-50 text-white px-3 py-2 border rounded ml-1 ${contentType === 'image' ? 'border-blue-500' : ''
                        }`}
                    onClick={() => handleButtonClick('image')}
                >
                    <FaRegImage />
                </button>
                <button
                    className={`w-10 h-10 bg-black bg-opacity-50 text-white px-3 py-2 border rounded ${contentType === 'location' ? 'border-blue-500' : ''
                        }`}
                    onClick={() => handleButtonClick('location')}
                >
                    <FaMapMarkerAlt />
                </button>
                {/* <button
                    className={`w-10 h-10 bg-black bg-opacity-50 text-white px-3 py-2 border rounded ${contentType === 'video' ? 'border-blue-500' : ''
                        }`}
                    onClick={() => handleButtonClick('video')}
                >
                    <IoVideocam />
                </button> */}
            </div>
        </div>



        {/*--------------------------------------------------------------------overview----------------------------------------------------------------------------------------------- */}

        <div className='w-full h-auto  bg-white mt-10  shadow-md'>
            <div className='w-full h-auto flex flex-col'>
                <div className='w-full h-16'>
                    <h2 className="mt-3 font-semibold text-gray-900 text-[24px] ml-3 ">overview</h2>
                </div>
                <div className='w-full h-auto grid grid-cols-2 gap-3 gap-x-6 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-8 gap-y-8 '>
                    <div className='w-40  h-30  flex flex-col items-center bg-white'>

                        <h5 className="mb-2 text-base font-sans  font-medium tracking-tight text-gray-900 mt-1">Updated On:</h5>
                        <h5 className="mb-5 text-base font-sans  font-medium  tracking-tight text-gray-900 mt-1  ml-10">{date}</h5>

                    </div>
                    {/* <div className='w-32  h-20  flex flex-col items-center bg-white'>

                        <MdMeetingRoom color="red" fill="red" className=" w-[20px] h-[20px] mt-5" />
                        <h5 className="mb-2 text-base font-sans  font-medium  tracking-tight text-gray-900 mt-1"> {room}Rooms</h5>

                    </div> */}
                    <div className='w-32  h-20  flex flex-col items-center bg-white'>

                        <FaBath color="red" fill="red" className=" w-[20px] h-[20px] mt-5" />

                        <h5 className="mb-2 text-base font-sans  font-medium  tracking-tight text-gray-900 mt-1">{bathrooms} Bedrooms</h5>

                    </div>
                    <div className='w-32  h-20  flex flex-col items-center bg-white'>

                        <BiBed color="red" fill="red" className=" w-[20px] h-[20px] mt-5" />
                        <h5 className="mb-2 text-base font-sans  font-medium  tracking-tight text-gray-900 mt-1">{bedrooms} Bathrooms</h5>

                    </div>

                    {/* <div className='w-40  h-30  flex flex-col items-center bg-white'>

                        <h5 className="mb-2 text-base font-sans  font-medium tracking-tight text-gray-900 mt-1">Build year:</h5>
                        <h5 className="mb-5 text-base font-sans  font-medium  tracking-tight text-gray-900 mt-1  ml-10">{formatted}</h5>

                    </div> */}
                </div>
            </div>
        </div>
        {/*------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}


        {/*----------------------------------------------------------------------------description--------------------------------------------------------------------------------------- */}

        <div className='w-full h-auto flex flex-col sm:flex-row mt-6 ml-5'>
            <div className='w-full sm:w-2/4 h-auto  flex flex-col gap-5 mb-5 '>

                <div className='w-[96%] h-auto bg-white shadow-md rounded-md'>
                    <div className='flex items-center justify-between cursor-pointer h-20' onClick={handleToggle1}>
                        <h3 className='text-base font-sans  font-semibold ml-5'>Description</h3>
                        {isExpanded1 ? <FaChevronUp className="mr-5" /> : <FaChevronDown className="mr-5" />}
                    </div>
                    {isExpanded1 && <div className='mt-1 w-full h-auto bg-white'>
                        <h3 className='text-base font-sans  font-semibold m-10'>
                            {description}
                        </h3>

                    </div>}

                </div>
                {/*-------------------------------------------------------------------------property document------------------------------------------------------------------------------------------ */}





                {/*-----------------------------------------------------------------map-------------------------------------------------------------------------------------------------- */}
                <div className='w-[96%] h-auto bg-white shadow-md rounded-md'>
                    <div className='flex items-center justify-between cursor-pointer h-20' onClick={handleToggle3}>
                        <h3 className='text-base font-sans  font-semibold ml-5'>Map</h3>
                        {isExpanded3 ? <FaChevronUp className="mr-5" /> : <FaChevronDown className="mr-5" />}
                    </div>
                    {isExpanded3 && <div className='mt-1 w-full h-auto'>

                        <div className="w-full h-[400px] bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 overflow-hidden mt-20">
                            <Map location={location} />
                        </div>
                    </div>}

                </div>


                {/*------------------------------------------------------------------------floor plan------------------------------------------------------------------------------------------- */}



                <div className='w-[96%] h-auto bg-white shadow-md rounded-md'>
                    <div className='flex items-center justify-between cursor-pointer h-20' onClick={handleToggle7}>
                        <h3 className='text-base font-sans  font-semibold ml-5'>Floor Plans</h3>
                        {isExpanded7 ? <FaChevronUp className="mr-5" /> : <FaChevronDown className="mr-5" />}
                    </div>
                    {isExpanded7 && <div className='mt-1 w-full h-auto '>
                        <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-lg md:max-w-2xl flex justify-center pb-32">
                            <img className="h-80 w-80   object-cover  p-4" src={floorplans} alt="Video Thumbnail" />

                        </div>
                    </div>}

                </div>





            </div>
            {/*------------------------------------------------------------------modale end------------------------------------------------------------------------------------------------- */}

            <div className='w-full sm:w-2/4 h-auto  flex flex-col gap-5 mb-5 '>

                {/*-----------------------------------------------------------------------details-------------------------------------------------------------------------------------------- */}
                {/* <div className='w-[96%] h-auto bg-white shadow-md rounded-md'>
                    <div className='flex items-center justify-between cursor-pointer h-20' onClick={handleToggle4}>
                        <h3 className='text-base font-sans  font-semibold ml-5'>Details</h3>
                        {isExpanded4 ? <FaChevronUp className="mr-5" /> : <FaChevronDown className="mr-5" />}
                    </div>
                    {isExpanded4 &&
                        <div className='mt-1 w-full h-auto  flex flex-col sm:flex-row'>
                            <div className='w-1/2 h-40  flex flex-col ml-5'>

                                <h5 className="mb-2 text-base font-sans  font-semibold tracking-tight text-gray-900 mt-1">Rooms: {room}</h5>
                                <h5 className="mb-2 text-base font-sans  font-semibold  tracking-tight text-gray-900 mt-1">Bathrooms: {bathrooms}</h5>
                                <h5 className="mb-2 text-base font-sans  font-semibold  tracking-tight text-gray-900 mt-1 ">Available from:{date}</h5>



                            </div>
                            <div className='w-1/2 h-40  flex flex-col ml-5 '>
                                <h5 className="mb-2 text-base font-sans  font-semibold  tracking-tight text-gray-900 mt-1">Price: {price} ¥ / month</h5>
                                <h5 className="mb-2 text-base font-sans  font-semibold  tracking-tight text-gray-900 mt-1"> Bedrooms:{bedrooms}</h5>
                                <h5 className="mb-2 text-base font-sans  font-semibold  tracking-tight text-gray-900 mt-1">Year Built:{buildYear}</h5>

                            </div>


                        </div>}

                </div> */}

                {/*----------------------------------------------------------------------------features--------------------------------------------------------------------------------------- */}
                <div className='w-[96%] h-auto bg-white shadow-md rounded-md'>
                    <div className='flex items-center justify-between cursor-pointer h-20' onClick={handleToggle5}>
                        <h3 className='text-base font-sans  font-semibold ml-5'>Features</h3>
                        {isExpanded5 ? <FaChevronUp className="mr-5" /> : <FaChevronDown className="mr-5" />}
                    </div>
                    {isExpanded5 && <div className='mt-1 w-full h-auto flex flex-col'>
                        <div className='w-full h-auto'>
                            <h5 className="mb-2 text-lg font-sans  font-semibold ml-5  tracking-tight text-gray-900 mt-1">Interior Details</h5>
                            <div className='w-full h-auto grid grid-cols-1 gap-3 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8 gap-y-8 '>

                                {features?.interiorDetails.map((feature, index) => (
                                    <div className='flex flex-row ml-5'>

                                        <h5 className="mb-2 text-base font-sans font-medium  tracking-tight text-gray-900 mt-3">{feature}</h5>
                                    </div>

                                ))}

                            </div>


                        </div>
                        <div className='w-full h-auto'>
                            <h5 className="mb-2 text-lg font-sans  font-semibold ml-5  tracking-tight text-gray-900 mt-1">Outdoor Details</h5>
                            <div className='w-full h-auto grid grid-cols-1 gap-3 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8 gap-y-8 '>
                                {features?.outdoorDetails.map((feature, index) => (
                                    <div className='flex flex-row ml-5'>

                                        <h5 className="mb-2 text-base font-sans font-medium  tracking-tight text-gray-900 mt-3">{feature}</h5>
                                    </div>

                                ))}


                            </div>

                        </div>
                        <div className='w-full h-auto'>
                            <h5 className="mb-2 text-lg font-sans  font-semibold ml-5  tracking-tight text-gray-900 mt-1">Utilities</h5>
                            <div className='w-full h-auto grid grid-cols-1 gap-3 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8 gap-y-8 '>
                                {features?.utilities.map((feature, index) => (
                                    <div className='flex flex-row ml-5'>

                                        <h5 className="mb-2 text-base font-sans font-medium  tracking-tight text-gray-900 mt-3">{feature}</h5>
                                    </div>

                                ))}


                            </div>

                        </div>
                        <div className='w-full h-auto'>
                            <h5 className="mb-2 text-lg font-sans  font-semibold ml-5  tracking-tight text-gray-900 mt-1">Other Features</h5>
                            <div className='w-full h-auto grid grid-cols-1 gap-3 gap-x-3 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-3 gap-y-3 '>
                                {features?.otherFeatures.map((feature, index) => (
                                    <div className='flex flex-row ml-5'>
                                        <h5 className="mb-2 text-base font-sans font-medium  tracking-tight text-gray-900 mt-3">{feature}</h5>
                                    </div>

                                ))}


                            </div>

                        </div>
                    </div>}

                </div>

                {/*------------------------------------------------------------------------video------------------------------------------------------------------------------------------- */}
                {/* <div className='w-[96%] h-auto bg-white shadow-md rounded-md'>
                    <div className='flex items-center justify-between cursor-pointer h-20' onClick={handleToggle6}>
                        <h3 className='text-base font-sans  font-semibold ml-5'>Video</h3>
                        {isExpanded6 ? <FaChevronUp className="mr-5" /> : <FaChevronDown className="mr-5" />}
                    </div>
                    {isExpanded6 && <div className='mt-1 w-full h-auto'>
                        <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-lg md:max-w-2xl">
                            <video className='w-full h-[500px] p-10' controls>
                                <source src={video} type='video/mp4' />
                                Your browser does not support the video tag.
                            </video>

                        </div>

                    </div>}

                </div> */}

                {/*---------------------------------------------------------------Contact ---------------------------------------------------------------------------------------------------- */}
            </div>
        </div>
        <div className=' sm:flex w-11/12 h-auto bg-white shadow-md mt-10 rounded-md mb-10 flex flex-row'>

            <img className="w-60 h-60 bg-white border border-gray-200 rounded-lg shadow items-center m-6 object-cover" src={userimg} alt="Video Thumbnail" />

            <div className='w-[300px] h-60 mt-6 flex flex-col'>
                <h5 className="mb-2 text-base font-sans  font-semibold tracking-tight text-gray-900 mt-1">{username}</h5>
                <h5 className="mb-2 text-base font-sans  font-semibold tracking-tight text-gray-900 mt-1">Seller Type: {sellertype}</h5>
                <h5 className="mb-2 text-base font-sans  font-semibold tracking-tight text-gray-900 mt-1">{email}</h5>
               

            </div>
        </div>
        {/*---------------------------------------------------------------Contact end---------------------------------------------------------------------------------------------------- */}


    </div>
    <Toaster
        position="bottom-center"
        reverseOrder={false}
    />

</div>
  )
}

export default Propertydetaillisted