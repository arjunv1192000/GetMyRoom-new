import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Location = ({handleFormDataChange}) => {
  const mapRef = useRef(null);

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
          handleFormDataChange(formData);
    },
  });

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
    <div className="mx-auto max-w-2xl px-4 py-1 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8  flex flex-col sm:flex-row  justify-center mb-10">
      <div className='w-full h-auto sm:flex flex-col '>
        <h5 className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl  font-bold tracking-tight text-gray-900 dark:text-white">Where's your place located?</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Search your location and select the location marker.</p>
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
           <div ref={mapRef} className="h-80 w-full sm:w-96 md:w-2/3 lg:w-3/4 xl:w-full mt-5"></div>

            <div className='flex justify-end'>
            <button type="submit" className="mt-3 p-3 w-24 mb-10 bg-[#390b79] text-white rounded-md ">Submit</button>

            </div>
           
          </div>
        </form>
      </div>
    </div>
  );
};

export default Location;
