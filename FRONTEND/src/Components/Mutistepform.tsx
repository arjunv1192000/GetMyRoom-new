import React, { useEffect, useState } from 'react';
import Location from './AddyourHome/Location';
import Progressbar from './AddyourHome/Progressbar';
import Type from './AddyourHome/Type';
import Rooms from './AddyourHome/Rooms';
import Features from './AddyourHome/Features';
import Images from './AddyourHome/Images';
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

  useEffect(() => {
    const cleanupCookies = () => {
      const cookieNames = ['step1Data', 'step2Data', 'step3Data', 'uploadedImages', 'floorplanUrlData', 'step4Data', 'step7Data', 'step8Data', 'step9Data', 'step10Data'];
      cookieNames.forEach((cookieName) => {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      });
    };

    // Add event listener for beforeunload event
    window.addEventListener('beforeunload', cleanupCookies);

    // Remove event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', cleanupCookies);
    };
  }, []);

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
      default:
        return true;
    }
  };



  const submitForm = async () => {
    const isFormComplete = Array.from({ length: 10 }, (_, i) => isStepDataComplete(i + 1)).every(Boolean);

    if (isFormComplete) {
      const body = {
        userId: userdata.id,
        type: formData?.step1Data,
        location: formData?.step2Data,
        bathrooms: formData?.step3Data?.bathrooms,
        bedrooms: formData?.step3Data?.bedrooms,
        features: formData?.step4Data,
        image: formData?.step5Data,
        tilte: formData?.step7Data,
        description: formData?.step8Data,
        price: formData?.step9Data,
        seller: formData?.step10Data,
        floorplans: formData?.step6Data?.floorplanUrl,
      };

      axios.post('/addnewproperty', body)
        .then((response) => {
          if (response.data.status === true) {
            const cookieNames = ['step1Data', 'step2Data', 'step3Data', 'uploadedImages', 'floorplanUrlData', 'step4Data', 'step7Data', 'step8Data', 'step9Data', 'step10Data'];
            cookieNames.forEach((cookieName) => {
              document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            });
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
    <Type formData={formData} handleFormDataChange={handleFormDataChange} />,
    <Location formData={formData} handleFormDataChange={handleFormDataChange} />,
    <Rooms formData={formData} handleFormDataChange={handleFormDataChange} />,
    <Features formData={formData} handleFormDataChange={handleFormDataChange} />,
    <Images formData={formData} handleFormDataChange={handleFormDataChange} />,
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
              totalSteps={10}
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


