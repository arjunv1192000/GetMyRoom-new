import React, { useState } from 'react';
import { useFormik } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as Yup from 'yup';

const Rooms = ({ handleFormDataChange }) => {

    const [formSubmitted, setFormSubmitted] = useState(false);


    const validationSchema = Yup.object({
        bedrooms: Yup.number().required('Bedrooms are required').min(1, 'Should be at least 1 Bedrooms'),
        bathrooms: Yup.number().required('Bathrooms are required').min(1, 'Should be at least 1 Bathrooms'),
        rooms: Yup.number().required('Rooms are required').min(1, 'Should be at least 1'),
        buildYear: Yup.date().nullable().required('Year of Build is required'),
    });
    const formik = useFormik({
        initialValues: {
            bedrooms: 1,
            bathrooms: 1,
            rooms: 1,
            buildYear: null,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {

            setFormSubmitted(true);
            handleFormDataChange({ step3Data: values });
        },
    });

    const handleIncrement = (field: string) => {
        formik.setFieldValue(field, formik.values[field] + 1);
    };

    const handleDecrement = (field: string) => {
        if (formik.values[field] > 1) {
            formik.setFieldValue(field, formik.values[field] - 1);
        }
    };

    return (
        <div className="mx-auto max-w-2xl px-4 py-1 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8  flex flex-col sm:flex-row mb-24 ">
            <div className="w-full sm:w-full h-auto sm:flex flex-col">
                <h5 className="mb-2 font-bold tracking-tight text-gray-900 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">Let's start with the basics</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">How many people can stay here?</p>

                <form onSubmit={formik.handleSubmit}>
                    <div className="flex justify-between items-center mb-4 w-full h-24 ">
                        <label className="mr-4">Rooms:</label>
                        <div>
                            <button type="button" className="rounded-full px-4 py-2 border border-gray-300 hover:border-black" onClick={() => handleDecrement('rooms')}>-</button>
                            <span className="mx-2 p-2">{formik.values.rooms}</span>
                            <button type="button" className="rounded-full px-4 py-2 border border-gray-300 hover:border-black" onClick={() => handleIncrement('rooms')}>+</button>
                        </div>
                    </div>

                    <div className="flex justify-between items-center mb-4 w-full h-24 ">
                        <label className="mr-4">Bedrooms:</label>
                        <div>
                            <button type="button" className="rounded-full px-4 py-2 border border-gray-300 hover:border-black" onClick={() => handleDecrement('bedrooms')}>-</button>
                            <span className="mx-2 p-2">{formik.values.bedrooms}</span>
                            <button type="button" className="rounded-full px-4 py-2 border border-gray-300 hover:border-black" onClick={() => handleIncrement('bedrooms')}>+</button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between w-full h-24">
                        <label className="mr-4">Bathrooms:</label>
                        <div>
                            <button type="button" className="rounded-full px-4 py-2 border border-gray-300 hover:border-black" onClick={() => handleDecrement('bathrooms')}>-</button>
                            <span className="mx-2 p-2">{formik.values.bathrooms}</span>
                            <button type="button" className="rounded-full px-4 py-2 border border-gray-300 hover:border-black" onClick={() => handleIncrement('bathrooms')}>+</button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mb-4 w-full h-24">
                        <label className="mr-4">Year of Build:</label>
                        <DatePicker
                            selected={formik.values.buildYear}
                            onChange={(date) => formik.setFieldValue('buildYear', date)}
                            showYearDropdown
                            dateFormat="yyyy"
                            className="rounded-full px-1 py-2 border border-gray-300 hover:border-black"
                        />
                    </div>
                    {formik.errors.bedrooms && <div className="text-red-500">{formik.errors.bedrooms}</div>}
                    {formik.errors.bathrooms && <div className="text-red-500">{formik.errors.bathrooms}</div>}
                    {formik.errors.rooms && <div className="text-red-500">{formik.errors.rooms}</div>}
                    {formik.errors.buildYear && <div className="text-red-500">{formik.errors.buildYear}</div>}

                    <button
                        type="submit"
                        className={`mt-3 p-3 w-40  rounded-md ${formSubmitted ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
                            }`}
                    >
                        {formSubmitted ? 'Added!' : 'Add'}
                    </button>
                   
                </form>

            </div>
        </div>
    );
};

export default Rooms;
