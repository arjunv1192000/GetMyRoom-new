import { useFormik } from 'formik';
import * as Yup from 'yup';
import Axios from '../Utils/Ssrvice/axios';
import { useState, useEffect } from 'react';

const Floorplans = ({ handleFormDataChange }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [floorplanPreview, setFloorplanPreview] = useState(null);

  const validationSchema = Yup.object({
    image: Yup.mixed().when('hasFloorplan', {
      is: true,
      then: Yup.mixed().required('Please select a floorplan image'),
    }),
  });

  useEffect(() => {
    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith('floorplanUrlData='));

    if (cookieValue) {
      const data = JSON.parse(cookieValue.split('=')[1]);
      setFloorplanPreview(data.step6Data.floorplanUrl);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      hasFloorplan: false,
      image: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        if (values.hasFloorplan) {
          if (values.image) {
            const floorplanUrl = await uploadToS3(values.image);

            const expirationTime = new Date(Date.now() + 10 * 60 * 1000); 
            const floorplanUrlCookieValue = JSON.stringify({
              step6Data: { floorplanUrl },
            });
            document.cookie = `floorplanUrlData=${floorplanUrlCookieValue}; expires=${expirationTime.toUTCString()}; path=/`;

            handleFormDataChange({
              step6Data: { floorplanUrl },
            });
            setFormSubmitted(true);
            setFloorplanPreview(floorplanUrl);
          }
        } else {
          handleFormDataChange({
            step6Data: { floorplanUrl: 'Not available' },
          });
          setFormSubmitted(true);
        }
      } catch (error) {
        console.error('Error uploading file to S3:', error);
      }
    },
  });

  const uploadToS3 = async (file) => {
    try {
      const s3Response = await Axios.get('/s3service');
      const s3Url = s3Response.data.response;

      const uploadResponse = await fetch(s3Url, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const fileUrl = s3Url.split('?')[0];
      return fileUrl;
    } catch (error) {
      throw error;
    }
  };

  const handleImageChange = (event) => {
    formik.setFieldValue('image', event.currentTarget.files[0]);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mx-auto max-w-2xl px-4 py-1 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 flex flex-col sm:flex-row  justify-center ">
        <div className="w-full sm:w-1/2 h-auto sm:flex flex-col">
          <h5 className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold  text-gray-900 dark:text-white ">
            Add floor plan of your property
          </h5>
          {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            You'll need 1 photo to get started.
          </p> */}
          <div className="flex flex-col gap-2 p-3 border-dotted border-2 border-gray-300 mt-10">
            <label>
              <input
                type="radio"
                name="hasFloorplan"
                value={true}
                checked={formik.values.hasFloorplan === true}
                onChange={formik.handleChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="hasFloorplan"
                value={false}
                checked={formik.values.hasFloorplan === false}
                onChange={formik.handleChange}
              />
              No
            </label>
            {formik.touched.hasFloorplan && formik.errors.hasFloorplan && (
              <div className="text-red-500 text-sm">{formik.errors.hasFloorplan}</div>
            )}
            {formik.values.hasFloorplan && (
              <>
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={handleImageChange}
                  onBlur={formik.handleBlur}
                  className="border border-dashed border-gray-300 p-2 rounded-md"
                />
                {formik.touched.image && formik.errors.image && (
                  <div className="text-red-500 text-sm">{formik.errors.image}</div>
                )}
              </>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className={`mt-3 p-3 w-32 rounded-md ${
                formSubmitted ? 'bg-green-500 text-white' : 'bg-[#390b79] text-white'
              }`}
            >
              {formSubmitted ? 'Added!' : 'Add'}
            </button>
          </div>
          {floorplanPreview && (
            <div className="mt-3">
              <p className="font-semibold">Floorplan Preview:</p>
              <img src={floorplanPreview} alt="Floorplan Preview" className="mt-2 w-full h-60 object-contain" />
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default Floorplans;
