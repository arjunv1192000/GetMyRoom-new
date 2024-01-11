import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from '../Utils/user/axios';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/reducer/userSlice';
import toast, { Toaster } from 'react-hot-toast';
import { IoArrowBackCircleSharp, IoEye, IoEyeOff } from 'react-icons/io5';

const Loginform = ({ onBack, isLogin, onClose }) => {

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
        password: Yup.string().required('Password is required'),
    });

    const validationSchemaStep2 = Yup.object({
        email: Yup.string()
            .trim()
            .matches(
                /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                'Email must be in lowercase'
            )
            .email('Invalid email')
            .required('Email is required'),

    });

    const validationSchemaStep3= Yup.object({
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });
    const validationSchemaStep4 = Yup.object({
        otp: Yup.string().matches(/^\d{6}$/, 'OTP must be a 6-digit number').required('OTP is required'),
    });


    const handleModalClose = () => {
        onBack();
        onClose();
    };

    const handleSwitchComponent = () => {
        setStep(1);
        onBack();
        setLogin(!isLogin);
    };

    const formikStep1 = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchemaStep1,
        onSubmit: (values) => {
            const body = {
                email: values.email,
                password: values.password,
            };

            console.log(body);


            axios
                .post('/login', body)
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
                        toast.success('Successfully Login')
                        handleModalClose();

                    } else {
                        toast.error('Invalid email or password');
                    }
                })
                .catch((error) => {
                    console.error(error.message);
                });
        },
    });


    const formikStep2 = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: validationSchemaStep2,
        onSubmit: (values) => {
            const body = {
                email: values.email,
            };

            console.log(body);
            axios.post('/checkemail', body)
                .then((response) => {
                    if (response.data.status === true) {



                        toast.success('OTP Send Successfully!')


                       

                        setStep(3);

                    } else {

                        toast.error("email not found ")

                    }
                })
                .catch((response) => {
                    console.error(response.message);
                });



        },
    });

    const formikStep3 = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema: validationSchemaStep3,
        onSubmit: (values) => {
            const body = {
                email: formikStep2.values.email,
                password: values.password,
            };

            console.log(body);
            axios.post('/updatepassword', body)
                .then((response) => {
                    if (response.data.status === true) {

                     toast.success('Successfully Update the password')

                        setStep(1);

                    } else {

                        toast.error("error updating password")

                    }
                })
                .catch((response) => {
                    console.error(response.message);
                });



        },
    });


    const formikStep4 = useFormik({
        initialValues: {
            otp: '',
        },
        validationSchema: validationSchemaStep4,
        onSubmit: (values) => {

            const body = {
                email: formikStep2.values.email,
                otp: values.otp
            };


            axios.post('/verifyotp', body)
                .then((response) => {
                    if (response.data.status === true) {
                        console.log(response.data);
                        setStep(4);

                    } else {
                        toast.error("Invalid OTP")
                        setStep(2);
                    }
                })
                .catch((response) => {
                    console.error(response.message);
                });



        },
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handlepassword = () => {
        setStep(2);
    };

    return (
        <div>
            {step === 1 && (
                <form onSubmit={formikStep1.handleSubmit}>
                    <div className='flex justify-center mt-5'>
                        <h2 className='font-semibold text-black text-[25px]  ml-5  '>Login</h2>
                    </div>
                    <div className='mt-5 p-2'>
                        <input
                            type='email'
                            name='email'
                            id='email'
                            value={formikStep1.values.email}
                            onChange={formikStep1.handleChange}
                            onBlur={formikStep1.handleBlur}
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            placeholder='Email'
                        />
                        {formikStep1.touched.email && formikStep1.errors.email && (
                            <div className='text-red-500 text-sm absolute mt-2'>{formikStep1.errors.email}</div>
                        )}
                    </div>
                    <div className='mt-5 p-2 relative '>
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
                            className='absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer '
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <IoEye /> : <IoEyeOff />}
                        </span>
                        {formikStep1.touched.password && formikStep1.errors.password && (
                            <div className='text-red-500 text-sm absolute mt-2'>{formikStep1.errors.password}</div>
                        )}
                    </div>
                    <div className='w-full  p-2 flex justify-end  '>
                        <p className="text-[16px] text-gray-600 mr-2 cursor-pointer" onClick={handlepassword}>
                            Forgot password?
                        </p>

                    </div>
                    <div className='mt-5 p-2'>
                        <button
                            type='submit'
                            className='transition ease-in-out delay-150 bg-[#390b79]  hover: hover:bg-[#870e4d] duration-300 text-white px-4 py-2 rounded w-full'
                        >
                            Login
                        </button>
                    </div>
                    <div className='flex items-center justify-center p-2'>
                        <hr className='border-t border-gray-300 flex-grow mr-2' />
                        <span className='text-gray-500'>or</span>
                        <hr className='border-t border-gray-300 flex-grow ml-2' />
                    </div>
                </form>

            )}
            {step === 2 && (
                <form onSubmit={formikStep2.handleSubmit}>
                    <div className='flex flex-col justify-center items-center mt-5'>
                        <h2 className='font-semibold text-black text-[25px]  ml-5  '>Forgot password</h2>
                        <p className='text-lg text-gray-600 mt-5 ml-3'>
                            Verify your email


                        </p>

                    </div>
                    <div className='mt-5 p-2'>
                        <input
                            type='email'
                            name='email'
                            id='email'
                            value={formikStep2.values.email}
                            onChange={formikStep2.handleChange}
                            onBlur={formikStep2.handleBlur}
                            placeholder='Enter your email'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        />
                        {formikStep2.touched.email && formikStep2.errors.email && (
                            <div className='text-red-500 text-sm absolute mt-2'>{formikStep2.errors.email}</div>
                        )}
                    </div>
                    <div className='mt-5 p-2'>
                        <button type='submit' className='transition ease-in-out delay-150 bg-[#390b79]  hover: hover:bg-[#870e4d] duration-300 text-white px-4 py-2 rounded w-full'>Verify</button>
                    </div>
                </form>







            )}
            {step === 4 && (

                <form onSubmit={formikStep3.handleSubmit}>
                    <div className='flex justify-center mt-5'>
                        <h2 className='font-semibold text-black text-[25px]  ml-5  '>Add new password</h2>
                    </div>
                   
                    <div className='mt-5 p-2 relative'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name='password'
                            id='password'
                            value={formikStep3.values.password}
                            onChange={formikStep3.handleChange}
                            onBlur={formikStep3.handleBlur}
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            placeholder='Password'
                        />
                        <span
                            className='absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer'
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <IoEye /> : <IoEyeOff />}
                        </span>
                        {formikStep3.touched.password && formikStep3.errors.password && (
                            <div className='text-red-500 text-sm absolute mt-2'>{formikStep3.errors.password}</div>
                        )}
                    </div>
                    <div className='mt-5 p-2 relative'>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name='confirmPassword'
                            id='confirmPassword'
                            value={formikStep3.values.confirmPassword}
                            onChange={formikStep3.handleChange}
                            onBlur={formikStep3.handleBlur}
                            placeholder='Confirm your password'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        />
                        <span

                            onClick={toggleConfirmPasswordVisibility}
                            className='absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer'
                        >

                            {showConfirmPassword ? <IoEye /> : <IoEyeOff />}
                        </span>
                        {formikStep3.touched.confirmPassword && formikStep3.errors.confirmPassword && (
                            <div className='text-red-500 text-sm absolute mt-2'>{formikStep3.errors.confirmPassword}</div>
                        )}
                    </div>
                   
                    <div className='mt-5 p-2'>
                        <button type='submit' className='transition ease-in-out delay-150 bg-[#390b79]  hover: hover:bg-[#870e4d] duration-300 text-white px-4 py-2 rounded w-full'>Update</button>
                    </div>
                </form>

            )}
             {step === 3 && (
                <div className="bg-white w-auto h-auto  flex flex-row  overflow-hidden mt-11 ">
                <div className='w-[500px] h-[350px] border-gray-200 shadow-lg rounded-lg ml-1  flex flex-col overflow-hidden ' >
                    {/* <button onClick={handleBack} className=" top-20 left-5 text-gray-500 hover:text-gray-700">
                        <IoArrowBackCircleSharp />
                    </button> */}
                    <div className='w-full h-16   flex flex-row'>
                        <div className='ml-28 mt-5'>
                            <h2 className=" font-semibold text-black text-[20px]  ">Confirm your email</h2>
                        </div>
                    </div>
                    <hr className="border-t border-gray-300" />

                    <h2 className="  text-black text-[16px]  ml-5 mt-5 ">Enter the code we've sent via mail to {formikStep2.values.email}</h2>
                    <form onSubmit={formikStep4.handleSubmit}>


                        <div className='mt-1 p-4 flex justify-center '>
                            <input
                                type="tel"
                                id="otp"
                                name="otp"
                                value={formikStep4.values.otp}
                                onChange={formikStep4.handleChange}
                                onBlur={formikStep4.handleBlur}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="-- -- -- -- -- --"

                            />
                            {formikStep4.touched.otp && formikStep4.errors.otp && (
                                <div className="text-red-500 text-sm">{formikStep4.errors.otp}</div>
                            )}
                        </div>
                        <hr className="border-t border-gray-300 mt-10" />
                        <div className='mt-1 p-5 flex justify-center '>
                            <button type="submit" className=" transition ease-in-out delay-150 bg-[#390b79]  hover: hover:bg-[#870e4d] duration-300 text-white px-4 py-2 rounded w-40  " >Continue</button>
                        </div>
                    </form>
                </div>
            </div>


             )}

            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />
        </div>
    );
};

export default Loginform;
