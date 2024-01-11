import React, { useState, useEffect } from 'react';
import img1 from '../../assets/formimg.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import img2 from '../../assets/illustration_login.png'
import img3 from '../../assets/contact-img.png'
import img4 from '../../assets/img2.webp'

const Type = ({ handleFormDataChange }) => {
    const [formSubmitted, setFormSubmitted] = useState(false);
    

    const validationSchema = Yup.object({
        step1Data: Yup.string().required('Please select a place type'),
    });

    const placeTypes = [
        { name: 'BOX ROOM', logo: '🏡' },
        { name: 'TWIN ROOM', logo: '🛌' },
        { name: 'STUDIO', logo: '🛋️' },
        { name: 'SINGLE ROOM', logo: '🏡' },
        { name: 'EN-SUIT ROOM', logo: '🛌' },
        { name: 'DOUBLE ROOM', logo: '🛋️' },
        { name: 'TRIPLE/QUADRUPLE ROOM', logo: '🏡' },
        { name: '1 BED HOUSE/FLAT', logo: '🛌' },
        { name: '2 BED HOUSE/FLAT', logo: '🛌' },
        { name: '3 BED HOUSE/FLAT', logo: '🛌' },
        { name: '4+ BED HOUSE/FLAT', logo: '🛌' },

    ];

    const [selectedPlaceType, setSelectedPlaceType] = useState('');
    const [selectedState, setSelectedState] = useState('');

    const handlePlaceTypeSelection = (placeType) => {
        setSelectedPlaceType(placeType);
        formik.handleChange('step1Data')(placeType);
        setSelectedState(placeType);
    };


    

    const formik = useFormik({
        initialValues: {
            step1Data: selectedState || '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const expirationTime = new Date(Date.now() + 2 * 60 * 1000); 
            document.cookie = `step1Data=${values.step1Data}; expires=${expirationTime.toUTCString()}; path=/`;
            handleFormDataChange({ step1Data: values.step1Data });
            setFormSubmitted(true);


        },
    });

    useEffect(() => {
       
        const cookieValue = document.cookie
          .split('; ')
          .find((row) => row.startsWith('step1Data='))
          ?.split('=')[1];
    
        if (cookieValue) {
          formik.setFieldValue('step1Data', cookieValue);
          setSelectedPlaceType(cookieValue);
          setSelectedState(cookieValue);
        }
      }, []);

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="mx-auto max-w-2xl px-4 py-1 sm:px-6 sm:py-2 lg:max-w-7xl lg:px-8  flex flex-col sm:flex-row  ">
                <div className="w-full sm: h-[700px] sm:flex flex-col   ">
                    <h2 className="font-semibold text-gray-900 text-[38px] sm:text-[38px] md:text-4xl lg:text-5xl xl:text-[48px] ">It’s easy to get <br></br>started on GetMyRoom</h2>
                    <div className='w-full sm:w-1/2 h-auto sm:flex flex-col  mt-10 '>
                        <div className='flex flex-col items-center  shadow md:flex-row  h-38 bg-white w-full'  >
                            <div className="flex flex-col justify-between p-4 leading-normal">
                                <div className='flex flex-row'>
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900  text-start ml-2"> 1.  </h5>
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900  text-start ml-2">Tell us about your places</h5>
                                </div>
                            </div>
                            <img className="object-cover rounded-t-lg h-20 md:h-24 md:w-28 md:rounded-none md:rounded-s-lg hidden sm:inline-block" src={img1} alt=""></img>
                        </div>
                        <hr className="border-t border-gray-300  " />
                        <div className='flex flex-col items-center  shadow md:flex-row  h-38 bg-white w-full'  >
                            <div className="flex flex-col justify-between p-4 leading-normal">
                                <div className='flex flex-row'>
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ml-2">2.</h5>
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ml-2"> Make it stand out the property</h5>
                                </div>
                            </div>
                            <img className="object-cover  rounded-t-lg h-20 md:h-24 md:w-28 md:rounded-none md:rounded-s-lg hidden sm:inline-block" src={img4} alt=""></img>
                        </div>
                        <hr className="border-t border-gray-300  " />
                        <div className='flex flex-col items-center  shadow md:flex-row  h-38 bg-white w-full'  >
                            <div className="flex flex-col justify-between p-4 leading-normal">
                                <div className='flex flex-row'>
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ml-2">3.</h5>
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ml-2"> Tell us about your features</h5>
                                </div>
                            </div>
                            <img className="object-cover  rounded-t-lg h-20 md:h-24 md:w-28 md:rounded-none md:rounded-s-lg hidden sm:inline-block" src={img3} alt=""></img>
                        </div>
                        <hr className="border-t border-gray-300  " />
                        <div className='flex flex-col items-center  shadow md:flex-row  h-38 bg-white w-full'  >
                            <div className="flex flex-col justify-between p-4 leading-normal">
                                <div className='flex flex-row'>
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ml-2">4.</h5>
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ml-2"> Finish up and publish</h5>
                                </div>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 ml-2">Choose if you'd like to start with an experienced guest, set a starting price and publish your listing.</p>
                            </div>
                            <img className="object-cover  rounded-t-lg h-20 md:h-24 md:w-28 md:rounded-none md:rounded-s-lg hidden sm:inline-block" src={img2} alt=""></img>
                        </div>
                        <hr className="border-t border-gray-300  " />
                    </div>
                </div>
                <div className="w-full sm:w-1/2 h-auto sm:flex flex-col mb-32 ">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white p-3">
                        What type of place will guests have?
                    </h5>
                    <div className="grid grid-cols-2 gap-6  md:grid-cols-2 lg:grid-cols-3 lg:p-1 lg:gap-6">
                        {placeTypes.map((placeType, index) => (
                            <button
                                key={index}
                                className={`flex items-center justify-between px-3 py-2 border  ${selectedPlaceType === placeType.name
                                    ? ' bg-gray-200 '
                                    : 'border-gray-300'
                                    } rounded-lg focus:outline-none focus:border-black h-16 w-[125px]`}
                                onClick={() => handlePlaceTypeSelection(placeType.name)}
                            >
                                <span className="text-[12px] flex justify-center">{placeType.name}</span>
                                {/* <span className="text-lg hidden sm:inline-block">{placeType.logo}</span> */}
                            </button>
                        ))}
                    </div>

                </div>
            </div>
        </form>
    );
};

export default Type;
