import React from 'react';
import { useFormik } from 'formik';
import { IoMdVideocam } from 'react-icons/io';
import Axios from "../Utils/Ssrvice/axios"

const Videos = ({ handleFormDataChange }) => {
  const formik = useFormik({
    initialValues: {
      selectedVideo: null,
      videoPreview: null,
    },
    onSubmit: async (values) => {
      if (!values.selectedVideo) {
        alert('Please select a video.');
        return;
      }

      try {
        const videoResponse = await Axios.get('/s3service');
        const videoUrl = videoResponse.data.response;

        console.log(videoUrl, 's333');

        const videoUploadResponse = await fetch(videoUrl, {
          method: 'PUT',
          body: values.selectedVideo,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });




        const userVideoUrl = videoUrl.split('?')[0];


        handleFormDataChange({ step6Data: userVideoUrl });
      } catch (error) {
        console.error('Error uploading video to S3:', error);
      }
    },
  });


  const handleVideoChange = (event) => {
    const file = event.target.files[0];


    formik.setFieldValue('selectedVideo', file);
    const previewURL = URL.createObjectURL(file);
    formik.setFieldValue('videoPreview', previewURL);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-1 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8  flex flex-col sm:flex-row justify-center mb-20  ">
      <div className="w-full sm:w-[80%] h-auto sm:flex flex-col items-center">
        <h5 className="mb-10 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold tracking-tight text-gray-900 dark:text-white w-full">
          Add a video of your property
        </h5>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col items-center gap-2 p-3 border-dotted border-2 border-gray-300 sm:w-[400px] ">
            <label htmlFor="videoInput" className="flex items-center cursor-pointer">
              <IoMdVideocam className="text-4xl " />
              <span className="text-lg font-medium text-gray-700 dark:text-gray-400">
                Select Video
              </span>
            </label>
            <input
              type="file"
              id="videoInput"
              accept="video/*"
              onChange={handleVideoChange}
              className="hidden"
            />
            {formik.values.videoPreview && (
              <div className="mt-4 mb-10">
                <video width="500" height="500" controls>
                  <source src={formik.values.videoPreview} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
            <button type="submit" className="mt-4 p-3 text-white rounded-md w-full bg-[#390b79]">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Videos;
