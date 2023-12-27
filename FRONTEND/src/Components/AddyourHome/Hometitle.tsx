import React, { useState } from 'react'
import { useFormik } from 'formik';
import img2 from '../../assets/illustration_login.png'

const Hometitle = ({ handleFormDataChange }) => {
    const formik = useFormik({
        initialValues: {
            title: '',
        },
        onSubmit: (values) => {
            // Handle form submission here
            console.log(values);

            // Pass data to the parent component
            handleFormDataChange({ step8Data: values.title  });
        },
    });
    return (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8  flex flex-col sm:flex-row  ">
            <div className='w-full sm:w-1/2 h-[400px] sm:flex flex-col  mb-50  '>
                <h5 className="mb-2 text-[36px] font-bold tracking-tight text-gray-900 dark:text-white">Step 4</h5>
              
                
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Choose if you'd like to start with an experienced guest, set a starting<br></br> price and publish your listing.</p>
                <img
                        className="object-contain w-[400px] justify-center "
                        src={img2}
                        alt=""
                    ></img>

            </div>
            <div className='w-full sm:w-1/2 h-auto sm:flex flex-col '>
                <form onSubmit={formik.handleSubmit}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ">Now, let's give a title</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Short titles work best. Have fun with it .</p>
                    <div className="flex flex-col gap-2 p-3">
                        <textarea
                            name="title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter your title here (max 2 lines)"
                            rows={7}
                            className="border border-gray-300 rounded-md p-2"
                        />

                    </div>
                    <div className='flex justify-end'>
                    <button type="submit" className="mt-3 p-3 bg-[#390b79] text-white rounded-md w-40 ">
                        Add
                    </button>

                    </div>
                    
                </form>
            </div>

        </div>
    )
}

export default Hometitle