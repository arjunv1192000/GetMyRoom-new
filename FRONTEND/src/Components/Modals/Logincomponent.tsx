import { useState } from 'react';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from '../Utils/user/axios';
import { useDispatch } from "react-redux";
import { login } from '../../redux/reducer/userSlice';
import toast, { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

const Logincomponent = ({ onBack, isLogin, onClose }) => {
    const [step, setStep] = useState(1);
    const [phoneNumber, setPhoneNumber] = useState('');
    const dispatch = useDispatch();

    const validationSchemaStep1 = Yup.object({
        selectedCountryCode: Yup.string().required('Country code is required'),
        phoneNumber: Yup.string().required('Phone number is required'),
    });
    const validationSchemaStep2 = Yup.object({
        otp: Yup.string().matches(/^\d{6}$/, 'OTP must be a 6-digit number').required('OTP is required'),
    });


    const handleModalClose = () => {
        onBack();
        onClose();
    };


    const handleBack = () => {
        if (step === 2) {
            setStep(1);
            onBack();
        }
    };
    const handleSwitchComponent = () => {
        setStep(1);
        onBack();
        setLogin(!isLogin);
    };


    const formikStep1 = useFormik({
        initialValues: {
            selectedCountryCode: '',
            phoneNumber: '',
        },
        validationSchema: validationSchemaStep1,
        onSubmit: (values) => {



            const fullPhoneNumber = `${values.selectedCountryCode} ${values.phoneNumber}`;

            const body = {
                phoneNumber: fullPhoneNumber
            };


            axios.post('/login', body)
                .then((response) => {
                    if (response.data.status === true) {
                        console.log(response.data);
                        setPhoneNumber(response.data.phone);
                        setStep(2);

                    } else {

                        toast.error(" Invalid phoneNumber")


                    }
                })
                .catch((response) => {
                    console.error(response.message);
                });



        },
    });

    const formikStep2 = useFormik({
        initialValues: {
            otp: '',
        },
        validationSchema: validationSchemaStep2,
        onSubmit: (values) => {



            const body = {
                phoneNumber: phoneNumber,
                otp: values.otp
            };
           

            axios.post('/verifyotplogin', body)
                .then((response) => {
                    if (response.data.status === true) {
                        console.log(response.data);
                        localStorage.setItem('access_token_user', response.data.AccessToken);
                        localStorage.setItem('refresh_token_user', response.data.RefreshToken);
                        dispatch(login({
                            id: response.data.isUser.userId,
                            name: response.data.isUser.userName,
                            email: response.data.isUser.userEmail,
                            phone: response.data.isUser.userphone,
                            image: response.data.isUser.userimg,
                            access_token: response.data.AccessToken,

                        }));


                        handleModalClose();

                    } else {
                        toast.error("Invalid OTP")
                    }
                })
                .catch((response) => {
                    console.error(response.message);
                });



        },
    });


    const googlelogin = (body: { fullname: any; email: any; image: any; }) => {

       
        axios.post('/googlelogin', body).then((response) => {

            if (response.data.status === true) {
                console.log(response.data);
                localStorage.setItem('access_token_user', response.data.AccessToken);
                dispatch(login({
                    id: response.data.isUser.userId,
                    name: response.data.isUser.userName,
                    email: response.data.isUser.userEmail,
                    phone: response.data.isUser.userphone,
                    image: response.data.isUser.userimg,
                    access_token: response.data.AccessToken,

                }));
                toast.success('user login Successfully')
                handleModalClose();


            } else {
                toast.error("user data is exsist")





            }

        }).catch((response) => {
            console.error(response.message);

        })


    }






    return (
        <div>
            {step === 1 && (
                <>
                    <form onSubmit={formikStep1.handleSubmit}>

                        <div className='flex justify-center mt-5'>
                            <h2 className=" font-semibold text-black text-[25px]  ml-5  ">Login</h2>
                        </div>
                        {/* <div className='mt-5 p-2'>
                            <select
                                id="countryCode"
                                name='selectedCountryCode'
                                value={formikStep1.values.selectedCountryCode}
                                onChange={formikStep1.handleChange}
                                onBlur={formikStep1.handleBlur}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value="+91">+91(India)</option>
                                <option value="+1">+1(Canada)</option>
                                <option value="+44">+44(UK)</option>
                            </select>
                            {formikStep1.touched.selectedCountryCode && formikStep1.errors.selectedCountryCode && (
                                <div className="text-red-500 text-[12px] ml-2 mt-2 ">{formikStep1.errors.selectedCountryCode}</div>
                            )}
                        </div>
                        <div className='mt-1 p-2'>
                            <input
                                type="tel"
                                id="phone"
                                name='phoneNumber'
                                value={formikStep1.values.phoneNumber}
                                onChange={formikStep1.handleChange}
                                onBlur={formikStep1.handleBlur}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Phone number"

                            />
                            {formikStep1.touched.phoneNumber && formikStep1.errors.phoneNumber && (
                                <div className="text-red-500 text-[12px] ml-2 mt-2">{formikStep1.errors.phoneNumber}</div>
                            )}

                        </div>
                        <div>

                            <p className="text-xs text-gray-600 mt-1 ml-3">
                                We’ll call or text you to confirm your number. Standard message and data rates apply<a href="/privacy-policy" className="text-blue-500">Privacy Policy</a>.
                            </p>
                        </div>
                        <div className='mt-5 p-2'>
                            <button type='submit' className=" transition ease-in-out delay-150 bg-[#390b79]  hover: hover:bg-[#870e4d] duration-300 text-white px-4 py-2 rounded w-full " >Login</button>

                        </div> */}
                        <div className="flex items-center justify-center p-2">
                            {/* <hr className="border-t border-gray-300 flex-grow mr-2" />
                            <span className="text-gray-500">or</span>
                            <hr className="border-t border-gray-300 flex-grow ml-2" /> */}
                        </div>
                        <div className='mt-5 p-2 flex justify-center'>
                            <GoogleOAuthProvider clientId="1084048115629-v02evalrb9gqteqs5lt8pmlc5kgqamo4.apps.googleusercontent.com">
                                <GoogleLogin
                                    onSuccess={(credentialResponse) => {
                                        const decoded = jwtDecode(credentialResponse.credential);
                                        const body = {
                                            fullname: decoded.name,
                                            email: decoded.email,
                                            image: decoded.picture,
                                        }


                                        googlelogin(body)
                                    }}
                                    onError={() => {
                                        toast.error("Register failed !")
                                    }}
                                    width={300}

                                />

                            </GoogleOAuthProvider>

                        </div>

                    </form>



                </>
            )}
            {/* {step === 2 && (
                <div className="bg-white w-auto h-auto  flex flex-row  overflow-hidden mt-11 ">

                    <div className='w-[500px] h-[350px] border-gray-200 shadow-lg rounded-lg ml-1  flex flex-col overflow-hidden ' >
                        <button onClick={handleBack} className=" top-20 left-5 text-gray-500 hover:text-gray-700">
                            <IoArrowBackCircleSharp />
                        </button>
                        <div className='w-full h-16   flex flex-row'>
                            <div className='ml-28 mt-5'>
                                <h2 className=" font-semibold text-black text-[20px]  ">Confirm your number</h2>
                            </div>
                        </div>
                        <hr className="border-t border-gray-300" />

                        <h2 className="  text-black text-[16px]  ml-5 mt-5 ">Enter the code we've sent via SMS to {phoneNumber}</h2>
                        <form onSubmit={formikStep2.handleSubmit}>
                            <div className='mt-1 p-4 '>
                                <input
                                    type="tel"
                                    id="otp"
                                    name="otp"
                                    value={formikStep2.values.otp}
                                    onChange={formikStep2.handleChange}
                                    onBlur={formikStep2.handleBlur}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="-- -- -- -- -- --"

                                />
                                {formikStep2.touched.otp && formikStep2.errors.otp && (
                                    <div className="text-red-500 text-sm">{formikStep2.errors.otp}</div>
                                )}
                            </div>
                            <hr className="border-t border-gray-300 mt-10" />
                            <div className='mt-1 p-5 flex justify-center '>
                                <button type="submit" className=" transition ease-in-out delay-150 bg-[#390b79]  hover: hover:bg-[#870e4d] duration-300 text-white px-4 py-2 rounded w-40  " >Continue</button>
                            </div>

                        </form>
                    </div>
                </div>
            )} */}

            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />

        </div >
    )
}


export default Logincomponent