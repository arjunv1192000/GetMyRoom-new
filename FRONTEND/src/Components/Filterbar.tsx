import React, { useState, useEffect, useRef, MutableRefObject } from 'react';
import { IoIosArrowDown, IoIosArrowUp, IoIosOptions, IoIosSearch, IoIosClose, IoIosArrowBack } from 'react-icons/io';
import { IoMapOutline } from "react-icons/io5";
import FilterDialog from './Filtnavbar';
import { useNavigate } from 'react-router-dom';

const Filterbar = ({ onViewTypeChange, onApplyFilters }) => {
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('AllType');
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [viewType, setViewType] = useState('map');
  const [filters, setFilters] = useState({
    numberOfBedrooms: '',
    numberOfBathrooms: '',
    priceRange: '0-500',
    sellerType: 'AGENT',
  });

  const handleApplyFilters = (newFilters: React.SetStateAction<{  numberOfBedrooms: string; numberOfBathrooms: string; priceRange: string; sellerType: string; }>) => {
    setFilters(newFilters);
    onApplyFilters(newFilters);
  };

  const searchInputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const propertyTypeRef: MutableRefObject<HTMLSelectElement | null> = useRef(null);

  const navigate = useNavigate();

  // useEffect(() => {
  //   const script = document.createElement('script');
  //   script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCoQVX3-I5XP1kdYs0b1SX-h-qy5Bd_CGU&libraries=places`;
  //   script.async = true;
  //   script.defer = true;
  //   document.head.appendChild(script);

  //   script.onload = () => {
  //     initAutocomplete();
  //   };

  //   return () => {
  //     document.head.removeChild(script);
  //   };
  // }, []);

  // const initAutocomplete = () => {
  //   const input = searchInputRef.current;

  //   if (input) {
  //     const searchBox = new window.google.maps.places.SearchBox(input);

  //     searchBox.addListener('places_changed', () => {
  //       const places = searchBox.getPlaces();

  //       if (places.length === 0) {
  //         return;
  //       }

  //       const selectedPlace = places[0];
  //       const coordinates = selectedPlace.geometry?.location?.toJSON();
  //       const locationName = selectedPlace.formatted_address;
  //       setLocation(locationName)

  //       console.log('Coordinates: ', coordinates);
  //       console.log('Location Name: ', locationName);
  //     });
  //   }
  // };

  const handleFilterClick = () => {
    setShowFilterDropdown(!showFilterDropdown);
  };

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  const handlePropertyTypeChange = (e) => {
    setPropertyType(e.target.value);
  };

  const handleClearClick = () => {
    setLocation('');
  };

  const handleSearchButtonClick = () => {
    const locationValue = searchInputRef.current?.value;
    const typeValue = propertyTypeRef.current?.value || 'AllType';

    navigate(`/listdata?location=${locationValue}&type=${typeValue}`);
  };

  const toggleFilterDialog = () => {
    setShowFilterDialog(!showFilterDialog);
  };

  const toggleViewType = () => {
    setViewType(viewType === 'list' ? 'map' : 'list');
    onViewTypeChange(viewType === 'list' ? 'map' : 'list');
  };

  return (
    <header className="w-full shadow-sm h-auto items-center flex flex-col">
      <div className="h-40 sm:w-full shadow-sm h-20 items-center flex justify-center">
        <div className=' sm:flex flex-row inline-block'>
          <div className="flex flex-col mr-2 relative">
            <label htmlFor="location" className="text-black mb-1 text-start text-sm">
              Enter Location
            </label>
            <input
              ref={searchInputRef}
              type="text"
              id="location"
              placeholder="Type your location"
              value={location}
              onChange={handleInputChange}
              className="p-2 border rounded text-sm   sm:w-60 md:w-72 lg:w-80 xl:w-60"
            />
            {location && (
              <button
                className="absolute top-1/2 transform -translate-y-1/2 right-2 text-gray-500 cursor-pointer mt-3"
                onClick={handleClearClick}
              >
                <IoIosClose />
              </button>
            )}
          </div>
          <div className=" items-center mr-4 ">
            <div className="relative inline-block">
              <label htmlFor="propertyType" className="text-black mb-1 text-start text-sm">
                Property Type
              </label>
              <select
                ref={propertyTypeRef}
                id="propertyType"
                value={propertyType}
                onChange={handlePropertyTypeChange}
                className="bg-white px-4 py-2 border rounded mr-2 relative flex items-center text-sm"
              >
                <option value="AllType" className='font-semibold'>AllType</option>
                <option value="BOX ROOM" className='font-semibold'>BOX ROOM</option>
                <option value="BEDSIT" className='font-semibold'>TWIN ROOM</option>
                <option value="SINGLE ROOM" className='font-semibold'>SINGLE ROOM</option>
                <option value="STUDIO" className='font-semibold'>STUDIO</option>
                <option value="DOUBLE ROOM" className='font-semibold'>DOUBLE ROOM</option>
                <option value="TRIPLE/QUADRUPLE ROOM" className='font-semibold'>TRIPLE/QUADRUPLE ROOM</option>
                <option value="1 BED HOUSE/FLAT" className='font-semibold'>1 BED HOUSE/FLAT</option>
                <option value="2 BED HOUSE/FLAT" className='font-semibold'>2 BED HOUSE/FLAT</option>
                <option value="3 BED HOUSE/FLAT" className='font-semibold'>3 BED HOUSE/FLAT</option>
                <option value="4+ BED HOUSE/FLAT" className='font-semibold'>4+ BED HOUSE/FLAT</option>

              </select>
            </div>
          </div>

        </div>

        <div className="flex flex-col sm:flex-row items-center mt-5 gap-6">
          <button
            className="w-12 sm:w-40 ml-2 transition ease-in-out delay-150 bg-[#390b79] hover:-translate-y-1 hover:scale-110 hover: hover:bg-[#77435d] duration-300 text-center font-medium text-white px-4 py-2 border rounded mr-2 flex  items-center  "
            onClick={handleSearchButtonClick}
          >
            <IoIosSearch className="w-5 h-5 " />
            <span className="hidden sm:block">Search</span>
          </button>
          <button
            className='w-12  sm:w-40 ml-2 transition ease-in-out delay-150 bg-[#870e4d] hover:-translate-y-1 hover:scale-110 hover: hover:bg-[#77435d] duration-300 text-center font-medium text-white px-4 py-2 border rounded mr-2 flex  items-center '
            onClick={toggleFilterDialog}
          >
            <IoIosOptions className="w-5 h-5 " />
            <span className="hidden sm:block">Filter</span>
          </button>
        </div>
      </div>
      <hr className=" border-gray-200 sm:mx-auto dark:border-gray-700 mt-2" />
      <div className='w-full h-10 flex justify-center items-center'>
        <button
          className="w-30 sm:w-30 ml-2 transition ease-in-out delay-150 bg-[#390b79] hover:-translate-y-1 hover:scale-110 hover:bg-[#870e4d] duration-300 text-white px-4 py-2 border rounded flex items-center"
          onClick={() => onViewTypeChange('list')}
        >
          <IoIosArrowBack className="mr-2" />
          List View
        </button>
        <button
          className="w-30 sm:w-30 ml-5 transition ease-in-out delay-150 bg-[#390b79] hover:-translate-y-1 hover:scale-110 hover:bg-[#870e4d] duration-300 text-white px-4 py-2 border rounded flex items-center"
          onClick={() => onViewTypeChange('map')}
        >
          <IoMapOutline className="mr-2" />
          Map View
        </button>
      </div>

      <FilterDialog isOpen={showFilterDialog} onClose={toggleFilterDialog} onApplyFilters={handleApplyFilters} />
    </header>
  );
};

export default Filterbar;
