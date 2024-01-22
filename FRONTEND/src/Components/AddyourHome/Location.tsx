import React, { useRef, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaMapMarkerAlt } from "react-icons/fa";

const Location = ({ handleFormDataChange }) => {
  const mapRef = useRef(null);
  const [formSubmitted, setFormSubmitted] = useState(false);



  const validationSchema = Yup.object({
    locationName: Yup.string().required('Location name is required'),
    coordinates: Yup.object().shape({
      lat: Yup.number().required('Latitude is required'),
      lng: Yup.number().required('Longitude is required'),
    }),
  });

  const formik = useFormik({
    initialValues: {
      locationName: '',
      coordinates: { lat: null, lng: null },
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {

      const formData = {
        step2Data: {
          locationName: values.locationName,
          coordinates: values.coordinates,
        },
      };
      setFormSubmitted(true);
      const formDataString = JSON.stringify(formData.step2Data);
    const expirationTime = new Date(Date.now() + 10 * 60 * 1000); 
     document.cookie = `step2Data=${formDataString}; expires=${expirationTime.toUTCString()}; path=/`;
      handleFormDataChange(formData);

    },

  });

  useEffect(() => {
   
    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith('step2Data='))
      ?.split('=')[1];

    if (cookieValue) {
      const parsedData = JSON.parse(cookieValue);
      formik.setValues({
        locationName: parsedData.locationName,
        coordinates: parsedData.coordinates,
      });
    }
  }, []);


  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCoQVX3-I5XP1kdYs0b1SX-h-qy5Bd_CGU&libraries=places`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      initMap();
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const initMap = () => {
    const sydney = new window.google.maps.LatLng(-33.867, 151.195);

    const map = new window.google.maps.Map(mapRef.current, {
      center: sydney,
      zoom: 15,
    });

    const input = document.getElementById("search-input");
    const searchBox = new window.google.maps.places.SearchBox(input);

    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds());
    });

    const markers = [];

    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();

      if (places.length === 0) {
        return;
      }

      markers.forEach((marker) => {
        marker.setMap(null);
      });

      const bounds = new window.google.maps.LatLngBounds();
      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {

          return;
        }

        const marker = new window.google.maps.Marker({
          map,
          position: place.geometry.location,
        });

        markers.push(marker);

        window.google.maps.event.addListener(marker, "click", () => {
          const coordinates = place.geometry.location.toJSON();
          const locationName = place.formatted_address;




          formik.setValues({
            ...formik.values,
            locationName: locationName,
            coordinates: coordinates,
          });
        });

        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });

      map.fitBounds(bounds);
    });
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-1 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8  flex flex-col sm:flex-row  justify-center mb-20">
      <div className='w-full h-auto sm:flex flex-col '>
        <h5 className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold  text-gray-900 dark:text-white">Where's your place located?</h5>
        <div className='flex flex-row mt-2 border border-red-500  rounded justify-center '>
        <p className="mb-3 font-medium text-gray-700 dark:text-gray-400">Select the location marker</p>
        <FaMapMarkerAlt fill="red" className=" w-4 h-4 mt-1  " />
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">,Click Add</p>

        </div>
       
       
        <form onSubmit={formik.handleSubmit}>
          <div className="max-w-md mx-auto rounded-xl overflow-hidden shadow-lg md:max-w-2xl ">
            <input
              id="search-input"
              type="text"
              placeholder="Search for a place"
              className="w-[95%] ml-3 p-4 rounded-lg mt-5"
              onChange={formik.handleChange('locationName')}
              value={formik.values.locationName}
            />
            <input
              type="hidden"
              name="coordinates.lat"
              value={formik.values.coordinates.lat}
            />
            <input
              type="hidden"
              name="coordinates.lng"
              value={formik.values.coordinates.lng}
            />
            <div ref={mapRef} className="h-60 w-full sm:w-full md:w-full lg:w-full xl:w-full mt-5"></div>

            <div className='flex justify-end p-3'>
              <button
                type="submit"
                className={`p-3  w-32  rounded-md ${formSubmitted ? 'bg-green-500 text-white' : 'bg-[#390b79] text-white'
                  }`}
              >
                {formSubmitted ? 'Added!' : 'Add'}
              </button>

            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default Location;
