import React, { useEffect, useState } from 'react'
import img1 from '../../assets/avatarmedia.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const SellerType = ({ handleFormDataChange }) => {
    const validationSchema = Yup.object({
        step10Data: Yup.string().required('Please select a place type'),
    });

    const placeTypes = [
        { name: 'AGENT', logo: '🏡' },
        { name: 'PRIVATE OWNER', logo: '🛌' },

    ];

    useEffect(() => {
    
        const cookieValue = document.cookie
            .split('; ')
            .find((row) => row.startsWith('step10Data='))
            ?.split('=')[1];

        if (cookieValue) {
            const parsedCookie = JSON.parse(cookieValue);
            setSelectedPlaceType(parsedCookie.step10Data);
        }

        const handleBeforeUnload = () => {
           
            document.cookie = 'step7Data=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          };
        
          window.addEventListener('beforeunload', handleBeforeUnload);
        
          return () => {
            // Cleanup: Remove the event listener when the component is unmounted.
            window.removeEventListener('beforeunload', handleBeforeUnload);
          };


    }, []);

    const [selectedPlaceType, setSelectedPlaceType] = useState('');

    const handlePlaceTypeSelection = (placeType: React.SetStateAction<string> | React.ChangeEvent<any>) => {
        setSelectedPlaceType(placeType);
        formik.handleChange('step10Data')(placeType);
    };

    const formik = useFormik({
        initialValues: {
            step10Data: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {

            const step10DataString = JSON.stringify({ step10Data: values.step10Data });
            const expirationTime = new Date(Date.now() + 10 * 60 * 1000);
            document.cookie = `step10Data=${step10DataString}; expires=${expirationTime.toUTCString()}; path=/`;
       
            handleFormDataChange({ step10Data: values.step10Data });
        },
    });

    return (

        <form onSubmit={formik.handleSubmit}>

            <div className="mx-auto max-w-2xl px-4 py-16 justify-center sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8  flex flex-col sm:flex-row mb-20 ">
                <div className="w-full sm:w-1/2 h-[400px] sm:flex flex-col mr-10">
                    <h5 className="mb-2 text-[40px] font-bold tracking-tight text-gray-900 flex justify-center ">
                        Final step
                    </h5>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 flex justify-center ">Finish up and publish</h5>
                   
                    <img
                        className="object-cover rounded-t-lg h-40  md:h-44 md:w-32 md:ml-40 md:rounded-none md:rounded-s-lg ml-28 mt-10 "
                        src={img1}
                        alt=""
                    ></img>
                </div>
                <div className="w-full sm:w-1/2 h-auto sm:flex flex-col">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900  p-3">
                     Are you the
                    </h5>
                    <div className="flex flex-col gap-2 p-3">
                        {placeTypes.map((placeType, index) => (
                            <button
                                key={index}
                                className={`flex items-center justify-between px-4 py-2 border ${selectedPlaceType === placeType.name
                                        ? ' bg-gray-200 '
                                        : 'border-gray-300'
                                    } rounded-lg focus:outline-none focus:border-black h-20`}
                                onClick={() => handlePlaceTypeSelection(placeType.name)}
                            >
                                <span className="text-base">{placeType.name}</span>
                                <span className="text-lg">{placeType.logo}</span>
                            </button>
                        ))}
                    </div>
                    <div className='flex justify-end'>
                    {/* <button type="submit" className="mt-3 p-3 bg-[#390b79] text-white rounded-md w-40 ">
                        Add
                    </button> */}

                </div>
                </div>
            </div>
        </form> 

    )
}

export default SellerType