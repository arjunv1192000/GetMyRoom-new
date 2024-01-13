import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Axios from "../Utils/Ssrvice/axios"
import img4 from '../../assets/contact-img.png'


const Images = ({ handleFormDataChange }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [error, setError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [cookiePreview, setCookiePreview] = useState(null);

  const isValidImage = (file) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    const maxSize = 4 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      setError('Please select a valid image file (JPEG or PNG).');
      return false;
    }

    if (file.size > maxSize) {
      setError('Selected image size exceeds the maximum allowed (5MB).');
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
        <h5 className="  text-[36px] font-bold tracking-tight text-gray-900 dark:text-white ">Step 3</h5>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Tell us about your features</h5>
        <p className=" font-normal text-gray-700 dark:text-gray-400">In this step, we'll ask you which type of property you have</p>
        <img
          className="w-[60%] ml-10 mt-10 sm:object-contain w-[400px] flex justify-center "
          src={img4}
          alt=""
        ></img>
      </div>
      <div className='w-full  h-auto sm:flex flex-col sm:ml-36 mb-20 '>
        <h5 className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-gray-900 dark:text-white p-3">Add some photos of your house</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">You'll need 4 photos to get started.</p>
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
          {/* {cookiePreview && (
            <div className="mt-3">
              <p className="font-semibold">Uploaded Images Preview:</p>
              {cookiePreview.map((url, index) => (
                <img key={index} src={url} alt={`Image Preview ${index + 1}`} className="mt-2 max-w-full" />
              ))}
            </div>
          )} */}
          <div className='flex justify-end mb-10'>
            <button
              type="submit"
              className={`mt-3 p-3 w-32  rounded-md ${formSubmitted ? 'bg-green-500 text-white' : 'bg-[#390b79] text-white'
                }`}
            >
              {formSubmitted ? 'Added!' : 'Add'}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default Images;
