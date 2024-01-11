import { useState, useRef, useEffect } from 'react'
import * as React from 'react';
import { FaRegImage } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
// import { IoVideocam } from "react-icons/io5";
import { IoShareSocialSharp } from "react-icons/io5";
// import { IoIosCall } from "react-icons/io";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdOutlineFavoriteBorder, MdFavorite } from "react-icons/md";
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { BiBed } from "react-icons/bi";
import { FaBath } from "react-icons/fa6";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useSelector } from "react-redux";
import axios from "../Components/Utils/user/axios";
import toast, { Toaster } from 'react-hot-toast';
import Map from './Map';
import {
    FacebookShareButton,
    FacebookIcon,
    TelegramIcon,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
    XIcon,
} from "react-share";

type RootState = {
    user: {
        value: {
            image: string | undefined;
            id: string | null;
            name: string | null;
            email: string | null;
            phone: string | null;
            access_token: string;
        };
    };
};

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



const Single_propertyDetails: React.FC<Props> = ({ title, proId, location, bathrooms, bedrooms, date, image, price, Id, buildYear, description, username, features, userimg, floorplans, document, openLoginModal, sellertype }) => {

    const navigate = useNavigate()
    const shareUrl = window.location.href;




    const [isExpanded1, setIsExpanded1] = useState(false);
    const [isExpanded2, setIsExpanded2] = useState(false);
    const [isExpanded4, setIsExpanded4] = useState(false);
    const [isExpanded5, setIsExpanded5] = useState(false);
    const [isExpanded3, setIsExpanded3] = useState(false);
    const [isExpanded6, setIsExpanded6] = useState(false);
    const [isExpanded7, setIsExpanded7] = useState(false);
    const [contentType, setContentType] = useState('image');
    const [isCallClicked, setIsCallClicked] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);


    const handleCallButtonClick = () => {
        const phoneNumber = userdata.id;

        if (phoneNumber) {

            setIsCallClicked(true);
        } else {

            setIsCallClicked(false);
            openLoginModal();
        }
    };



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








    const userdata = useSelector((state: RootState) => state.user.value);
    console.log(userdata.id);


    const handleemailClick = async () => {


        if (userdata.id) {

            navigate(`/email?Id=${proId}`)

        } else {

            openLoginModal();

        }

    }

    const handleSaveClick = async () => {

        setIsFavorite(!isFavorite);


        if (userdata.id) {
            try {
                const savejob = await axios.post('/save', { UserId: userdata.id, postId: proId });

                if (savejob.data.status == true) {

                    toast.success('Property Saved Successfully')



                } else {
                    toast.error("Already Saved This Property")


                }



            } catch (error) {

                console.error('Error Saving This job:', error);
            }



        } else {

            openLoginModal();

        }


    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleShareClick = () => {

        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    const originalDateString = buildYear;
    const dateObject = new Date(originalDateString);
    const formatted = dateObject.toLocaleString('en-US', options);


    return (

        <div className='w-full h-auto bg-[#f7f4fb] flex flex-col justify-center items-center '>
            <div className='w-[95%] sm:w-[80%] md:w-[80%] lg:w-[80%] h-auto mt-5 flex flex-col justify-center items-center '>
                <div className='w-full h-auto flex flex-col'>
                    <div className='w-full h-auto flex flex-col sm:flex-row'>
                        <div className='w-auto  sm:w-1/2 '>
                            <h2 className="flex font-semibold text-gray-900 ml-2  text-[20px] sm:text-[28px] md:text-[28px] lg:text-[30px]">
                                {title.toUpperCase()}
                            </h2>
                        </div>
                        <div className='w-1/2'>
                            {/*------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

                            <h2 className="flex sm:justify-end  font-semibold text-gray-900 ml-2  text-[16px] sm:text-[28px] md:text-[24px] lg:text-[28px] ">£{price} / month</h2>

                        </div>


                    </div>
                    <div className='w-full   flex flex-row justify-between  '>
                        <div className='w-auto  mt-3 sm:w-1/2 flex flex-row sm:ml-1 sm:mt-2 '>
                            <FaMapMarkerAlt className=" mt-1  " />
                            <h2 className="flex justify-start font-semibold text-[#6f6f6f] text-[14px] sm:text-[28px] md:text-[30px] lg:text-[18px] ml-1"> {location.locationName}</h2>

                        </div>
                        <div className='w-1/2 mt-3 flex flex-row gap-3 justify-end'>
                            <button className=" flex items-center   sm:ml-12  mt-1 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover: hover: duration-300 text-white" onClick={handleShareClick} >
                                <IoShareSocialSharp fill="#870e4d" className="w-6 h-6 ml-2 " />

                            </button>
                            {/* Modal */}
                            {isModalOpen && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                                    <div className="relative w-auto max-w-[90%] sm:max-w-md">

                                        <div className="relative flex flex-col w-full bg-white border rounded-md shadow-lg outline-none focus:outline-none">

                                            <button
                                                className="self-end p-2 text-sm font-semibold text-gray-500 hover:text-gray-700 focus:outline-none"
                                                onClick={closeModal}
                                            >
                                                <svg
                                                    className="w-3 h-3"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 14 14"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                                    />
                                                </svg>
                                            </button>

                                            <div className="p-4">
                                                <div style={{ display: 'grid', gridGap: '20px', gridTemplateColumns: 'repeat(auto-fill, 30px)', maxWidth: '200px', margin: '0 auto' }}>
                                                    <div style={{ textAlign: 'center' }}>
                                                        <FacebookShareButton
                                                            url={shareUrl}
                                                            className="inline-flex justify-content-center white-space-nowrap overflow-visible width-0 font-size-14px"
                                                        >
                                                            <FacebookIcon size={32} round />
                                                        </FacebookShareButton>
                                                    </div>
                                                    <div style={{ textAlign: 'center' }}>
                                                        <TwitterShareButton
                                                            url={shareUrl}

                                                            className="inline-flex justify-content-center white-space-nowrap overflow-visible width-0 font-size-14px"
                                                        >
                                                            <XIcon size={32} round />
                                                        </TwitterShareButton>
                                                    </div>
                                                    <div style={{ textAlign: 'center' }}>
                                                        <TelegramShareButton
                                                            url={shareUrl}

                                                            className="inline-flex justify-content-center white-space-nowrap overflow-visible width-0 font-size-14px"
                                                        >
                                                            <TelegramIcon size={32} round />
                                                        </TelegramShareButton>
                                                    </div>
                                                    <div style={{ textAlign: 'center' }}>
                                                        <WhatsappShareButton
                                                            url={shareUrl}

                                                            separator=":: "
                                                            className="inline-flex justify-content-center white-space-nowrap overflow-visible width-0 font-size-14px"
                                                        >
                                                            <WhatsappIcon size={32} round />
                                                        </WhatsappShareButton>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* End Modal */}
                            



                            <button className="w-auto  flex items-center  mr-1 mt-1" onClick={handleSaveClick}>
                                {isFavorite ? (
                                    <MdFavorite
                                        className="w-6 h-6 flex justify-center transition ease-in-out delay-150 hover:-translate-y-1  scale-110 hover:duration-300"
                                        fill="#870e4d"
                                    />
                                ) : (
                                    <MdOutlineFavoriteBorder
                                        className="w-6 h-6 flex justify-center transition ease-in-out delay-150 hover:-translate-y-1  scale-110 hover:duration-300"
                                        fill="#870e4d"
                                    />
                                )}
                            </button>
                        </div>

                    </div>
                </div>


                {/*-------------------------------------------------------------------img container---------------------------------------------------------------------------------------------- */}
                <div className='w-full h-auto shadow-md mt-3  mb-10 '>

                    {contentType === 'image' && (

                        <div className=' sm:w-full sm:h-auto bg-white'>
                            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                                {image.map((imageUrl, index) => (
                                    <SwiperSlide key={index}>
                                        <img className='w-full h-[300px] sm:h-[500px] object-cover ' src={imageUrl} alt={`Image ${index + 1}`} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>



                    )}
                    {contentType === 'location' && (
                        <div className="w-full h-[300px]  sm:h-[500px] bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 overflow-hidden ">
                            <Map location={location} />
                        </div>


                    )}
                    {/* {contentType === 'video' && (
                        <video className='w-full h-[300px] sm:h-[500px]' controls>
                            <source src={video} type='video/mp4' />
                            Your browser does not support the video tag.
                        </video>
                    )} */}
                    <div className='w-[150px] h-auto mt-3  flex flex-row gap-2 mb-5 '>
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
                            <h2 className="mt-3 font-semibold  font-sans text-gray-900 text-[22px] ml-5 ">Overview</h2>
                        </div>
                        <div className='w-full h-auto grid grid-cols-2 gap-3 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-1 gap-y-1 '>
                            <div className='w-40  h-30  flex flex-col items-center bg-white'>

                                <h5 className="mb-2 text-[14px] text-[#6f6f6f] font-sans  font-semibold tracking-tight  mt-1">Updated On</h5>
                                <h5 className="mb-5 text-[14px] text-[#6f6f6f] font-sans  font-semibold  tracking-tight ">{date}</h5>

                            </div>
                            {/* <div className='w-32  h-20  flex flex-col items-center bg-white'>

                                <MdMeetingRoom color="#870e4d" fill="#870e4d" className=" w-[20px] h-[20px] mt-5" />
                                <h5 className="mb-2 text-base font-sans  font-medium  tracking-tight text-gray-900 mt-1"> {room} Room</h5>

                            </div> */}
                            <div className='w-24  h-20  flex flex-col items-center bg-white'>

                                <FaBath color="#870e4d" fill="#870e4d" className=" w-[20px] h-[20px] mt-2 ml-3" />

                                <h5 className="mb-2 text-[14px] text-[#6f6f6f] font-sans  font-semibold  tracking-tight ml-3  mt-1">{bathrooms} Bathroom</h5>

                            </div>
                            <div className='w-24  h-20  flex flex-col items-center bg-white ml-5'>

                                <BiBed color="#870e4d" fill="#870e4d" className=" w-[20px] h-[20px] mt-2 ml-3" />
                                <h5 className="mb-2 text-[14px] text-[#6f6f6f] font-sans  font-semibold tracking-tight ml-3  mt-1">{bedrooms} Bedroom</h5>

                            </div>

                            {/* <div className='w-40  h-30  flex flex-col items-center bg-white'>

                                <h5 className="mb-2 text-base font-sans  font-medium tracking-tight text-gray-900 mt-1">Build Year</h5>
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
                                <h3 className='text-[14px] text-[#6f6f6f] font-sans  font-semibold m-5 text-justify'>
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

                                <div className="w-full h-[300px] bg-white  hover:bg-gray-100 overflow-hidden p-5">
                                    <Map location={location} />
                                </div>
                            </div>}

                        </div>


                        {/*------------------------------------------------------------------------floor plan------------------------------------------------------------------------------------------- */}









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
                                        <h5 className="mb-2 text-base font-sans  font-semibold  tracking-tight text-gray-900 mt-1">Price: £ {price}  / month</h5>
                                        <h5 className="mb-2 text-base font-sans  font-semibold  tracking-tight text-gray-900 mt-1"> Bedrooms:{bedrooms}</h5>
                                        <h5 className="mb-2 text-base font-sans  font-semibold  tracking-tight text-gray-900 mt-1">Year Built:{buildYear}</h5>

                                    </div>


                                </div>}

                        </div> */}

                        {/*----------------------------------------------------------------------------features--------------------------------------------------------------------------------------- */}
                        <div className='w-[96%] h-auto bg-white shadow-md rounded-md '>
                            <div className='flex items-center justify-between cursor-pointer h-20' onClick={handleToggle5}>
                                <h3 className='text-base font-sans  font-semibold ml-5'>Features</h3>
                                {isExpanded5 ? <FaChevronUp className="mr-5" /> : <FaChevronDown className="mr-5" />}
                            </div>
                            {isExpanded5 && <div className='mt-1 w-full h-auto flex flex-col mb-3'>
                                <div className="w-full h-auto ">
                                    <h5 className="mb-2 text-[20px] font-sans font-semibold ml-5 tracking-tight text-[#6f6f6f] mt-1">
                                        Interior Details
                                    </h5>
                                    <div className="w-full h-auto grid grid-cols-1 gap-3 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-1">
                                        {features?.interiorDetails.map((feature, index) => (
                                            <div key={index} className="flex flex-col ml-7 w-full">
                                                <li className=" text-[14px] text-gray-900 font-sans  font-semibold tracking-tight mt-3">{feature}</li>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className='w-full h-auto'>
                                    <h5 className="mb-2 text-[20px] font-sans  font-semibold ml-5  tracking-tight text-[#6f6f6f] mt-1">Outdoor Details</h5>
                                    <div className="w-full h-auto grid grid-cols-1 gap-3 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-1">
                                        {features?.outdoorDetails.map((feature, index) => (
                                            <div className='flex flex-row ml-7 w-full'>

                                                <li className=" text-[14px] text-gray-900 font-sans  font-semibold tracking-tight mt-3">{feature}</li>
                                            </div>

                                        ))}


                                    </div>

                                </div>
                                <div className='w-full h-auto'>
                                    <h5 className="mb-2 text-[20px] font-sans  font-semibold ml-5  tracking-tight text-[#6f6f6f] mt-1">Utilities</h5>
                                    <div className="w-full h-auto grid grid-cols-1 gap-3 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-1">
                                        {features?.utilities.map((feature, index) => (
                                            <div className='flex flex-row ml-7 w-full'>

                                                <li className=" text-[14px] text-gray-900 font-sans  font-semibold tracking-tight mt-3">{feature}</li>
                                            </div>

                                        ))}


                                    </div>

                                </div>
                                <div className='w-full h-auto'>
                                    <h5 className="mb-2 text-[20px] font-sans  font-semibold ml-5  tracking-tight  text-[#6f6f6f] mt-1">Other Features</h5>
                                    <div className="w-full h-auto grid grid-cols-1 gap-3 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-1">
                                        {features?.otherFeatures.map((feature, index) => (
                                            <div className='flex flex-row ml-7 w-full'>
                                                <li className=" text-[14px] text-gray-900 font-sans  font-semibold tracking-tight mt-3">{feature}</li>
                                            </div>

                                        ))}


                                    </div>

                                </div>
                            </div>}

                        </div>
                        <div className='w-[96%] h-auto bg-white shadow-md rounded-md'>
                            <div className='flex items-center justify-between cursor-pointer h-20' onClick={handleToggle7}>
                                <h3 className='text-base font-sans  font-semibold ml-5'>Floor Plan</h3>
                                {isExpanded7 ? <FaChevronUp className="mr-5" /> : <FaChevronDown className="mr-5" />}
                            </div>
                            {isExpanded7 && <div className='mt-1 w-full h-auto '>
                                <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-lg md:max-w-2xl flex justify-center pb-20">
                                    <img className="h-80 w-80   object-cover  p-4" src={floorplans} alt="Video Thumbnail" />

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
                <div className='sm:flex flex-row w-11/12 h-auto bg-white shadow-md mt-10 rounded-md mb-10  '>

                    <div className='flex justify-center'>
                        <img className=" w-[60px] h-[60px] bg-white border border-gray-200 rounded-lg shadow items-center m-6 " src={userimg} alt="Video Thumbnail" />

                    </div>

                    <div className='w-[300px] ml-5 h-60 mt-6 flex flex-col sm:ml-1'>
                        <h5 className="mb-2 text-base font-sans  font-semibold tracking-tight text-gray-900 mt-1">{username}</h5>
                        <h5 className="mb-2 text-base italic font-bold tracking-tight text-gray-900 mt-1">Seller Type: <span className='text-[#870e4d]'>{sellertype}</span></h5>
                        {/* <button onClick={handleCallButtonClick} className="mt-5 w-30 transition ease-in-out delay-150 bg-[#390b79] hover:-translate-y-1 hover:scale-110 hover:bg-[#870e4d] duration-300 text-white px-4 py-2 border rounded flex flex-row justify-center">
                            <IoIosCall className="w-5 h-5 ml-2 mt-0.5" />
                            {isCallClicked ? <span>{phone}</span> : <span>Call</span>}
                        </button> */}
                        <button className="mt-5 w-30 transition ease-in-out delay-150 bg-[#390b79] hover:-translate-y-1 hover:scale-110 hover:bg-[#870e4d] duration-300 text-white px-4 py-2 border rounded flex flex-row justify-center" onClick={handleemailClick} >
                            <MdOutlineMailOutline className="w-5 h-5 ml-2 mt-0.5" />
                            Send Email
                        </button>

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

export default Single_propertyDetails