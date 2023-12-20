import React, { useEffect, useRef, useState } from 'react';

declare global {
    interface Window {
      google: any;
      initMap: () => void;
    }
  }

  type Props = {
    id: string;
    title: string;
    location: {
        coordinates: {
            lat: number;
            lng: number;
        }
        locationName: string;
    };
    room: number;
    document: string;
    floorplans: string;
    bathrooms: number;
    bedrooms: number;
    buildYear: string;
    date: string;
    approve: boolean;
    description: string;
    features: {
        interiorDetails: [string],
        otherFeatures: [string],
        outdoorDetails: [string],
        utilities: [string],
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
    }
    Id: string;
    username: string;
    userimage: string;
    proId: string;
}


const Map: React.FC<Props> = ({location}) => {

    const mapRef = useRef(null);
 

  useEffect(() => {
    const loadMap = () => {
      if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCoQVX3-I5XP1kdYs0b1SX-h-qy5Bd_CGU&libraries=places`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        script.onload = () => {
          initMap();
        };
      } else {
        initMap();
      }
    };

    loadMap();
  }, [location]);

  const position = {
    lat:location.coordinates.lat ,
    lng:location.coordinates.lng ,
  };

  const initMap = () => {
    const map = new window.google.maps.Map(mapRef.current, {
      center:position,
      zoom: 15, 
    });

  

    const marker = new window.google.maps.Marker({
      position: position,
      map,
    });
  }
    

  return (
    <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
  )
}

export default Map