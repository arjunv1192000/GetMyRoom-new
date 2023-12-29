import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import axios from '../Utils/user/axios';
import * as Yup from 'yup';
import Axios from "../Utils/Ssrvice/axios"
import { useDispatch } from "react-redux";
import { login } from '../../redux/reducer/userSlice';
import toast, { Toaster } from 'react-hot-toast';

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

const validationSchema = Yup.object({
  fullName: Yup.string().required('Full Name is required'),
  dob: Yup.date().required('Date of Birth is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
});

const Editprofile = ({ onClose }) => {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const userdata = useSelector((state: RootState) => state.user.value);
  const id = userdata.id;

  const handleModalClose = () => {
    onClose();
  };

  useEffect(() => {
    axios.get('/getprofile?id=' + id).then((response) => {
      setProfile(response.data.profiledata);
      console.log(response.data.profiledata, "data fromdb");

    })
      .catch((response) => {
        console.error(response.message);
      });
  }, [id]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: profile?.name || '',
      dob: profile?.dob || '',
      email: profile?.email || '',
      profileImage: profile?.image || null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        let imageUrls;

        if (selectedFile) {
          const imageResponse = await Axios.get('/s3service');
          const imageUrl = imageResponse.data.response;




          const imageUploadResponse = await fetch(imageUrl, {
            method: 'PUT',
            body: selectedFile,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          imageUrls = imageUrl.split('?')[0];
         
          

        } else {

           imageUrls = values.profileImage;
          


        }

        const body = {
          name: values.fullName,
          dob:values.dob,
          email:values.email,
          image:imageUrls,
          userId: id
        };

     
        
        axios.post('/updateuserdata', body).then((response) => {


          if (response.data.status === true) {
            console.log(response.data, "ppppp");
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
            toast.success('updated Successfully')
            handleModalClose();
            window.location.reload();


          }
        })
          .catch((response) => {
            console.error(response.message);
          });

      } catch (error) {

      }



    },
  });
  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue('profileImage', file);
    setSelectedFile(file);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">

        <div className="bg-white w-[800px] h-auto border-gray-200 shadow-lg rounded-lg p-10">
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

          <div className="mt-5 p-2">
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

            />
            {formik.touched.fullName && formik.errors.fullName && (
              <div className="text-red-500 text-sm">{formik.errors.fullName}</div>
            )}
          </div>

          <div className="mt-1 p-2">
            <input
              type="date"
              id="dob"
              name="dob"
              value={formik.values.dob}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

            />
            {formik.touched.dob && formik.errors.dob && (
              <div className="text-red-500 text-sm">{formik.errors.dob}</div>
            )}
          </div>

          <div className="mt-1 p-2">
            <input
              type="email"
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )}
          </div>

          <div className="mt-5 p-2">
            <label htmlFor="profileImage" className="text-gray-600">
              Profile Image:
            </label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              name="profileImage"
              onChange={handleImageChange}
              className="mt-1 block w-full p-2.5"
            />
            {/* {formik.touched.profileImage && formik.errors.profileImage && (
              <div className="text-red-500 text-sm">{formik.errors.profileImage}</div>
            )} */}
            {profile?.image && typeof profile.image === 'string' && (
              <img
                src={profile.image}
                alt="Profile Preview"
                className="mt-2 block w-20 h-20 object-cover rounded"
              />
            )}
          </div>

          <div className='flex justify-end'>
            <button type="submit" className="mt-3 p-3 bg-[#390b79] text-white rounded-md w-40 ">
              Update
            </button>

          </div>
        </div>


        <Toaster
          position="bottom-center"
          reverseOrder={false}
        />


      </div>
    </form>
  );
};

export default Editprofile;
function handleModalClose() {
  throw new Error('Function not implemented.');
}

