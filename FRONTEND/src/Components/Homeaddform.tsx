import React, { useState, useEffect, useRef } from 'react';
import Progressbar from './AddyourHome/Progressbar';
import img1 from '../assets/formimg.png'
import img2 from '../assets/9819701_12796.jpg'
import img3 from '../assets/contact-img.png'
import img4 from '../assets/img2.webp'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CgGym } from 'react-icons/cg';
import { TbToolsKitchen2 } from 'react-icons/tb';
import { GiWashingMachine } from 'react-icons/gi';
import { RiComputerLine } from 'react-icons/ri';
import { GiFlowerPot } from 'react-icons/gi';
import { IoIosBasketball } from 'react-icons/io';
import { FaHome } from 'react-icons/fa';
import { LuParkingCircle } from 'react-icons/lu';
import { MdBathtub } from 'react-icons/md';
import { PiSwimmingPool } from 'react-icons/pi';
import { FaRegSnowflake } from 'react-icons/fa';
import { MdElectricalServices } from 'react-icons/md';
import { MdOutlineHeatPump } from 'react-icons/md';
import { GiGasStove } from 'react-icons/gi';
import { IoMdVideocam } from 'react-icons/io';
import Location from './AddyourHome/Location';


const Homeaddform = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const nextStep = () => {
        setCurrentStep((prevStep) => prevStep + 1);
    };

    const prevStep = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };



    const placeTypes = [
        { name: 'BOX ROOM', logo: '🏡' },
        { name: 'BEDSIT', logo: '🛌' },
        { name: 'STUDIO', logo: '🛋️' },
        { name: 'SINGLE ROOM', logo: '🏡' },
        { name: 'DOUBLE ROOM', logo: '🛌' },
        { name: 'RENT HOUSE', logo: '🛋️' },
        { name: 'ONE BED', logo: '🏡' },
        { name: 'TWO BED', logo: '🛌' },
        { name: 'MORE THAN TWO BED', logo: '🛋️' },
    ];

    const [selectedPlaceType, setSelectedPlaceType] = useState('');

    const handlePlaceTypeSelection = (placeType: string) => {
        setSelectedPlaceType(placeType);
        console.log(selectedPlaceType);


    };
    {/*-------------------------------------------------------------------    Type    ---------------------------------------------------------------------------------------------- */ }


    const mapRef = useRef(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDVjVkjSGk0vLPYMFTiORZEBJYV6_URgK8&libraries=places`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        script.onload = () => {
            initMap();
        };

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    const initMap = () => {
        const sydney = new window.google.maps.LatLng(-33.867, 151.195);

        const map = new window.google.maps.Map(mapRef.current, {
            center: sydney,
            zoom: 15,
        });

        const input = document.getElementById("search-input");
        const searchBox = new window.google.maps.places.SearchBox(input);

        map.addListener("bounds_changed", () => {
            searchBox.setBounds(map.getBounds());
        });

        const markers: any[] = [];

        searchBox.addListener("places_changed", () => {
            const places = searchBox.getPlaces();

            if (places.length === 0) {
                return;
            }

            markers.forEach((marker) => {
                marker.setMap(null);
            });

            const bounds = new window.google.maps.LatLngBounds();
            places.forEach((place: { geometry: { location: { toJSON: () => any; }; viewport: any; }; name: any; }) => {
                if (!place.geometry || !place.geometry.location) {
                    console.log("Returned place contains no geometry");
                    return;
                }

                const marker = new window.google.maps.Marker({
                    map,
                    position: place.geometry.location,
                });

                markers.push(marker);

                window.google.maps.event.addListener(marker, "click", () => {
                    
                    const coordinates = place.geometry.location.toJSON();
                    const locationName = place.name;

                    console.log("Coordinates: ", coordinates);
                    console.log("Location Name: ", locationName);
                });

                if (place.geometry.viewport) {
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });

            map.fitBounds(bounds);
        });
    };
    {/*-------------------------------------------------------------------location---------------------------------------------------------------------------------------------- */ }

    const [bedrooms, setBedrooms] = useState(1);
    const [bathrooms, setBathrooms] = useState(1);
    const [rooms, setRooms] = useState(1);
    const [buildYear, setBuildYear] = useState(null);


    const handleIncrement = (field: string) => {
        if (field === 'bedrooms') {
            setBedrooms((prevValue) => prevValue + 1);
        } else if (field === 'bathrooms') {
            setBathrooms((prevValue) => prevValue + 1);
        } else if (field === 'rooms') {
            setRooms((prevValue) => prevValue + 1);
        }
    };

    const handleDecrement = (field: string) => {
        if (field === 'bedrooms' && bedrooms > 1) {
            setBedrooms((prevValue) => prevValue - 1);
        } else if (field === 'bathrooms' && bathrooms > 1) {
            setBathrooms((prevValue) => prevValue - 1);
        } else if (field === 'rooms' && rooms > 1) {
            setRooms((prevValue) => prevValue - 1);
        }
    };

    {/*-------------------------------------------------------------------rooms---------------------------------------------------------------------------------------------- */ }



    const [selectedFeatures, setSelectedFeatures] = useState({
        interiorDetails: [],
        outdoorDetails: [],
        utilities: [],
        otherFeatures: [],
    });

    const placeTypes0 = [
        { name: 'Gym', logo: <CgGym /> },
        { name: 'Equipped Kitchen', logo: <TbToolsKitchen2 /> },
        { name: 'Laundry', logo: <GiWashingMachine /> },
        { name: 'Media Room', logo: <RiComputerLine /> },
    ];

    const placeTypes1 = [
        { name: 'Back yard', logo: <GiFlowerPot /> },
        { name: 'Basketball court', logo: <IoIosBasketball /> },
        { name: 'Front yard', logo: <FaHome /> },
        { name: 'Garage Attached', logo: <LuParkingCircle /> },
        { name: 'Hot Bath', logo: <MdBathtub /> },
        { name: 'Pool', logo: <PiSwimmingPool /> },
    ];
    const placeTypes2 = [
        { name: 'Central Air', logo: <FaRegSnowflake /> },
        { name: 'Electricity', logo: <MdElectricalServices /> },
        { name: 'Heating', logo: <MdOutlineHeatPump /> },
        { name: 'Natural Gas', logo: <GiGasStove /> },
        { name: 'Ventilation', logo: '🛌' },
        { name: 'Water', logo: '🛋️' },
    ];
    const placeTypes3 = [
        { name: 'Chair Accessible', logo: <CgGym /> },
        { name: 'Accessible Elevator', logo: '🛌' },
        { name: 'Fireplace', logo: '🛋️' },
        { name: 'Smoke detectors', logo: '🏡' },
        { name: 'Washer and dryer', logo: '🛌' },
        { name: 'WiFi', logo: '🛋️' },
    ];

    const handleFeatureToggle = (category, featureName) => {

        const updatedFeatures = { ...selectedFeatures };
        console.log('Selected Features:', updatedFeatures);


        if (updatedFeatures[category].includes(featureName)) {
            updatedFeatures[category] = updatedFeatures[category].filter(
                (name) => name !== featureName
            );
        } else {
            updatedFeatures[category] = [...updatedFeatures[category], featureName];
        }


        setSelectedFeatures(updatedFeatures);
    };
    {/*-------------------------------------------------------------------features---------------------------------------------------------------------------------------------- */ }


    const [selectedImages, setSelectedImages] = useState([]);
    const [error, setError] = useState('');

    const isValidImage = (file) => {
        const allowedTypes = ['image/jpeg', 'image/png'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!allowedTypes.includes(file.type)) {
            setError('Please select a valid image file (JPEG or PNG).');
            return false;
        }

        if (file.size > maxSize) {
            setError('Selected image size exceeds the maximum allowed (5MB).');
            return false;
        }

        return true;
    };

    const handleImageChange = (event) => {
        const files = event.target.files;
        const newImages = [];

        setError('');

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            if (isValidImage(file)) {
                newImages.push(file);
            } else {
                // Handle validation error
            }
        }

        setSelectedImages([...selectedImages, ...newImages]);
    };
    {/*-------------------------------------------------------------------img ---------------------------------------------------------------------------------------------- */ }


    const [selectedVideo, setSelectedVideo] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);

    const handleVideoChange = (event) => {
        const file = event.target.files[0];

        // Update state with the selected video
        setSelectedVideo(file);

        // Create a preview URL for the video
        const previewURL = URL.createObjectURL(file);
        setVideoPreview(previewURL);
    };

    {/*-------------------------------------------------------------------video---------------------------------------------------------------------------------------------- */ }


    const [selectedDocument, setSelectedDocument] = useState(null);
    const [submitDocuments, setSubmitDocuments] = useState(false);
    const [selectedFloorPlans, setSelectedFloorPlans] = useState([]);
    const [submitfloorplan, setSubmitfloorplan] = useState(false);

    const handleDocumentSubmissionChange = (event) => {
        setSubmitDocuments(event.target.value === 'yes');
    };
    const handleImageSubmissionChange = (event) => {
        setSubmitfloorplan(event.target.value === 'yes');
    };

    const handleImageChange1 = (event, fileType) => {
        const files = event.target.files;

        if (fileType === 'document') {
            setSelectedDocument(files[0]);
        } else if (fileType === 'floorPlan') {
            setSelectedFloorPlans([...selectedFloorPlans, ...files]);
        }
    };
    {/*-------------------------------------------------------------------floor plan---------------------------------------------------------------------------------------------- */ }

    const [title, setTitle] = useState('');

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    {/*-------------------------------------------------------------------title---------------------------------------------------------------------------------------------- */ }


    const [description, setDescription] = useState('');

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);

    };
    {/*-------------------------------------------------------------------description---------------------------------------------------------------------------------------------- */ }





    {/*-------------------------------------------------------------------price---------------------------------------------------------------------------------------------- */ }


   


    return (
        <div className='bg-white'>
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="flex flex-col h-auto w-full">


                    {currentStep === 1 && (
                        <div>
                            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8  flex flex-col sm:flex-row ">
                                <div className='w-full sm:w-1/2 h-auto sm:flex flex-col '>
                                    <h2 className="flex  font-semibold text-gray-900 text-[48px]  justify-center  ">It’s easy to get <br></br>started on Getmyroom</h2>

                                </div>
                                <div className='w-full sm:w-1/2 h-auto sm:flex flex-col'>
                                    <div className='flex flex-col items-center  shadow md:flex-row  h-38 bg-white w-full'  >
                                        <div className="flex flex-col justify-between p-4 leading-normal">
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">1  Tell us about your place</h5>
                                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 20</p>
                                        </div>
                                        <img className="object-cover  rounded-t-lg h-20 md:h-24 md:w-28 md:rounded-none md:rounded-s-lg" src={img1} alt=""></img>

                                    </div>
                                    <hr className="border-t border-gray-300  " />
                                    <div className='flex flex-col items-center  shadow md:flex-row  h-38 bg-white w-full'  >
                                        <div className="flex flex-col justify-between p-4 leading-normal">
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">2 Make it stand out</h5>
                                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 20</p>
                                        </div>
                                        <img className="object-cover  rounded-t-lg h-20 md:h-24 md:w-28 md:rounded-none md:rounded-s-lg" src={img4} alt=""></img>

                                    </div>
                                    <hr className="border-t border-gray-300  " />
                                    <div className='flex flex-col items-center  shadow md:flex-row  h-38 bg-white w-full'  >
                                        <div className="flex flex-col justify-between p-4 leading-normal">
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">3  Tell us about your features</h5>
                                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 20</p>
                                        </div>
                                        <img className="object-cover  rounded-t-lg h-20 md:h-24 md:w-28 md:rounded-none md:rounded-s-lg" src={img3} alt=""></img>

                                    </div>
                                    <hr className="border-t border-gray-300  " />
                                    <div className='flex flex-col items-center  shadow md:flex-row  h-38 bg-white w-full'  >
                                        <div className="flex flex-col justify-between p-4 leading-normal">
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">4 Finish up and publish</h5>
                                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Choose if you'd like to start with an experienced guest, set a starting price and publish your listing.</p>
                                        </div>
                                        <img className="object-cover  rounded-t-lg h-20 md:h-24 md:w-28 md:rounded-none md:rounded-s-lg" src={img2} alt=""></img>

                                    </div>
                                    <hr className="border-t border-gray-300  " />
                                </div>


                            </div>
                        </div>

                    )}

                    {currentStep === 2 && (
                        <div>
                           
                                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8  flex flex-col sm:flex-row mt-10">
                                    <div className='w-full sm:w-1/2 h-[400px] sm:flex flex-col '>
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-10">Step 1</h5>
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Tell us about your place</h5>
                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">In this step, we'll ask you which type of property you have and if<br></br> guests will book the entire place or just a room. Then let us<br></br> know the location and how many guests can stay.</p>
                                    </div>
                                    <div className="w-full sm:w-1/2 h-auto sm:flex flex-col">
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white p-3">
                                            What type of place will guests have?
                                        </h5>
                                        <div className="flex flex-col gap-2 p-3">
                                            {placeTypes.map((placeType, index) => (
                                                <button
                                                    key={index}
                                                    className={`flex items-center justify-between px-4 py-2 bg-white border ${selectedPlaceType === placeType.name
                                                        ? 'border-blue-500'
                                                        : 'border-gray-300'
                                                        } rounded-lg focus:outline-none focus:border-black h-20`}
                                                    onClick={() => handlePlaceTypeSelection(placeType.name)}
                                                >
                                                    <span className="text-base">{placeType.name}</span>
                                                    <span className="text-lg">{placeType.logo}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                           
                        </div>

                    )}

                    {currentStep === 3 && (
                        <div>
                            <Location/>
                        </div>

                    )}
                    {currentStep === 4 && (
                        <div>
                            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8  flex flex-col sm:flex-row mt-10  ">
                                <div className='w-full sm:w-full h-auto sm:flex flex-col'>
                                    <h5 className="mb-2 text-[36px] font-bold tracking-tight text-gray-900 dark:text-white">Let's start with the basics</h5>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">How many people can stay here?</p>
                                    <div className="flex justify-between items-center mb-4 w-full h-24 ">
                                        <label className="mr-4">Rooms:</label>
                                        <div>
                                            <button className="rounded-full px-4 py-2 border border-gray-300 hover:border-black" onClick={() => handleDecrement('rooms')}>-</button>
                                            <span className="mx-2 p-2">{rooms}</span>
                                            <button className="rounded-full px-4 py-2 border border-gray-300 hover:border-black" onClick={() => handleIncrement('rooms')}>+</button>

                                        </div>

                                    </div>
                                    <div className="flex justify-between items-center mb-4 w-full h-24 ">
                                        <label className="mr-4">Bedrooms:</label>
                                        <div>
                                            <button className="rounded-full px-4 py-2 border border-gray-300 hover:border-black" onClick={() => handleDecrement('bedrooms')}>-</button>
                                            <span className="mx-2 p-2">{bedrooms}</span>
                                            <button className="rounded-full px-4 py-2 border border-gray-300 hover:border-black" onClick={() => handleIncrement('bedrooms')}>+</button>

                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between w-full h-24">
                                        <label className="mr-4">Bathrooms:</label>
                                        <div>
                                            <button className="rounded-full px-4 py-2 border border-gray-300 hover:border-black" onClick={() => handleDecrement('bathrooms')}>-</button>
                                            <span className="mx-2 p-2">{bathrooms}</span>
                                            <button className="rounded-full px-4 py-2 border border-gray-300 hover:border-black" onClick={() => handleIncrement('bathrooms')}>+</button>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mb-4 w-full h-24">
                                        <label className="mr-4">Year of Build:</label>
                                        <DatePicker
                                            selected={buildYear}
                                            onChange={(date: React.SetStateAction<null>) => setBuildYear(date)}
                                            showYearDropdown
                                            dateFormat="yyyy"
                                            className="rounded-full px-1 py-2 border border-gray-300 hover:border-black"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    )}

                    {currentStep === 5 && (

                        <div>
                            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8  flex flex-col sm:flex-row mt-10  justify-center ">
                                <div className="w-full sm:w-[70%] h-auto sm:flex flex-col ">
                                    <h5 className="mb-2 text-[36px] font-bold tracking-tight text-gray-900 dark:text-white">
                                        Tell guests what your place has to offer
                                    </h5>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                        You can add more amenities after you publish your listing.
                                    </p>

                                    <div className="w-full h-auto mt-5">
                                        <h5 className="mb-2 text-[26px] font-bold tracking-tight text-gray-900 dark:text-white">
                                            Interior Details
                                        </h5>
                                        <div className="container m-auto grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
                                            {placeTypes0.map((placeType, index) => (
                                                <button
                                                    key={index}
                                                    className={`flex items-center justify-between px-4 py-2 bg-white border ${selectedFeatures.interiorDetails.includes(placeType.name)
                                                        ? 'border-blue-500'
                                                        : 'border-gray-300'
                                                        } rounded-lg focus:outline-none focus:border-black h-20`}
                                                    onClick={() =>
                                                        handleFeatureToggle('interiorDetails', placeType.name)
                                                    }
                                                >
                                                    <span className="text-base">{placeType.name}</span>
                                                    <span className="text-lg">{placeType.logo}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="w-full h-auto mt-5 ">
                                        <h5 className="mb-2 text-[26px] font-bold tracking-tight text-gray-900 dark:text-white">
                                            Outdoor Details
                                        </h5>
                                        <div className="container m-auto grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
                                            {placeTypes1.map((placeType, index) => (
                                                <button
                                                    key={index}
                                                    className={`flex items-center justify-between px-4 py-2 bg-white border ${selectedFeatures.outdoorDetails.includes(placeType.name)
                                                        ? 'border-blue-500'
                                                        : 'border-gray-300'
                                                        } rounded-lg focus:outline-none focus:border-black h-20`}
                                                    onClick={() =>
                                                        handleFeatureToggle('outdoorDetails', placeType.name)
                                                    }
                                                >
                                                    <span className="text-base">{placeType.name}</span>
                                                    <span className="text-lg">{placeType.logo}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="w-full h-auto mt-5">
                                        <h5 className="mb-2 text-[26px] font-bold tracking-tight text-gray-900 dark:text-white">
                                            Utilities
                                        </h5>
                                        <div className="container m-auto grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
                                            {placeTypes2.map((placeType, index) => (
                                                <button
                                                    key={index}
                                                    className={`flex items-center justify-between px-4 py-2 bg-white border ${selectedFeatures.utilities.includes(placeType.name)
                                                        ? 'border-blue-500'
                                                        : 'border-gray-300'
                                                        } rounded-lg focus:outline-none focus:border-black h-20`}
                                                    onClick={() =>
                                                        handleFeatureToggle('utilities', placeType.name)
                                                    }
                                                >
                                                    <span className="text-base">{placeType.name}</span>
                                                    <span className="text-lg">{placeType.logo}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="w-full h-auto mt-5">
                                        <h5 className="mb-2 text-[26px] font-bold tracking-tight text-gray-900 dark:text-white">
                                            Other Features
                                        </h5>
                                        <div className="container m-auto grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
                                            {placeTypes3.map((placeType, index) => (
                                                <button
                                                    key={index}
                                                    className={`flex items-center justify-between px-4 py-2 bg-white border ${selectedFeatures.otherFeatures.includes(placeType.name)
                                                        ? 'border-blue-500'
                                                        : 'border-gray-300'
                                                        } rounded-lg focus:outline-none focus:border-black h-20`}
                                                    onClick={() =>
                                                        handleFeatureToggle('otherFeatures', placeType.name)
                                                    }
                                                >
                                                    <span className="text-base">{placeType.name}</span>
                                                    <span className="text-lg">{placeType.logo}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    )}
                    {currentStep === 6 && (


                        <div>
                            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 flex flex-col sm:flex-row mt-10 ">
                                <div className='w-full sm:w-1/2 h-[400px] sm:flex flex-col '>
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-10">Step 3</h5>
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Tell us about your features</h5>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">In this step, we'll ask you which type of property you have and if<br></br> guests will book the entire place or just a room. Then let us<br></br> know the location and how many guests can stay.</p>
                                </div>
                                <div className='w-full sm:w-1/2 h-auto sm:flex flex-col'>
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white p-3">Add some photos of your house</h5>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">You'll need 5 photos to get started. You can add more or make changes later.</p>
                                    <div className="flex flex-col gap-2 p-3 border-dotted border-2 border-gray-300">
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <div key={index} className="relative">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    className="border border-dashed border-gray-300 p-2 rounded-md h-44"
                                                />
                                                {selectedImages[index] && (
                                                    <img
                                                        src={URL.createObjectURL(selectedImages[index])}
                                                        alt={`Preview ${index + 1}`}
                                                        className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    {error && (
                                        <div className="text-red-500 mt-2">
                                            <p>{error}</p>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>

                    )}

                    {currentStep === 7 && (
                        <div>
                            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8  flex flex-col sm:flex-row mt-10 justify-center">
                                <div className="w-full sm:w-1/2 h-[500px] sm:flex flex-col items-center">
                                    <h5 className="mb-2 text-[36px] font-bold tracking-tight text-gray-900 dark:text-white">
                                        Add some photos of your house
                                    </h5>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                        You'll need one video to get started. You can add more or make changes later.
                                    </p>
                                    <div className="flex flex-col items-center gap-2 p-3 border-dotted border-2 border-gray-300">
                                        <label htmlFor="videoInput" className="flex items-center cursor-pointer">
                                            <IoMdVideocam className="text-4xl mr-2" />
                                            <span className="text-lg font-medium text-gray-700 dark:text-gray-400">
                                                Select Video
                                            </span>
                                        </label>
                                        <input
                                            type="file"
                                            id="videoInput"
                                            accept="video/*"
                                            onChange={handleVideoChange}
                                            className="hidden"
                                        />
                                    </div>
                                    {videoPreview && (
                                        <div className="mt-4 mb-10">
                                            <video width="320" height="240" controls>
                                                <source src={videoPreview} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                    )}
                    {currentStep === 8 && (
                        <div>
                            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 flex flex-col sm:flex-row mt-10 ">
                                <div className="w-full sm:w-1/2 h-[400px] sm:flex flex-col pr-5">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white p-3">Add Document of your house</h5>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">You'll need 2 photos to get started. You can add more or make changes later.</p>
                                    <div className="flex flex-col gap-2 p-3 border-dotted border-2 border-gray-300">
                                        <div className="flex items-center mb-2">
                                            <input
                                                type="radio"
                                                id="submitYes"
                                                name="submitDocuments"
                                                value="yes"
                                                checked={submitDocuments}
                                                onChange={handleDocumentSubmissionChange}
                                            />
                                            <label htmlFor="submitYes" className="ml-2">
                                                Submit Documents
                                            </label>
                                        </div>
                                        <div className="flex items-center mb-2">
                                            <input
                                                type="radio"
                                                id="submitNo"
                                                name="submitDocuments"
                                                value="no"
                                                checked={!submitDocuments}
                                                onChange={handleDocumentSubmissionChange}
                                            />
                                            <label htmlFor="submitNo" className="ml-2">
                                                Do Not Submit Documents
                                            </label>
                                        </div>
                                        {submitDocuments && (
                                            <>
                                                {Array.from({ length: 2 }).map((_, index) => (
                                                    <input
                                                        key={index}
                                                        type="file"
                                                        accept="application/pdf"
                                                        onChange={(e) => handleImageChange(e, 'document')}
                                                        className="border border-dashed border-gray-300 p-2 rounded-md"
                                                    />
                                                ))}
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="w-full sm:w-1/2 h-auto sm:flex flex-col ">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white p-3">Add floor plan of your house</h5>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">You'll need 2 photos to get started. You can add more or make changes later.</p>
                                    <div className="flex flex-col gap-2 p-3 border-dotted border-2 border-gray-300 ">
                                        <div className="flex items-center mb-2 ">
                                            <input
                                                type="radio"
                                                id="submitYes"
                                                name="submitDocuments"
                                                value="yes"
                                                checked={submitfloorplan}
                                                onChange={handleImageSubmissionChange}
                                            />
                                            <label htmlFor="submitYes" className="ml-2">
                                                Submit Floorplan
                                            </label>
                                        </div>
                                        <div className="flex items-center mb-2">
                                            <input
                                                type="radio"
                                                id="submitNo"
                                                name="submitDocuments"
                                                value="no"
                                                checked={!submitfloorplan}
                                                onChange={handleImageSubmissionChange}
                                            />
                                            <label htmlFor="submitNo" className="ml-2">
                                                Do Not Submit Floorplan
                                            </label>
                                        </div>
                                        {submitfloorplan && (
                                            <>
                                                {Array.from({ length: 2 }).map((_, index) => (
                                                    <input
                                                        key={index}
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => handleImageChange1(e, 'floorPlan')}
                                                        className="border border-dashed border-gray-300 p-2 rounded-md"
                                                    />
                                                ))}
                                            </>
                                        )}

                                    </div>
                                </div>
                            </div>

                        </div>

                    )}
                    {currentStep === 9 && (

                        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8  flex flex-col sm:flex-row mt-10 ">
                            <div className='w-full sm:w-1/2 h-[400px] sm:flex flex-col '>
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-10">Step 4</h5>
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Finish up and publish</h5>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Choose if you'd like to start with an experienced guest, set a starting<br></br> price and publish your listing.</p>

                            </div>
                            <div className='w-full sm:w-1/2 h-auto sm:flex flex-col'>
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white p-3">Now, let's give your container a title</h5>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Short titles work best. Have fun with it – you can always change it later.</p>
                                <div className="flex flex-col gap-2 p-3">
                                    <textarea
                                        value={title}
                                        onChange={handleTitleChange}
                                        placeholder="Enter your title here (max 20 lines)"
                                        rows={7}
                                        className="border border-gray-300 rounded-md p-2"
                                    />

                                </div>
                            </div>
                        </div>


                    )}

                    {currentStep === 10 && (
                        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8  flex flex-col sm:flex-row mt-10  justify-center ">
                            <div className='w-full h-[400px] sm:flex flex-col'>
                                <h5 className="mb-2 text-[36px] font-bold tracking-tight text-gray-900 dark:text-white">Create your description</h5>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Share what makes your place special.</p>
                                <div className="flex flex-col gap-2  ">
                                    <textarea
                                        value={description}
                                        onChange={handleDescriptionChange}
                                        placeholder="Enter your title here (max 20 lines)"
                                        rows={7}
                                        className="border border-gray-300 rounded-md p-2"
                                    />
                                </div>
                            </div>
                        </div>


                    )}
                    {currentStep === 11 && (
                        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8  flex flex-col sm:flex-row mt-10  justify-center ">
                            <div className='w-full  h-[400px] sm:flex flex-col'>
                                <h5 className="mb-2 text-[36px] font-bold tracking-tight text-gray-900 dark:text-white">Now, set your price</h5>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">You can change it anytime.</p>
                                <div className='w-full h-40 '>
                                    <div className="text-4xl leading-tight tracking-tight mb-4">
                                        <label htmlFor="lys-base-price-input">
                                            <div className="flex items-center">
                                                <div className="flex items-center">
                                                    <span className="text-[80px] font-extrabold">₹</span>
                                                    <h3 className="text-[80px] font-extrabold" aria-hidden="true">22230</h3>
                                                </div>

                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )}

                </div>

                <div className="fixed bottom-0 left-0 right-0 bg-white">
                    <Progressbar
                        currentStep={currentStep}
                        totalSteps={11}
                        onNext={nextStep}
                        onPrev={prevStep}
                    />
                </div>
            </div>
        </div>

    );
};

export default Homeaddform;
