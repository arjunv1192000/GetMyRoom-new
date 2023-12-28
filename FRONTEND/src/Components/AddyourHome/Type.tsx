import React, { useState } from 'react';
import img1 from '../../assets/formimg.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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
            step1Data: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleFormDataChange({ step1Data: values.step1Data });
            setFormSubmitted(true);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="mx-auto max-w-2xl px-4 py-1 sm:px-6 sm:py-2 lg:max-w-7xl lg:px-8  flex flex-col sm:flex-row   ">
                <div className="w-full sm:w-1/2 h-[400px] sm:flex flex-col mb-60  ">
                    <h5 className="mb-2  text-[36px] font-bold tracking-tight text-gray-900 dark:text-white mt-10">Step 1</h5>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Tell us about your place
                    </h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        In this step, we'll ask you which type of property you have and if guests will book the entire
                        place or just a room. Then let us know the location and how many guests can stay.
                    </p>
                    <img
                        className="object-contain w-full max-w-[400px] mx-auto"
                        src={img1}
                        alt=""
                    />

                </div>
                <div className="w-full sm:w-1/2 h-auto sm:flex flex-col mb-32">
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

                </div>
            </div>
        </form>
    );
};

export default Type;
