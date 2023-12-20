import React, { useState } from 'react'
import img1 from '../../assets/formimg.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const SellerType = ({ handleFormDataChange }) => {
    const validationSchema = Yup.object({
        step11Data: Yup.string().required('Please select a place type'),
    });

    const placeTypes = [
        { name: 'AGENT', logo: '🏡' },
        { name: 'PRIVATE OWNER', logo: '🛌' },

    ];

    const [selectedPlaceType, setSelectedPlaceType] = useState('');

    const handlePlaceTypeSelection = (placeType: React.SetStateAction<string> | React.ChangeEvent<any>) => {
        setSelectedPlaceType(placeType);
        formik.handleChange('step11Data')(placeType);
    };

    const formik = useFormik({
        initialValues: {
            step11Data: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values, 'typess');
            handleFormDataChange({ step11Data: values.step11Data });
        },
    });

    return (

        <form onSubmit={formik.handleSubmit}>

            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8  flex flex-col sm:flex-row mt-10">
                <div className="w-full sm:w-1/2 h-[400px] sm:flex flex-col ">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-10"></h5>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Tell us about your place
                    </h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        In this step, we'll ask you which type of property you have and if guests will book the entire
                        place or just a room. Then let us know the location and how many guests can stay.
                    </p>
                    <img
                        className="object-cover rounded-t-lg h-20 md:h-24 md:w-28 md:rounded-none md:rounded-s-lg ml-20 mt-10"
                        src={img1}
                        alt=""
                    ></img>
                </div>
                <div className="w-full sm:w-1/2 h-auto sm:flex flex-col">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white p-3">
                        What type of place will guests have?
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
                    <button type="submit" className="mt-3 p-3 bg-blue-500 text-white rounded-md">
                        Add
                    </button>
                </div>
            </div>
        </form> 

    )
}

export default SellerType