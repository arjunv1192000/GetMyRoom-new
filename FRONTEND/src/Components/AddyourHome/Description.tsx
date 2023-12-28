import { useState } from 'react'
import { useFormik } from 'formik';
const Description = ({ handleFormDataChange }) => {
    const formik = useFormik({
        initialValues: {
            description: '',
        },
        onSubmit: (values) => {
            console.log(values);
            handleFormDataChange({ step9Data: values.description });
        },
    });
    return (
        <div className="mx-auto max-w-2xl px-4 py-1 sm:px-6 sm:py-18 lg:max-w-7xl lg:px-8  flex flex-col sm:flex-row   justify-center ">
            <form onSubmit={formik.handleSubmit}>
                <div className='w-full h-[300px] sm:flex flex-col'>
                    <h5 className="mb-2 text-[36px] font-bold tracking-tight text-gray-900 dark:text-white">Create your description</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Share what makes your place special.</p>
                    <div className="flex flex-col gap-2  ">
                        <textarea
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter your description here (max 20 lines)"
                            rows={7}
                            className="border border-gray-300 rounded-md p-2"
                        />
                    </div>
                </div>
                <div className='flex justify-end mt-5'>
                    <button type="submit" className="mt-3 p-3 bg-[#390b79] text-white rounded-md w-40 ">
                        Add
                    </button>

                </div>
            </form>
        </div>
    )
}

export default Description