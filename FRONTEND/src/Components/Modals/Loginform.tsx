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
                        toast.success('Successfully Added!')
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

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
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
                         {showPassword ?  <IoEye />: <IoEyeOff />}
                    </span>
                    {formikStep1.touched.password && formikStep1.errors.password && (
                        <div className='text-red-500 text-sm absolute mt-2'>{formikStep1.errors.password}</div>
                    )}
                </div>
                <div>
                    <p className='text-xs text-gray-600 mt-5 ml-3'>
                        We’ll call or text you to confirm your number. Standard message and data rates apply
                        <a href='/privacy' className='text-blue-500'>
                            Privacy Policy
                        </a>
                        .
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
            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />
        </div>
    );
};

export default Loginform;
