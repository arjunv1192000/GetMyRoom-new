import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import img2 from '../../assets/illustration_login.png';

const Hometitle = ({ handleFormDataChange }) => {

  const [formSubmitted, setFormSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: '',
    },
    onSubmit: (values) => {
     

      const titleDataString = JSON.stringify({ step7Data: values.title });
      const expirationTime = new Date(Date.now() + 5 * 60 * 1000);
      document.cookie = `step7Data=${titleDataString}; expires=${expirationTime.toUTCString()}; path=/`;
      setFormSubmitted(true);

      handleFormDataChange({ step7Data: values.title });
    },
  });

  useEffect(() => {

    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith('step7Data='))
      ?.split('=')[1];

    if (cookieValue) {
      const parsedCookie = JSON.parse(cookieValue);
      formik.setFieldValue('title', parsedCookie.step7Data);
    }
  }, []);

  return (
    <div className="mx-auto max-w-2xl px-4 py-1 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8 mb-20 flex flex-col sm:flex-row ">
      <div className="w-full sm:w-1/2 h-[400px] sm:flex flex-col mb-50 ">
        <h5 className="mb-2 text-[36px] font-semibold  text-gray-900 dark:text-white">Step 4</h5>

        <p className="mb-3 font-semibold text-gray-700 dark:text-gray-400">
          Choose if you'd like to start with an experienced guest, set a starting
          <br></br> price and publish your listing.
        </p>
        <img className="object-contain w-[400px] justify-center " src={img2} alt="" />
      </div>
      <div className="w-full sm:w-1/2 h-auto sm:flex flex-col ">
        <form onSubmit={formik.handleSubmit}>
          <h5 className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold  text-gray-900  ">
            Now, let's give a title
          </h5>
          <p className="mb-3 font-semibold text-gray-700 ">Short titles work best. Have fun with it.</p>
          <div className="flex flex-col gap-2 p-3">
            <textarea
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your title here (max 2 lines)"
              rows={7}
              className="border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className={`mt-3 p-3 w-40  rounded-md ${formSubmitted ? 'bg-green-500 text-white' : 'bg-[#390b79] text-white'
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

export default Hometitle;
