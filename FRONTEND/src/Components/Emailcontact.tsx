
import post from "../assets/poster.jpg"
import { FaMapMarkerAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import Axios from "../Components/Utils/Ssrvice/axios"
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { BiBed } from "react-icons/bi";
import { MdMeetingRoom } from "react-icons/md";
import { FaBath } from "react-icons/fa6";

type RootState = {
    user: {
        value: {
            image: string | undefined;
            id: string | null;
            name: string | null;
            email: string | null;
            phone: string | null;
            access_token: string;
        };
    };
};

type Props = {
    id: string;
    title: string;
    location: {
        coordinates: {
            lat: number;
            lng: number;
        }
        locationName: string;
    };
    room: number;
    bathrooms: number;
    bedrooms: number;
    buildYear: string;
    date: string;
    approve: boolean;
    description: string;
    features: {
        interiorDetails: [string],
        otherFeatures: [string],
        outdoorDetails: [string],
        utilities: [string],
    };
    image: [string];
    price: number;
    video: string;
    userimg: string;
    username: string;
    Id: string;
    useremail: string;
    phone: string;
    Ids: string;

}

const validationSchema = Yup.object({
    fullName: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email address').required('Email address is required'),
    message: Yup.string().required('Message is required'),
});



const Emailcontact: React.FC<Props> = ({ title, location, room, bathrooms, bedrooms, image, price, userimg, username, useremail, phone, Ids }) => {
    const userdata = useSelector((state: RootState) => state.user.value);
    const navigate = useNavigate();

    const handleSubmit = (values: any) => {



        const body = {
            fullname: values.fullName,
            email: values.email,
            message: values.message,
            useremail: useremail,
            propertyname: title,
            location: location.locationName,
            name:username,

        }


        Axios.post('/nodemailer', body).then((response) => {




            if (response.data.response == true) {
               

                toast.success('Email send Successfully')

                navigate(`/details?Id=${Ids}`)


            } else {

            }

        })

    };

    return (
        <div className='bg-white '>
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8  flex flex-col sm:flex-row">
                <div className='w-full sm:w-1/2 h-auto sm:flex flex-col '>
                    <div className='ml-3 mt-5'>
                        <h2 className="font-semibold text-gray-900 text-[28px] ">Email agent</h2>
                    </div>

                    <Formik
                        initialValues={{
                            fullName: userdata.name || '',
                            email: userdata.email || '',
                            message: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form className="mt-5 p-2 mb-10 ">
                            <Field
                                type="text"
                                id="fullName"
                                name="fullName"
                                className="bg-gray-50 border mb-10 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Full Name"
                            />
                            <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm" />

                            <Field
                                type="email"
                                id="email"
                                name="email"
                                className="mt-1 p-4 bg-gray-50 border mb-10 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Email Address"
                            />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

                            {/* <Field
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                className="mt-1 p-4 bg-gray-50 border border-gray-300 mb-10 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Phone Number"
                            />
                            <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm" /> */}

                            <Field
                                as="textarea"
                                id="message"
                                name="message"
                                rows={5}
                                className="block mt-4 p-2.5 w-full text-sm text-gray-900 mb-10 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Your Message"
                            />
                            <ErrorMessage name="message" component="div" className="text-red-500 text-sm" />

                            <button
                                type="submit"
                                className="transition ease-in-out delay-150 bg-[#390b79] hover:bg-[#870e4d] duration-300 text-white px-4 py-2 rounded w-full h-12 mt-4"
                            >
                                Agree and continue
                            </button>
                        </Form>
                    </Formik>
                </div>
                <div className='w-full sm:w-1/2 h-auto flex justify-center'>
                    <div className=" w-[80%] h-auto bg-white border border-gray-200 rounded-lg shadow  hover:bg-gray-100 overflow-hidden mt-12">
                        <div className="flex flex-col">
                            <img className="object-cover w-full" src={image[0]} alt="" />
                            <div className='w-full flex flex-col'>
                                <div className='w-auto ml-2  sm:w-1/2 sm:ml-10'>
                                    <h2 className="flex  font-semibold text-gray-900 text-[20px] sm:text-[28px] md:text-[28px] lg:text-[30px] ">{title}</h2>

                                </div>
                                <div className='w-auto ml-2  sm:w-1/2 sm:ml-10'>

                                    <h2 className="font-semibold text-gray-900  text-[16px] sm:text-[28px] md:text-[24px] lg:text-[28px] ">${price}/month</h2>

                                </div>
                                <div className='w-auto ml-2 mt-3 sm:w-1/2 flex flex-row sm:ml-10 sm:mt-2'>
                                    <FaMapMarkerAlt className="w-3 h-3 mt-2 sm:mt-1.5 " />
                                    <h2 className="flex  justify-start font-semibold text-gray-900 text-[14px] sm:text-[28px] md:text-[30px] lg:text-[18px] ml-3 ">{location.locationName}</h2>

                                </div>

                                <div className="w-full h-20 flex flex-row  gap-6">
                                    {/* <div className='w-20 h-20 ml-4  flex flex-col items-center'>

                                        <MdMeetingRoom color="#870e4d" fill="#870e4d" className=" w-[20px] h-[20px] mt-5" />




                                        <h5 className="mb-2 text-sm  tracking-tight text-gray-900 mt-1"> {room} room</h5>


                                    </div> */}
                                    <div className='w-20 h-20  flex flex-col items-center'>
                                        <BiBed color="#870e4d" fill="#870e4d" className=" w-[20px] h-[20px] mt-5" />


                                        <h5 className="mb-2 text-sm  tracking-tight text-gray-900 mt-1"> {bathrooms}Beds</h5>

                                    </div>
                                    <div className='w-20 h-20  flex flex-col items-center'>
                                        <FaBath color="#870e4d" fill="#870e4d" className=" w-[20px] h-[20px] mt-5" />


                                        <h5 className="mb-2 text-sm  tracking-tight text-gray-900 mt-1">{bedrooms} Baths</h5>

                                    </div>
                                </div>


                            </div>
                        </div>
                        <hr className="border-t border-gray-300 mt-1" />
                        <div className='w-full h-20  flex justify-between'>
                            <div className="flex items-center w-1/2">
                                <div className="flex-shrink-0 ml-3">
                                    <img className="w-8 h-8 rounded-full" src={userimg} alt="Neil image" />
                                </div>
                                <div className="flex-1 min-w-0 ms-4">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        {username}
                                    </p>


                                </div>

                            </div>



                        </div>
                    </div>

                </div>



            </div>

            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div >
    )
}

export default Emailcontact