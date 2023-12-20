import React, { useEffect, useRef, useState } from 'react';
import {Link,useNavigate } from 'react-router-dom';
import axios from '../Components/Utils/property/axios';
import MarkerClusterer from 'marker-clusterer-plus';
import notfound from "../assets/3d-ad-block-blocker-concept-illustration_523487-190.jpg"



type Property = {
  id: string;
  title: string;
  location: {
    coordinates: {
      lat: number;
      lng: number;
    };
    locationName: string;
  };
  room: number;
  bathrooms: number;
  bedrooms: number;
  buildYear: string;
  date: string;
  approve: boolean;
  description: string;
  features: {
    interiorDetails: [string];
    otherFeatures: [string];
    outdoorDetails: [string];
    utilities: [string];
  };
  image: [string];
  price: number;
  video: string;
  userId: {
    _id: string;
    email: string;
    image: string;
    name: string;
    phone: string;
  };
};

const Mapview = ({ location, type,filters }) => {
  const mapRef = useRef(null);
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property[]>([]);

  useEffect(() => {
    const getProperties = async () => {
      try {
        const response = await axios.get(`/getallproperty?location=${location}&type=${type}`);
        setProperty(response.data.propertydata.allproperty);
      } catch (error) {
        console.error(error.message);
      }
    };

    getProperties();
  }, [location, type]);

  useEffect(() => {
    const loadMap = async () => {
      if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCoQVX3-I5XP1kdYs0b1SX-h-qy5Bd_CGU&libraries=places`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        script.onload = () => {
          initMap(MarkerClusterer);
        };
      } else {
        initMap(MarkerClusterer);
      }
    };

    loadMap();
  }, [property]);

  const initMap = (MarkerClusterer) => {
    if (!property || property.length === 0) {
      return;
    }

    const map = new window.google.maps.Map(mapRef.current, {
      center: getAverageCoordinates(property),
      zoom: 5,
    });

   
    const markers = createMarkers(map, property);

   
    new MarkerClusterer(map, markers, {
      imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
      gridSize: 60,
      maxZoom: 15, 
    });
  };

  const getAverageCoordinates = (properties: Property[]) => {
    const totalCoordinates = properties.reduce(
      (acc, data) => ({
        lat: acc.lat + data.location.coordinates.lat,
        lng: acc.lng + data.location.coordinates.lng,
      }),
      { lat: 0, lng: 0 }
    );

    return {
      lat: totalCoordinates.lat / properties.length,
      lng: totalCoordinates.lng / properties.length,
    };
  };

  const createMarkers = (map: any, properties: any[]) => {
    return properties.map((data, index) => {
      const position = {
        lat: data.location.coordinates.lat + index * 0.0002,
        lng: data.location.coordinates.lng + index * 0.0002,
      };
     
     
    const marker = new window.google.maps.Marker({
      position,
      map,
      label: {
        text: `$${data.price}`,
        color: 'white', 
        fontWeight: 'bold',
        labelAnchor: new window.google.maps.Point(20, 0)

      },
    });

      const infowindow = new window.google.maps.InfoWindow({
        content: `<a href="/details?Id=${data._id}" class="infowindow-link">
          <div class="w-[200px] h-auto bg-white border border-gray-200 rounded-lg  items-center">
            <img class="w-full rounded-t-lg scale-1 hover:scale-[1.1] duration-300 " src="${data.image[1]}" alt="" />
            <div class="flex-1 min-w-0 ms-4 mt-3">
              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">$${data.price}/month</p>
            </div>
            <div class='w-full h-16 flex flex-row'>
              <p class="text-sm font-medium text-gray-900 truncate dark:text-white ml-4 mt-5">${data.location.locationName }</p>
            </div>
          </div>
        </a>`,
      });

      marker.addListener('click', () => {
        infowindow.open(map, marker);
        const link = document.querySelector('.infowindow-link');
        if (link) {
          link.addEventListener('click', (event) => {
            event.preventDefault();
            navigate(`/details?Id=${data._id}`);
          });
        }
      });

      return marker;
    });
  };

  return (
    <div className="w-full h-[800px] bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 overflow-hidden mt-20">
      {property.length === 0 ? (
        <div className='flex justify-center items-center w-full h-[500px] flex-col'>
          <img className="w-40 h-40 rounded-t-lg scale-1 hover:scale-[1.1] duration-300 " src={notfound} alt="" />
          <a href='/' className="mt-4 px-4 py-2">
          Go to Home

          </a>
        </div>
      ) : (
        <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
      )}
    </div>
  );
};

export default Mapview;
