import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Axios from "../Utils/Ssrvice/axios"
import img4 from '../../assets/contact-img.png'


const Images = ({ handleFormDataChange }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [error, setError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [cookiePreview, setCookiePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const isValidImage = (file) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
   

    if (!allowedTypes.includes(file.type)) {
      setError('Please select a valid image file (JPEG or PNG).');
      return false;
    }

  
    return true;
  };

  const handleImageChange = (event) => {
    const files = event.target.files;
    const newImages = [];

    setError('');

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (isValidImage(file)) {
        newImages.push(file);
      } else {
        setError('Invalid image format or size.');
      }
    }

    setSelectedImages([...selectedImages, ...newImages]);

  };

  const formik = useFormik({
    initialValues: {
      selectedImages: [],
    },
    onSubmit: async (values) => {
      if (selectedImages.length < 4) {
        setError('Please select at least 4 images.');
        return;
      }
      try {
        setLoading(true);

        const selectedImagesArray = Array.from(selectedImages);




        const s3Urls = await Promise.all(selectedImagesArray.map(async (file) => {
          const imageResponse = await Axios.get('/s3service');



          return imageResponse.data.response;
        }));


        const uploadPromises = selectedImages.map(async (file, index) => {
          const s3Url = s3Urls[index];

          const imageUploadResponse = await fetch(s3Url, {   
            method: 'PUT',
            body: file,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          const userimage = imageUploadResponse.url.split('?')[0];
          return userimage;
        });

        const uploadedImageUrls = await Promise.all(uploadPromises);


        const expirationTime = new Date(Date.now() + 3 * 60 * 1000);
        const uploadedImagesCookieValue = JSON.stringify({ step5Data: uploadedImageUrls });
        document.cookie = `uploadedImages=${uploadedImagesCookieValue}; expires=${expirationTime.toUTCString()}; path=/`;


        handleFormDataChange({ step5Data: uploadedImageUrls });
        setCookiePreview(uploadedImageUrls);
        setFormSubmitted(true);
      } catch (error) {
        console.error('Error uploading images to S3:', error);
      } finally {
        setLoading(false);
      }
    },
  });
  useEffect(() => {

    const cookieValue = document.cookie.split('; ').find((row) => row.startsWith('uploadedImages='));

    if (cookieValue) {
      const data = JSON.parse(cookieValue.split('=')[1]);
      setCookiePreview(data.step5Data);
    }
  }, []);


  return (
    <div className="mx-auto max-w-2xl px-4 py-1 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8 flex flex-col sm:flex-row  mb-30 ">
      <div className='w-full sm:w-1/2 h-[400px] sm:flex flex-col '>
        <h5 className="  text-[36px] font-semibold  text-gray-900  ">Step 3</h5>
        <h5 className="mb-2 text-2xl font-semibold  text-gray-900 ">Tell us about your features</h5>
        <p className=" font-semibold text-gray-700 dark:text-gray-400">In this step, we'll ask you which type of property you have</p>
        <img
          className="w-[60%] ml-10 mt-10 sm:object-contain w-[400px] flex justify-center "
          src={img4}
          alt=""
        ></img>
      </div>
      <div className='w-full  h-auto sm:flex flex-col sm:ml-36 mb-20 '>
        <h5 className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold  text-gray-900 ">Add some photos of your house</h5>
        <p className="mb-3 font-semibold text-gray-700 ">You'll need 4 photos to get started.</p>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 p-2 border-dotted border-2 border-gray-300">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="relative">

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, index)}
                  className="border border-dashed border-gray-300 p-2  rounded-md h-44 flex justify-center"
                />

                {(selectedImages[index] || cookiePreview) && (
                  <img
                    src={selectedImages[index] ? URL.createObjectURL(selectedImages[index]) : cookiePreview[index]}
                    alt={`Preview ${index + 1}`}
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
                  />
                )}
              </div>
            ))}
          </div>

          {error && (
            <div className="text-red-500 mt-2">
              <p>{error}</p>
            </div>
          )}
          <div className='flex justify-end mb-10'>
            <button
              type="submit"
              className={`mt-3 p-3 w-32 rounded-md flex items-center justify-center ${loading
                ? 'bg-gray-500 text-white cursor-not-allowed'
                : formSubmitted
                  ? 'bg-green-500 text-white'
                  : 'bg-[#390b79] text-white '
                }`}
              disabled={loading}
            >
              <div className="flex items-center justify-center"> 
                {loading ? (
                  <>
                    <svg width="20" height="20" fill="currentColor" className="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                      <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
                      </path>
                    </svg>
                    <span>Loading</span> 
                  </>
                ) : formSubmitted ? (
                  'Added!'
                ) : (
                  'Add'
                )}
              </div>
            </button>


            {/* <button
              type="submit"
              className={`mt-3 p-3 w-32  rounded-md ${formSubmitted ? 'bg-green-500 text-white' : 'bg-[#390b79] text-white'
                }`}
            >
              {formSubmitted ? 'Added!' : 'Add'}
            </button> */}

          </div>

        </form>
      </div>
    </div>
  );
};

export default Images;
