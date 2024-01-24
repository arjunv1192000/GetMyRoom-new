import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
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

const Features = ({ handleFormDataChange }) => {

  const [selectedFeatures, setSelectedFeatures] = useState({
    interiorDetails: [],
    outdoorDetails: [],
    utilities: [],
    otherFeatures: [],
  });

  const placeTypes = [
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

  const handleFeatureToggle = (category: string, featureName: string) => {

    const updatedFeatures = { ...selectedFeatures };



    if (updatedFeatures[category].includes(featureName)) {
      updatedFeatures[category] = updatedFeatures[category].filter(
        (name) => name !== featureName
      );
    } else {
      updatedFeatures[category] = [...updatedFeatures[category], featureName];
    }


    setSelectedFeatures(updatedFeatures);
  };

  const formik = useFormik({
    initialValues: {
      selectedFeatures,
    },
    onSubmit: (values) => {
      const selectedFeaturesString = JSON.stringify(selectedFeatures);


      console.log(selectedFeaturesString,"valuesss");
      

        
        const expirationTime = new Date(Date.now() + 5 * 60 * 1000);
        document.cookie = `step4Data=${selectedFeaturesString}; expires=${expirationTime.toUTCString()}; path=/`;


      handleFormDataChange({ step4Data: selectedFeatures });
    },
  });


  useEffect(() => {
    
    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith('step4Data='))
      ?.split('=')[1];

    if (cookieValue) {
      const parsedCookie = JSON.parse(decodeURIComponent(cookieValue));
      setSelectedFeatures(parsedCookie);
      formik.setValues({ selectedFeatures: parsedCookie });
    }
  }, []);

  return (
    <div className="mx-auto max-w-2xl px-4 py-1 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8  flex flex-col sm:flex-row justify-center mb-20">
      <div className="w-full sm:w-[70%] h-auto sm:flex flex-col ">
        <h5 className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold  text-gray-900 ">
          Tell us about what your place has to offer
        </h5>



        <form onSubmit={formik.handleSubmit}>
          <div className="w-full h-auto mt-5">
            <h5 className="mb-2 text-[26px] font-semibold  text-gray-900 ">
              Interior Details
            </h5>
            <div className="container m-auto grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
              {placeTypes.map((placeType, index) => (
                <button
                  key={index}
                  className={`flex items-center justify-between px-4   border ${selectedFeatures.interiorDetails.includes(placeType.name)
                    ? 'bg-gray-200'
                    : 'border-gray-300'
                    } rounded-lg focus:outline-none focus: h-20`}
                  onClick={() =>
                    handleFeatureToggle('interiorDetails', placeType.name)
                  }
                >
                  <span className="text-[12px] flex justify-center sm:text-center">{placeType.name}</span>
                  <span className="text-lg hidden sm:inline-block">{placeType.logo}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="w-full h-auto mt-5 ">
            <h5 className="mb-2 text-[26px] font-semibold  text-gray-900 dark:text-white">
              Outdoor Details
            </h5>
            <div className="container m-auto grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
              {placeTypes1.map((placeType, index) => (
                <button
                  key={index}
                  className={`flex items-center justify-between px-4 py-2 border ${selectedFeatures.outdoorDetails.includes(placeType.name)
                    ? 'bg-gray-200'
                    : 'border-gray-300'
                    } rounded-lg focus:outline-none focus: h-20`}
                  onClick={() =>
                    handleFeatureToggle('outdoorDetails', placeType.name)
                  }
                >
                  <span className="text-[12px] flex justify-center sm:text-center">{placeType.name}</span>
                  <span className="text-lg hidden sm:inline-block">{placeType.logo}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="w-full h-auto mt-5">
            <h5 className="mb-2 text-[26px] font-semibold  text-gray-900 dark:text-white">
              Utilities
            </h5>
            <div className="container m-auto grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
              {placeTypes2.map((placeType, index) => (
                <button
                  key={index}
                  className={`flex items-center justify-between px-4 py-2  border ${selectedFeatures.utilities.includes(placeType.name)
                    ? 'bg-gray-200'
                    : 'border-gray-300'
                    } rounded-lg focus:outline-none focus: h-20`}
                  onClick={() =>
                    handleFeatureToggle('utilities', placeType.name)
                  }
                >
                  <span className="text-[12px] flex justify-center sm:text-center">{placeType.name}</span>
                  <span className="text-lg hidden sm:inline-block">{placeType.logo}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="w-full h-auto mt-5">
            <h5 className="mb-2 text-[26px] font-semibold  text-gray-900 dark:text-white">
              Other Features
            </h5>
            <div className="container m-auto grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
              {placeTypes3.map((placeType, index) => (
                <button
                  key={index}
                  className={`flex items-center justify-between px-4 py-2    border ${selectedFeatures.otherFeatures.includes(placeType.name)
                    ? ' bg-gray-200'
                    : 'border-gray-300'
                    } rounded-lg focus:outline-none focus: h-20`}
                  onClick={() =>
                    handleFeatureToggle('otherFeatures', placeType.name)
                  }
                >
                  <span className="text-[12px] flex justify-center sm:text-center">{placeType.name}</span>
                  <span className="text-lg hidden sm:inline-block">{placeType.logo}</span>
                </button>
              ))}
            </div>
          </div>
          {/* <button type="submit" className="mt-3 p-3 bg-blue-500 text-white rounded-md">
            Submit
          </button> */}
        </form>
      </div>
    </div>
  );
};

export default Features;
