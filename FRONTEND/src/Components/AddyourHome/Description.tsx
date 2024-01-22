import { useState, useEffect } from 'react';
import { useFormik } from 'formik';

const Description = ({ handleFormDataChange }) => {

    const [formSubmitted, setFormSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      description: '',
    },
    onSubmit: (values) => {
      const descriptionDataString = JSON.stringify({ step8Data: values.description });
      const expirationTime = new Date(Date.now() + 10 * 60 * 1000);
      document.cookie = `step8Data=${descriptionDataString}; expires=${expirationTime.toUTCString()}; path=/`;
      setFormSubmitted(true);
      handleFormDataChange({ step8Data: values.description });
    },
  });

  useEffect(() => {
   
    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith('step8Data='))
      ?.split('=')[1];

    if (cookieValue) {
      const parsedCookie = JSON.parse(cookieValue);
      formik.setFieldValue('description', parsedCookie.step8Data);
    }
  }, []); 

  return (
    <div className="mx-auto max-w-2xl px-4 py-1 sm:px-6 sm:py-18 lg:max-w-7xl lg:px-8  flex flex-col sm:flex-row   justify-center  mb-24">
      <form onSubmit={formik.handleSubmit}>
        <div className="w-full h-[300px] sm:flex flex-col">
          <h5 className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold  text-gray-900 dark:text-white ">
            Create your description
          </h5>
          <p className="mb-3 font-semibold text-gray-700 dark:text-gray-400 ml-5">Share what makes your place special.</p>
          <div className="flex flex-col gap-2  ">
            <textarea
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your description here (max 20 lines)"
              rows={7}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>
        <div className="flex justify-end mt-5">
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
  );
};

export default Description;
