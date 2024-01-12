import React, { useEffect, useRef, useState } from 'react';
import {useNavigate } from 'react-router-dom';
import axios from '../Components/Utils/property/axios';
import MarkerClusterer from 'marker-clusterer-plus';




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

const Mapview = ({ location, type, filters }) => {
  const mapRef = useRef(null);
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property[]>([]);

  useEffect(() => {
    const getProperties = async () => {
      try {
        const response = await axios.get(`/getallproperty?location=${location}&type=${type}`);

        const allProperties = response.data.propertydata.allproperty;


        const filteredProperties = allProperties.filter((property: {
          sellertype: any; bedrooms: number; bathrooms: number; price: any; sellerType: any;
        }) => {
          if (
            (filters?.numberOfBedrooms !== '' && property.bedrooms !== Number(filters?.numberOfBedrooms)) ||
            (filters?.numberOfBathrooms !== '' && property.bathrooms !== Number(filters?.numberOfBathrooms)) ||
            (filters?.priceRange !== '' && !isPriceInRange(property.price, convertPriceRange(filters?.priceRange))) ||
            (filters?.sellerType !== '' && property.sellertype !== filters?.sellerType)
          ) {
            return false;
          }

          return true;
        });
        setProperty(filteredProperties);
      } catch (error) {
        console.error(error.message);
      }
    };

    getProperties();
  }, [location, type]);


  const convertPriceRange = (priceRangeString: string) => {
    const [min, max] = priceRangeString.split('-').map(Number);
    return { min, max };
  };

  const isPriceInRange = (price: number, priceRange: { min: number, max: number }) => {
    return price >= priceRange.min && price <= priceRange.max;
  };

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

      const customMarkerSvg = `
      <svg fill="#d80e0e" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="home-alt" class="icon glyph"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M19.71,9.29l-7-7a1,1,0,0,0-1.42,0l-7,7A1,1,0,0,0,4,10V21a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1V10A1,1,0,0,0,19.71,9.29Z"></path></g></svg>`;

     
      const marker = new window.google.maps.Marker({
        position,
        map,
        icon: {
          url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(customMarkerSvg)}`,
          scaledSize: new window.google.maps.Size(60, 60), 
        },
        label: {
          text: `$${data.price}`,
          color: 'white',
          fontWeight: 'bold',
          fontSize: '12px',
          labelOrigin: new window.google.maps.Point(15, 10),
        },
      });




      const infowindow = new window.google.maps.InfoWindow({
        content: `<a href="/details?Id=${data._id}" class="infowindow-link">
          <div class="w-[200px]  h-auto bg-white border border-gray-200 rounded-lg  items-center">
            <img class="w-full h-[150px] rounded-t-lg scale-1 hover:scale-[1.1] duration-300" src="${data.image[1]}" alt="" />
            <div class="flex-1 min-w-0 ms-4 mt-3">
              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">$${data.price}/month</p>
            </div>
            <div class='w-full h-16 flex flex-row'>
              <p class="text-sm font-medium text-gray-900 truncate dark:text-white ml-4 mt-5">${data.location.locationName}</p>
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
    <div className="sm:w-full h-auto bg-white border border-gray-200 rounded-lg shadow  overflow-hidden mt-20">
      {property.length === 0 ? (
        <div className='flex justify-center items-center w-full h-[300px] sm:h-[500px] flex-col'>
          <img className="w-60 h-60 rounded-t-lg scale-1 hover:scale-[1.1] duration-300 " src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" alt="" />
          <a href='/' className="mt-4 px-4 py-2">
            Go to Home
          </a>
        </div>
      ) : (
        <div ref={mapRef} className="w-full h-[400px] sm:w-full sm:h-[400px] md:h-[600px] lg:h-[800px]" />


      )}
    </div>

  );
};

export default Mapview;
