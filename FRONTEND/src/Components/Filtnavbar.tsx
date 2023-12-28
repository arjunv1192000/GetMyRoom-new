import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import { IoIosClose } from 'react-icons/io';

const FilterDialog = ({ isOpen, onClose, onApplyFilters }) => {
  const [numberOfRooms, setNumberOfRooms] = useState('');
  const [numberOfBedrooms, setNumberOfBedrooms] = useState('');
  const [numberOfBathrooms, setNumberOfBathrooms] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [sellerType, setSellerType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

   
    onApplyFilters({
      numberOfRooms,
      numberOfBedrooms,
      numberOfBathrooms,
      priceRange,
      sellerType,
    });

   
    onClose();
  };

  const handleApplyDefaultValues = () => {
    setNumberOfRooms(''); 
    setNumberOfBedrooms(''); 
    setNumberOfBathrooms(''); 
    setPriceRange(''); 
    setSellerType(''); 


    
  };

  return (
    <Dialog
      as="div"
      className={`filter-dialog fixed   ${isOpen ? 'block' : 'hidden'}`}
      open={isOpen}
      onClose={onClose}
    >
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30 " />

      <div className="filter-dialog-content fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Filter Options</h2>
          <button type="button" className="text-gray-500" onClick={onClose}>
            <IoIosClose />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="rooms" className="block text-sm font-medium text-gray-600">
              Number of Rooms
            </label>
            <input
              type="number"
              id="rooms"
              name="rooms"
              value={numberOfRooms}
              onChange={(e) => setNumberOfRooms(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-600">
              Number of Bedrooms
            </label>
            <input
              type="number"
              id="bedrooms"
              name="bedrooms"
              value={numberOfBedrooms}
              onChange={(e) => setNumberOfBedrooms(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-600">
              Number of Bathrooms
            </label>
            <input
              type="number"
              id="bathrooms"
              name="bathrooms"
              value={numberOfBathrooms}
              onChange={(e) => setNumberOfBathrooms(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="priceRange" className="block text-sm font-medium text-gray-600">
              Price Range
            </label>
            <select
              id="priceRange"
              name="priceRange"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            >
              <option value="0-500">£0 - £500</option>
              <option value="501-1000">£501 - £1000</option>
              <option value="1001-1500">£1001 - £1500</option>
              <option value="1501-2000">£1501 - £2000</option>
              <option value="2001-3000">£2001 - £3000</option>
              <option value="3001-4000">£3001 - £4000</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="sellertype" className="block text-sm font-medium text-gray-600">
              Seller Type
            </label>
            <select
              id="sellertype"
              name="sellertype"
              value={sellerType}
              onChange={(e) => setSellerType(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            >
              <option value="AGENT">AGENT</option>
              <option value="PRIVATE OWNER">PRIVATE OWNER</option>
            </select>
          </div>

          <button
            type="submit"
            className="transition ease-in-out delay-150 bg-[#390b79] hover:-translate-y-1 hover:scale-110 hover: hover:bg-[#870e4d] duration-300 text-white px-4 py-2 border rounded lg:flex  items-center "
          >
            Apply Filters
          </button>

          <button
            type="button"
            className="mt-2 transition ease-in-out delay-150 bg-[#390b79] hover:-translate-y-1 hover:scale-110 hover: hover:bg-[#870e4d] duration-300 text-white px-4 py-2 border rounded lg:flex items-center "
            onClick={handleApplyDefaultValues}
          >
            Apply Default Values
          </button>
        </form>
      </div>
    </Dialog>
  );
};

export default FilterDialog;
