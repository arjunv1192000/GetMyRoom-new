import React, { useState } from 'react';
import post2 from '../../assets/shutterstock_1470527960.jpg'
import { IoArrowBackCircleSharp } from "react-icons/io5";
import countryData from 'country-data';
import Logincomponent from './Logincomponent';
import Registercomponent from './Registercomponent';




const Login = ({ onClose }) => {

    const [isOtpModalOpen, setOtpModalOpen] = useState(false);
    const [isLogin, setLogin] = useState(true);

    const closeOtpModal = () => {

        setOtpModalOpen(false);
    };

    function setStep(arg0: number): void {
        throw new Error('Function not implemented.');
    }
    const handleSwitchComponent = () => {
        setLogin(!isLogin);
    };

    return (

        <div className='w-[800px] h-auto border-gray-200 shadow-lg rounded-lg flex flex-row overflow-hidden pb-10 '>
           
            <div className='hidden md:block w-1/2 h-[550px]'>
                <img className="w-full h-[600px] object-cover" src={post2} alt="" />
            </div>

            <div className='w-full md:w-1/2 h-[550px] flex flex-col'>
                <div className="flex justify-between p-2">
                    <button
                        type="button"
                        className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="authentication-modal"
                        onClick={onClose}
                    >
                        <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>


                <Registercomponent onBack={() => setLogin(false)} isLogin={isLogin} onClose={onClose} />

                

                {/* {isLogin ? (
                    <Logincomponent onBack={() => setLogin(true)} isLogin={isLogin} onClose={onClose} />
                ) : (
                    <Registercomponent onBack={() => setLogin(false)} isLogin={isLogin} onClose={onClose} />
                )} */}

                {/* <div className='mt-2 text-center'>
                    <p className="text-[16px] text-gray-600">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <span className="text-blue-500 cursor-pointer" onClick={handleSwitchComponent}>
                            {isLogin ? "Register" : "Login"}
                        </span>
                    </p>
                </div> */}
            </div>
        </div>


    )
}

export default Login













