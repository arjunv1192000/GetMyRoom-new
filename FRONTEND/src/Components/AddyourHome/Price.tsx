import React, { useState } from 'react';
import { useFormik } from 'formik';

const Price = ({ handleFormDataChange }) => {
  const [editMode, setEditMode] = useState(false);

  const formik = useFormik({
    initialValues: {
      price: 100,
    },
    onSubmit: (values) => {
      handleFormDataChange({ step10Data: values.price });
      setEditMode(false);
    },
  });

  const handlePriceChange = (event) => {
    const newPrice = parseFloat(event.target.value);
    formik.setFieldValue('price', isNaN(newPrice) ? '' : newPrice);
  };

  const handleClick = () => {
    setEditMode(true);
  };

  const handleBlur = () => {
    setEditMode(false);
    formik.handleSubmit();
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-1 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 flex flex-col sm:flex-row  justify-center">
      <form onSubmit={formik.handleSubmit} className="w-full h-[400px] sm:flex flex-col">
        <h5 className="mb-2  font-bold tracking-tight  text-gray-900 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
          Now, set your price
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">You can change it anytime.</p>
        <div className="w-full h-40">
          {editMode ? (
            <div>
              <label htmlFor="price-input" className="sr-only">
                Edit Price
              </label>
              <input
                
                id="price-input"
                name="price"
                className="w-[300px] h-20 px-3 text-[80px] font-extrabold outline-none "
              
                value={formik.values.price}
                onChange={handlePriceChange}
                onBlur={handleBlur}
                
              />
            </div>
          ) : (
            <div className="text-4xl leading-tight tracking-tight mb-4" onClick={handleClick}>
              <label htmlFor="lys-base-price-input">
                <div className="flex items-center">
                  <div className="flex items-center">
                    <span className="text-[80px] font-extrabold">£</span>
                    <h3 className="text-[80px] font-extrabold" aria-hidden="true">
                      {formik.values.price || 0}
                    </h3>
                  </div>
                </div>
              </label>
            </div>
          )}
        
        </div>
      </form>
    </div>
  );
};

export default Price;
