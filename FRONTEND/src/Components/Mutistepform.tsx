import React, { useState } from 'react';
import Stepdetails from './AddyourHome/Stepdetails';
import Location from './AddyourHome/Location';
import Progressbar from './AddyourHome/Progressbar';
import Type from './AddyourHome/Type';
import Rooms from './AddyourHome/Rooms';
import Features from './AddyourHome/Features';
import Images from './AddyourHome/Images';
import Videos from './AddyourHome/Videos';
import Price from './AddyourHome/Price';
import Description from './AddyourHome/Description';
import Floorplans from './AddyourHome/Floorplans';
import Hometitle from './AddyourHome/Hometitle';
import SellerType from './AddyourHome/SellerType';
import axios from "./Utils/property/axios";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import toast, { Toaster } from 'react-hot-toast';

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

const Mutistepform = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const userdata = useSelector((state: RootState) => state.user.value);

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleFormDataChange = (data) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
  };

  const isStepDataComplete = (stepIndex) => {
    switch (stepIndex) {
        case 1:
            return formData.step1Data !== undefined && formData.step1Data !== null;
          case 2:
            return formData.step2Data !== undefined && formData.step2Data !== null;
          case 3:
            return formData.step3Data !== undefined && formData.step3Data !== null;
          case 4:
            return formData.step4Data !== undefined && formData.step4Data !== null;
          case 5:
            return formData.step5Data !== undefined && formData.step5Data !== null;
          case 6:
            return formData.step6Data !== undefined && formData.step6Data !== null;
          case 7:
            return formData.step7Data !== undefined && formData.step7Data !== null;
          case 8:
            return formData.step8Data !== undefined && formData.step8Data !== null;
          case 9:
            return formData.step9Data !== undefined && formData.step9Data !== null;
          case 10:
            return formData.step10Data !== undefined && formData.step10Data !== null;
          case 11:
            return formData.step11Data !== undefined && formData.step11Data !== null;
          default:
            return true;
    }
  };

  const submitForm = async () => {
    const isFormComplete = Array.from({ length: 11 }, (_, i) => isStepDataComplete(i + 1)).every(Boolean);

    if (isFormComplete) {
      const body = {
        userId: userdata.id,
        type: formData?.step1Data,
        location: formData?.step2Data,
        room: formData?.step3Data?.rooms,
        bathrooms: formData?.step3Data?.bathrooms,
        bedrooms: formData?.step3Data?.bedrooms,
        buildYear: formData?.step3Data?.buildYear,
        features: formData?.step4Data,
        image: formData?.step5Data,
        video: formData?.step6Data,
        tilte: formData?.step8Data,
        description: formData?.step9Data,
        price: formData?.step10Data,
        seller: formData?.step11Data,
        floorplans: formData?.step7Data?.floorplanUrl,
      };

      axios.post('/addnewproperty', body)
        .then((response) => {
          if (response.data.status === true) {
            console.log(response.data);
            navigate("/mylist");
          }
        })
        .catch((response) => {
          console.error(response.message);
          toast.error(response.message)
          
        });
    } else {
      toast.error("Please complete all steps before submitting.")
    }
  };

  const steps = [
    // <Stepdetails />,
    <Type formData={formData} handleFormDataChange={handleFormDataChange} />,
    <Location formData={formData} handleFormDataChange={handleFormDataChange} />,
    <Rooms formData={formData} handleFormDataChange={handleFormDataChange} />,
    <Features formData={formData} handleFormDataChange={handleFormDataChange} />,
    <Images formData={formData} handleFormDataChange={handleFormDataChange} />,
    <Videos formData={formData} handleFormDataChange={handleFormDataChange} />,
    <Floorplans formData={formData} handleFormDataChange={handleFormDataChange} />,
    <Hometitle formData={formData} handleFormDataChange={handleFormDataChange} />,
    <Description formData={formData} handleFormDataChange={handleFormDataChange} />,
    <Price formData={formData} handleFormDataChange={handleFormDataChange} />,
    <SellerType formData={formData} handleFormDataChange={handleFormDataChange} />
  ];
  

  return (
    <div className='bg-white '>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8  ">
        <div className="flex flex-col h-auto w-full">
          {steps[currentStep - 1]}
          <div className="fixed bottom-0 left-0 right-0 bg-white">
            <Progressbar
              currentStep={currentStep}
              totalSteps={11}
              onNext={nextStep}
              onPrev={prevStep}
              onSubmit={submitForm}
              isNextDisabled={!isStepDataComplete(currentStep)}
            />
          </div>
        </div>
      </div>
      <Toaster
                position="bottom-center"
                reverseOrder={false}
            />
    </div>
  );
};

export default Mutistepform;
