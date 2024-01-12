import { useEffect, useState } from "react";
// import Editprofile from "./Modals/Editprofile";
import { useSelector } from "react-redux";
import axios from "../Components/Utils/user/axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { login } from '../redux/reducer/userSlice';
import toast, { Toaster } from 'react-hot-toast';
import Axios from "../Components/Utils/Ssrvice/axios"
import { IoEye, IoEyeOff } from 'react-icons/io5';
import avatar from "../assets/avatar.png"

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

const Profile = () => {
  const dispatch = useDispatch();
  // const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [profile, setprofile] = useState<any>(null);
  const userdata = useSelector((state: RootState) => state.user.value);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const id = userdata.id;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // const openEditModal = () => {
  //   setEditModalOpen(true);
  // };

  // const closeEditModal = () => {
  //   setEditModalOpen(false);
  // };

  useEffect(() => {
    axios
      .get("/getprofile?id=" + id)
      .then((response) => {
        setprofile(response.data.profiledata);
      })
      .catch((response) => {
        console.error(response.message);
      });
  }, [id]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
  });

  const validationSchema1 = Yup.object().shape({
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: profile?.name || '',
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
          name: values.name,
          email: values.email,
          image: imageUrls,
          userId: id
        };

        console.log(body);




        axios.post('/updateuserdata', body).then((response) => {


          if (response.data.status === true) {
            localStorage.setItem('access_token_user', response.data.AccessToken);
            localStorage.setItem('refresh_token_user', response.data.RefreshToken);
            dispatch(login({
              id: response.data.isUser.userId,
              name: response.data.isUser.userName,
              email: response.data.isUser.userEmail,
              image: response.data.isUser.userimg,
              access_token: response.data.AccessToken,

            }));
            toast.success('updated Successfully')
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
  const handleImageChange = (event: { currentTarget: { files: any[]; }; }) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue('profileImage', file);
    setSelectedFile(file);
  };






  const formik1 = useFormik({
    initialValues: {
      password: '',
      confirmpassword: '',
    },
    validationSchema: validationSchema1,
    onSubmit: (values) => {
      const body = {
        email: formik.values.email,
        password: values.password,
      };

      console.log(body);
      axios.post('/updatepassword', body)
        .then((response) => {
          if (response.data.status === true) {

            toast.success('Successfully Update the password')
            setShowPasswordFields(false);



          } else {

            toast.error("error updating password")

          }
        })
        .catch((response) => {
          console.error(response.message);
        });



    },
  });
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const handleUpdatePasswordClick = () => {
    setShowPasswordFields(!showPasswordFields);
    formik1.resetForm();
  };

  return (
    <div className=" p-10 sm:p-20 ml-1 sm:ml-20 w-[90%] ">
      <form onSubmit={formik.handleSubmit}>
        <div className="w-full h-auto flex  flex-col sm:flex-row justify-between">
          <div>
            <h1 className="text-2xl font-bold pt-8 lg:pt-0">General Info</h1>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Use the form below to update your profile.</p>
          </div>
          <button
            type="submit"
            className="text-white bg-[#870e4d]  font-medium rounded-lg text-sm w-full h-12 sm:w-auto px-10 py-2.5 text-center "
          >
            Save Profile
          </button>
        </div>

        <div className="grid gap-6 mb-6 md:grid-cols-2 mt-5">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            )}
          </div>
          <div>
            <div className="relative rounded-lg shadow-xl mx-auto h-24 w-24 bg-cover bg-center">
              {profile?.image && profile?.image !== 'Not available' ? (
               <img
               src={selectedFile ? URL.createObjectURL(selectedFile) :profile?.image }
               className="object-fill rounded-lg shadow-xl mx-auto mt-6 h-24 w-24 bg-cover bg-center"
               alt="Profile"
             />
              ) : (
                <img
                src={selectedFile ? URL.createObjectURL(selectedFile) :  avatar}
                className="object-fill rounded-lg shadow-xl mx-auto mt-6 h-24 w-24 bg-cover bg-center"
                alt="Profile"
              />
              )}


              
              <label
                htmlFor="profileImage"
                className="absolute bottom-0 right-0 bg-[#870e4d] text-white w-8 h-8 rounded-full p-2 cursor-pointer text-xs"
              >
                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  name="profileImage"
                  className="hidden"
                  onChange={handleImageChange}
                />
                Edit
              </label>
            </div>
          </div>

        </div>


        <div className="w-full h-auto flex justify-end mt-16 ">
          <div className="w-full h-auto flex  flex-col sm:flex-row justify-between">
            <div>
              <h1 className="text-2xl font-bold pt-8 lg:pt-0">Email Address</h1>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Use this form to update your email.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          )}
        </div>
      </form>
      <div className="w-full h-auto flex justify-end mt-16">
        <div className="w-full h-auto flex  flex-col sm:flex-row justify-between">
          <div>
            <h1 className="text-2xl font-bold pt-8 lg:pt-0">Password</h1>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Use this button update your password.
            </p>
          </div>
          <button
            type="button"
            onClick={handleUpdatePasswordClick}
            className="text-white bg-[#870e4d] font-medium rounded-lg text-sm w-full h-12 sm:w-auto px-10 py-2.5 text-center"
          >
            Update Password
          </button>
        </div>
      </div>

      {showPasswordFields && (
        <>
          <form onSubmit={formik1.handleSubmit}>
            <div className="mb-6 relative">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={formik1.handleChange}
                onBlur={formik1.handleBlur}
                value={formik1.values.password}
              />
              <span
                className='absolute right-4 top-2/3 transform -translate-y-1/2 cursor-pointer '
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <IoEye /> : <IoEyeOff />}
              </span>
              {formik1.touched.password && formik1.errors.password && (
                <div className="text-red-500 text-sm absolute mt-2">{formik1.errors.password}</div>
              )}
            </div>
            <div className="mb-6 relative mt-5">
              <label
                htmlFor="confirmpassword"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm password
              </label>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmpassword"
                name="confirmpassword"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={formik1.handleChange}
                onBlur={formik1.handleBlur}
                value={formik1.values.confirmpassword}
              />
              <span

                onClick={toggleConfirmPasswordVisibility}
                className='absolute right-4 top-2/3 transform -translate-y-1/2 cursor-pointer'
              >

                {showConfirmPassword ? <IoEye /> : <IoEyeOff />}
              </span>
              {formik1.touched.confirmpassword && formik1.errors.confirmpassword && (
                <div className="text-red-500 text-sm absolute  ">{formik1.errors.confirmpassword}</div>
              )}
            </div>
            <button
              type="submit"
              className="text-white bg-[#870e4d]  font-medium rounded-lg text-sm w-full h-12 sm:w-auto px-10 py-2.5 text-center  mt-2"
            >
              Update
            </button>
          </form>
        </>
      )}
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
    </div>
  );
};

export default Profile;




// <div className="font-sans antialiased text-gray-900 leading-normal tracking-wider bg-cover bg-slate-400">
//   <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my- lg:my-0">
//     <div id="profile" className="w-full mt-20 lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0 ">
//       <div className="p-4 md:p-12 text-center lg:text-left">
//         <div className="block lg:hidden rounded-full shadow-xl mx-auto mt-16 h-60 w-48 bg-cover bg-center ">
//           <img src={profile?.image} className="object-fill block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-60 w-48 bg-cover bg-center" />

//         </div>
//         <h1 className="text-3xl font-bold pt-8 lg:pt-0">{profile?.name}</h1>
//         <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
//         <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
//           {profile?.email}
//         </p>
//         {/* <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
//          {profile?.phone}
//         </p>
//         <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
//          {profile?.dob}
//         </p> */}
//         <button className=" mr-20 transition ease-in-out delay-150 bg-[#390b79]  hover: hover:bg-[#870e4d] duration-300 text-white px-4 py-2 rounded w-20 h-10 mt-5  " onClick={openEditModal} >Edit</button>
//       </div>
//     </div>
//     <div className="w-full mt-20 lg:w-2/5 ">
//       <img src={profile?.image} className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block w-full h-auto object-fill " alt="Profile" />
//     </div>
//     {isEditModalOpen && <Editprofile onClose={closeEditModal} />}
//   </div>
// </div>