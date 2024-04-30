import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from "../../admin/Utils/axios"
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { login } from '../../../redux/reducer/AdminSlice'
import { useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from 'react-icons/io5';


interface FormValues {
    email: string;
    password: string;


}
const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        } as FormValues,
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('email Required'),
            password: Yup.string().required('password Required'),
        }),
        onSubmit: (values) => {

            console.log(values);

            const body = {

                email: values.email,
                password: values.password,

            };


            axios.post("/login", body).then((response) => {


                if (response.data.status == true) {
                    console.log(response.data);

                    localStorage.setItem('access_token_admin', response.data.AccessToken)
                    localStorage.setItem('refresh_token_admin', response.data.RefreshToken)
                    dispatch(login({ id: response.data.isAdmin.recruiterId, email: response.data.isAdmin.recruiterEmail, jwt: response.data.AccessToken }))

                    navigate("/admin/dashboard")

                } else {
                    toast.error("Invalid email or password")




                }


            }).catch((response) => {
                console.error(response.message);



            })
        },
    });
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                    GetMyRoom Admin
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Welcome Admin.....
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Username
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className={`${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'
                                        } bg-gray-50 border text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                    placeholder="name@company.com"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                    required
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <p className="text-red-500 text-sm">{formik.errors.email}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Password
                                </label>
                                <div className='mt-5  relative '>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className={`${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'
                                        } bg-gray-50 border text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                    required
                                />
                                {formik.touched.password && formik.errors.password && (
                                    <p className="text-red-500 text-sm">{formik.errors.password}</p>
                                )}
                                    <span
                                        className='absolute right-3 top-5 transform -translate-y-1/2 cursor-pointer '
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <IoEye /> : <IoEyeOff />}
                                    </span>
                                </div>
                               
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-gray-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Sign in
                            </button>
                        </form>
                    </div>
                </div>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
            </div>
        </section>

    )
}

export default Login