import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from '../Utils/user/axios';
import Axios from "../Utils/Ssrvice/axios"
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { login } from '../../redux/reducer/userSlice';
import toast, { Toaster } from 'react-hot-toast';
import { IoEye, IoEyeOff } from 'react-icons/io5';

const Registerform = ({ onBack, onClose }) => {
    const dispatch = useDispatch();


    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validationSchemaStep1 = Yup.object({
        email: Yup.string()
            .trim()
            .matches(
                /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                'Email must be in lowercase'
            )
            .email('Invalid email')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    const validationSchemaStep2 = Yup.object({
        fullName: Yup.string()
            .trim()
            .matches(/^[A-Za-z\s]+$/, 'Name cannot contain numbers')
            .min(5, 'Full name must be at least 5 characters')
            .required('Full name is required'),

        // image: Yup.mixed()
        //     .nullable()
        //     .required('Image is required') as Yup.MixedSchema<FileList | null>,
    });

    const handleImageChange = (event: { currentTarget: { files: any[]; }; }) => {
        formikStep2.setFieldValue('image', event.currentTarget.files[0]);
    };

    const handleModalClose = () => {
        onBack();
        onClose();
    };

    const handleBack = () => {
        if (step === 2) {
            setStep(1);

        } else {
            setStep(1)

        }
    };


    const formikStep1 = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: validationSchemaStep1,
        onSubmit: (values) => {
            const body = {
                email: values.email,
            };

            console.log(body);
            axios.post('/register', body)
                .then((response) => {
                    if (response.data.status === true) {

                        setStep(2);

                    } else {

                        toast.error("user already exists")

                    }
                })
                .catch((response) => {
                    console.error(response.message);
                });



        },
    });




    const formikStep2 = useFormik({
        initialValues: {
            fullName: '',
            image: '',

        },
        validationSchema: validationSchemaStep2,
        onSubmit: async (values) => {
            const fileimg = values.image;
            if (!fileimg) {
                formikStep2.setFieldError('image', 'Image is required');
            }

            try {

                const imageResponse = await Axios.get('/s3service');
                const imageUrl = imageResponse.data.response;




                const imageUploadResponse = await fetch(imageUrl, {
                    method: 'PUT',
                    body: fileimg,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                const userimage = imageUrl.split('?')[0];



                const body = {
                    email: formikStep1.values.email,
                    password: formikStep1.values.password,
                    name: values.fullName,
                    image: userimage,
                };

                console.log(body);

                axios.post('/adduserdata', body)
                    .then((response) => {
                        if (response.data.status === true) {
                            console.log(response.data);
                            localStorage.setItem('access_token_user', response.data.accessToken);
                            dispatch(login({
                                id: response.data.isUser.userId,
                                name: response.data.isUser.userName,
                                email: response.data.isUser.userEmail,
                                image: response.data.isUser.userImg,
                                access_token: response.data.accessToken,

                            }));
                            toast.success('Successfully Added!')
                            handleModalClose();


                        }
                    })
                    .catch((response) => {
                        console.error(response.message);
                    });

            } catch (error) {
                toast.error('Error uploading image:')
            }





        },

    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div>
            <div>
                {step === 1 ? (
                    <form onSubmit={formikStep1.handleSubmit}>
                        <div className='flex justify-center mt-5'>
                            <h2 className='font-semibold text-black text-[25px]  ml-5  '>Register</h2>
                        </div>
                        <div className='mt-5 p-2'>
                            <input
                                type='email'
                                name='email'
                                id='email'
                                value={formikStep1.values.email}
                                onChange={formikStep1.handleChange}
                                onBlur={formikStep1.handleBlur}
                                placeholder='Enter your email'
                                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            />
                            {formikStep1.touched.email && formikStep1.errors.email && (
                                <div className='text-red-500 text-sm absolute mt-2'>{formikStep1.errors.email}</div>
                            )}
                        </div>
                        <div className='mt-5 p-2 relative'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name='password'
                                id='password'
                                value={formikStep1.values.password}
                                onChange={formikStep1.handleChange}
                                onBlur={formikStep1.handleBlur}
                                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                placeholder='Password'
                            />
                            <span
                                className='absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer'
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <IoEye /> : <IoEyeOff />}
                            </span>
                            {formikStep1.touched.password && formikStep1.errors.password && (
                                <div className='text-red-500 text-sm absolute mt-2'>{formikStep1.errors.password}</div>
                            )}
                        </div>
                        <div className='mt-5 p-2 relative'>
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                name='confirmPassword'
                                id='confirmPassword'
                                value={formikStep1.values.confirmPassword}
                                onChange={formikStep1.handleChange}
                                onBlur={formikStep1.handleBlur}
                                placeholder='Confirm your password'
                                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            />
                            <span

                                onClick={toggleConfirmPasswordVisibility}
                                className='absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer'
                            >

                                {showConfirmPassword ? <IoEye /> : <IoEyeOff />}
                            </span>
                            {formikStep1.touched.confirmPassword && formikStep1.errors.confirmPassword && (
                                <div className='text-red-500 text-sm absolute mt-2'>{formikStep1.errors.confirmPassword}</div>
                            )}
                        </div>
                        <div>
                            <p className='text-xs text-gray-600 mt-5 ml-3'>
                                By clicking create account you confirm that you agree to our website
                                <a href='/terms' className='text-blue-500'> terms of use </a> of use,our <a href='/privacy' className='text-blue-500'>Privacy Policy</a>

                            </p>
                        </div>
                        <div className='mt-5 p-2'>
                            <button type='submit' className='transition ease-in-out delay-150 bg-[#390b79]  hover: hover:bg-[#870e4d] duration-300 text-white px-4 py-2 rounded w-full'>Register</button>
                        </div>
                    </form>
                ) : (
                    <>
                        <div className='flex justify-center mt-1  '>
                            <h2 className=" font-semibold text-black text-[20px]  ml-5  ">Finish signing up</h2>
                        </div>
                        <button onClick={handleBack} className=" top-20 left-5 text-gray-500 hover:text-gray-700">
                            <IoArrowBackCircleSharp />
                        </button>
                        <form onSubmit={formikStep2.handleSubmit}>

                            <div className='mt-5 p-2'>

                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formikStep2.values.fullName}
                                    onChange={formikStep2.handleChange}
                                    onBlur={formikStep2.handleBlur}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Full Name"

                                />
                                {formikStep2.touched.fullName && formikStep2.errors.fullName && (
                                    <div className='text-red-500 text-sm absolute mt-2'>{formikStep2.errors.fullName}</div>
                                )}

                            </div>

                            <div className='mt-5 p-2'>
                                <label htmlFor="profileImage" className="text-gray-600">Profile Image:</label>
                                <input
                                    type="file"
                                    id="image"
                                    accept="image/*"
                                    name='image'
                                    onChange={handleImageChange}
                                    onBlur={formikStep2.handleBlur}
                                    className="mt-1 block w-full p-2.5"
                                />
                                {formikStep2.touched.image && formikStep2.errors.image && (
                                    <div className='text-red-500 text-sm absolute mt-2'>{formikStep2.errors.image}</div>
                                )}
                            </div>
                            <div>

                                <p className="text-xs text-gray-600 mt-1 ml-3">
                                    We’ll call or text you to confirm your number. Standard message and data rates apply<a href="/privacy-policy" className="text-blue-500">Privacy Policy</a>.
                                </p>
                            </div>
                            <div className='mt-5 p-2 mb-10'>
                                <button type="submit" className=" transition ease-in-out delay-150 bg-[#390b79]  hover: hover:bg-[#870e4d] duration-300 text-white px-4 py-2 rounded w-full" >
                                    Agree and continue
                                </button>
                            </div>


                        </form>
                    </>
                )}
            </div>
            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />

        </div>
    );
};

export default Registerform;
