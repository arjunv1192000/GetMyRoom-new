
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Axios from '../Utils/Ssrvice/axios';

const Floorplans = ({ handleFormDataChange }) => {
  const validationSchema = Yup.object({
    image: Yup.mixed().required('Please select a floorplan image'),
  });

  const formik = useFormik({
    initialValues: {
      image: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
    
      
      try {
        if (values.image) {

          const floorplanUrl = await uploadToS3(values.image);

          handleFormDataChange({
            step7Data: {floorplanUrl},
          });
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

  const handleImageChange = (event: { currentTarget: { files: any[]; }; }) => {
    formik.setFieldValue('image', event.currentTarget.files[0]);
};

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mx-auto max-w-2xl px-4 py-1 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 flex flex-col sm:flex-row  justify-center ">
        <div className="w-full sm:w-1/2 h-auto sm:flex flex-col">
          <h5 className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-gray-900 dark:text-white "> Add floor plan of your house</h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">You'll need 1 photos to get started.</p>
          <div className="flex flex-col gap-2 p-3 border-dotted border-2 border-gray-300">
            <input
              type="file"
              accept="image/*"
              name='image'
              onChange={handleImageChange}
              onBlur={formik.handleBlur}
              className="border border-dashed border-gray-300 p-2 rounded-md"
            />
            {formik.touched.image && formik.errors.image && (
              <div className="text-red-500 text-sm">{formik.errors.image}</div>
            )}
          </div>
          <div className='flex justify-end'>
          <button type="submit" className="mt-3 mb-10 p-3 w-40 bg-[#390b79] text-white rounded-md">
            Add
          </button>

          </div>
        </div>
      </div>
    </form>
  );
};

export default Floorplans;
