import { useState } from 'react';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from '../Utils/user/axios';
import { useDispatch } from "react-redux";
import { login } from '../../redux/reducer/userSlice';
import Axios from "../Utils/Ssrvice/axios"
import toast, { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { LoginSocialGoogle } from 'reactjs-social-login';
import { GoogleLoginButton } from 'react-social-login-buttons';






const Registercomponent = ({ onBack, onClose }) => {
    const dispatch = useDispatch();

    const [step, setStep] = useState(1);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [googleRegistrationData, setGoogleRegistrationData] = useState(null);




    const validationSchemaStep1 = Yup.object({
        selectedCountryCode: Yup.string().required('Country code is required'),
        phoneNumber: Yup.string().required('Phone number is required'),
    });
    const validationSchemaStep2 = Yup.object({
        otp: Yup.string().matches(/^\d{6}$/, 'OTP must be a 6-digit number').required('OTP is required'),
    });
    const validationSchemaStep3 = Yup.object({
        fullName: Yup.string()
            .trim()
            .matches(/^[A-Za-z\s]+$/, 'Name cannot contain numbers')
            .min(5, 'Full name must be at least 5 characters')
            .required('Full name is required'),

        dob: Yup.string().required('DOB is required'),

        email: Yup.string()
            .trim()
            .email('Invalid email')
            .required('Email is required'),

        image: Yup.mixed()
            .nullable()
            .required('Image is required') as Yup.MixedSchema<FileList | null>,
    });


    const handleImageChange = (event: { currentTarget: { files: any[]; }; }) => {
        formikStep3.setFieldValue('image', event.currentTarget.files[0]);
    };

    const validationSchemaStep4 = Yup.object({
        selectedCountryCodes: Yup.string().required('Country code is required'),
        phoneNumber: Yup.string()
            .required('Phone number is required')
            .matches(/^[0-9]{11}$/, 'Invalid phone number'),
        dob: Yup.string().required('Date of birth is required'),
    });





    const handleBack = () => {
        if (step === 2 || step === 4) {
            setStep(1);

        } else {
            setStep(2)

        }
    };



    const handleModalClose = () => {
        onBack();
        onClose();
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


            axios.post('/register', body)
                .then((response) => {
                    console.log(response.data, "loooo");
                    if (response.data.status === true) {
                        console.log(response.data, "loooo");
                        setPhoneNumber(response.data.phone);
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
            otp: '',
        },
        validationSchema: validationSchemaStep2,
        onSubmit: (values) => {

            const body = {
                phoneNumber: phoneNumber,
                otp: values.otp
            };


            axios.post('/verifyotp', body)
                .then((response) => {
                    if (response.data.status === true) {
                        console.log(response.data);
                        setStep(3);

                    } else {
                        toast.error("Invalid OTP")
                    }
                })
                .catch((response) => {
                    console.error(response.message);
                });



        },
    });

    const formikStep3 = useFormik({
        initialValues: {
            fullName: '',
            dob: '',
            email: '',
            image: '',
        },
        validationSchema: validationSchemaStep3,

        onSubmit: async (values) => {
            const fileimg = values.image;
            if (!fileimg) {
                formikStep3.setFieldError('image', 'Image is required');
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
                    phoneNumber: phoneNumber,
                    name: values.fullName,
                    dob: values.dob,
                    email: values.email,
                    image: userimage,
                };
                axios.post('/adduserdata', body)
                    .then((response) => {
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

    const googleregister = (body: { fullname: any; email: any; image: any; }) => {

        // console.log(body, "fjnfbfbfk");
        // setGoogleRegistrationData(body);

        // setStep(4);

        axios.post('/googlesignup', body)
            .then((response) => {
                if (response.data.status === true) {
                    console.log(response.data);
                    localStorage.setItem('access_token_user', response.data.AccessToken);
                    localStorage.setItem('refresh_token_user', response.data.RefreshToken);
                    dispatch(login({
                        id: response.data.isUser.userId,
                        name: response.data.isUser.userName,
                        email: response.data.isUser.userEmail,
                        image: response.data.isUser.userimg,
                        access_token: response.data.AccessToken,

                    }));
                    toast.success('Successfully Added!')
                    handleModalClose();

                } else {
                    toast.error(response.data.message);

                }
            })
            .catch((response) => {
                console.error(response.message);
            });

    }







    const formikStep4 = useFormik({
        initialValues: {
            phoneNumber: '',
            dob: '',
        },
        validationSchema: validationSchemaStep4,
        onSubmit: (values) => {

            const fullPhoneNumber = `${values.selectedCountryCodes} ${values.phoneNumber}`;

            console.log(googleRegistrationData);



            const body = {
                ...googleRegistrationData,
                phoneNumber: fullPhoneNumber,
                dob: values.dob,
            };
            console.log(body, "ppppp");

            axios.post('/googlesignup', body)
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
                        toast.success('Successfully Added!')
                        handleModalClose();

                    } else {
                        toast.error(response.data.message);
                        setTimeout(() => {

                            setStep(1);

                        }, 1500);

                    }
                })
                .catch((response) => {
                    console.error(response.message);
                });



        },
    });


    return (
        <div>

            <div className='flex justify-center mt-5'>
                <h2 className=" font-semibold text-black text-[25px]  ml-5  ">Login</h2>
            </div>
            <div className='mt-5 p-2 flex justify-center flex-col'>
                {/* <GoogleOAuthProvider clientId="1084048115629-v02evalrb9gqteqs5lt8pmlc5kgqamo4.apps.googleusercontent.com">
                    <GoogleLogin
                        onSuccess={(credentialResponse) => {
                            const decoded = jwtDecode(credentialResponse.credential);
                            const body = {
                                fullname: decoded.name,
                                email: decoded.email,
                                image: decoded.picture,
                            }


                            googleregister(body)
                        }}
                        onError={() => {
                            toast.error("Register failed !")
                        }}
                        width={300}

                    />

                </GoogleOAuthProvider> */}


                <LoginSocialGoogle
                    client_id="1084048115629-v02evalrb9gqteqs5lt8pmlc5kgqamo4.apps.googleusercontent.com"
                    redirect_uri="https://getmyroom.co.uk/"
                    scope="openid profile email"
                    discoveryDocs="claims_supported"
                    onResolve={({ provider, data }: any) => {

                        const body = {
                            name: data.name,
                            email: data.email,
                            image: data.picture
                        };
                      
                        googleregister(body)

                        
                    }}
                    onReject={err => {
                        console.log("Rejected:", err);
                    }}
                >
                    <GoogleLoginButton />
                </LoginSocialGoogle>





            </div>


            {step === 1 && (
                <>
                    <form onSubmit={formikStep1.handleSubmit}>
                        {/* <div className='flex justify-center mt-5'>
                            <h2 className=" font-semibold text-black text-[25px]  ml-5  ">Login</h2>
                        </div> */}
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
                                <div className="text-red-500 text-[12px] ml-2 mt-2 ">{formikStep1.errors.phoneNumber}</div>
                            )}

                        </div>
                        <div>

                            <p className="text-xs text-gray-600 mt-1 ml-3">
                                We’ll call or text you to confirm your number. Standard message and data rates apply<a href="/privacy-policy" className="text-blue-500">Privacy Policy</a>.
                            </p>
                        </div>
                        <div className='mt-5 p-2'>
                            <button type='submit' className=" transition ease-in-out delay-150 bg-[#390b79]  hover: hover:bg-[#870e4d] duration-300 text-white px-4 py-2 rounded w-full " >Register</button>

                        </div> */}
                    </form>
                    <div className="flex items-center justify-center p-2">
                        {/* <hr className="border-t border-gray-300 flex-grow mr-2" />
                        <span className="text-gray-500">or</span>
                        <hr className="border-t border-gray-300 flex-grow ml-2" /> */}
                    </div>
                    {/* <div className='mt-5 p-2 flex justify-center'>
                        <GoogleOAuthProvider clientId="1084048115629-gpikjorqk28djapdi3qid41bn8k3k67e.apps.googleusercontent.com">
                            <GoogleLogin
                                onSuccess={(credentialResponse) => {
                                    const decoded = jwtDecode(credentialResponse.credential);
                                    const body = {
                                        fullname: decoded.name,
                                        email: decoded.email,
                                        image: decoded.picture,
                                    }

                                   
                                    googleregister(body)
                                }}
                                onError={() => {
                                    toast.error("Register failed !")
                                }}
                                width={300}

                            />

                        </GoogleOAuthProvider>


                    </div> */}
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
            {step === 3 && (
                <>
                    <div >
                        {/*------------------------------------------------------------------------------Profile details------------------------------------------------------------------------------------- */}
                        <div className='flex justify-center mt-1  '>
                            <h2 className=" font-semibold text-black text-[20px]  ml-5  ">Finish signing up</h2>
                        </div>
                        <button onClick={handleBack} className=" top-20 left-5 text-gray-500 hover:text-gray-700">
                            <IoArrowBackCircleSharp />
                        </button>
                        <form onSubmit={formikStep3.handleSubmit}>
                            <div className='mt-5 p-2'>

                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formikStep3.values.fullName}
                                    onChange={formikStep3.handleChange}
                                    onBlur={formikStep3.handleBlur}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Full Name"

                                />
                                {formikStep3.touched.fullName && formikStep3.errors.fullName && (
                                    <div className="text-red-500 text-sm">{formikStep3.errors.fullName}</div>
                                )}

                            </div>

                            <div className='mt-1 p-2'>
                                <input
                                    type="date"
                                    id="dob"
                                    name="dob"
                                    value={formikStep3.values.dob}
                                    onChange={formikStep3.handleChange}
                                    onBlur={formikStep3.handleBlur}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Date of birth"

                                />
                                {formikStep3.touched.dob && formikStep3.errors.dob && (
                                    <div className="text-red-500 text-sm">{formikStep3.errors.dob}</div>
                                )}


                            </div>
                            <div className='mt-1 p-2'>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formikStep3.values.email}
                                    onChange={formikStep3.handleChange}
                                    onBlur={formikStep3.handleBlur}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Email"

                                />
                                {formikStep3.touched.email && formikStep3.errors.email && (
                                    <div className="text-red-500 text-sm">{formikStep3.errors.email}</div>
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
                                    onBlur={formikStep3.handleBlur}
                                    className="mt-1 block w-full p-2.5"
                                />
                                {formikStep3.touched.image && formikStep3.errors.image && (
                                    <div className="text-red-500 text-sm">{formikStep3.errors.image}</div>
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

                        {/*------------------------------------------------------------------------------Profile end------------------------------------------------------------------------------------- */}
                    </div>


                </>


            )}
            {step === 4 && (
                <div>
                    <form onSubmit={formikStep4.handleSubmit}>
                        <div className='mt-5 p-2'>
                            <select
                                id="countryCode"
                                name='selectedCountryCodes'
                                value={formikStep4.values.selectedCountryCodes}
                                onChange={formikStep4.handleChange}
                                onBlur={formikStep4.handleBlur}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >

                                <option value=""></option>
                                <option value="+44">+44(UK)</option>
                            </select>
                            {formikStep4.touched.selectedCountryCodes && formikStep4.errors.selectedCountryCodes && (
                                <div className="text-red-500 text-[12px] ml-2 mt-2 ">{formikStep4.errors.selectedCountryCodes}</div>
                            )}

                        </div>
                        <div className='mt-1 p-2'>
                            <input
                                type="tel"
                                id="phone"
                                name='phoneNumber'
                                value={formikStep4.values.phoneNumber}
                                onChange={formikStep4.handleChange}
                                onBlur={formikStep4.handleBlur}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Phone number"
                            />
                            {formikStep4.touched.phoneNumber && formikStep4.errors.phoneNumber && (
                                <div className="text-red-500 text-[12px] ml-2 mt-2 ">{formikStep4.errors.phoneNumber}</div>
                            )}

                        </div>

                        <div className='mt-1 p-2'>
                            <input
                                type="date"
                                id="dob"
                                name="dob"
                                value={formikStep4.values.dob}
                                onChange={formikStep4.handleChange}
                                onBlur={formikStep4.handleBlur}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Date of birth"
                            />
                            {formikStep4.touched.dob && formikStep4.errors.dob && (
                                <div className="text-red-500 text-sm">{formikStep4.errors.dob}</div>
                            )}
                        </div>

                        <div className='mt-5 p-2'>
                            <button type="submit" className=" transition ease-in-out delay-150 bg-[#390b79]  hover: hover:bg-[#870e4d] duration-300 text-white px-4 py-2 rounded w-full">
                                Finish Registration
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />

        </div>
    )
}

export default Registercomponent


