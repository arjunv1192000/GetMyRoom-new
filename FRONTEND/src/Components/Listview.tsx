import Listcard from './Listcard';
import Listcards from './Skeletons/Listcards';
import { useEffect, useState } from 'react';
import axios from '../Components/Utils/property/axios';
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
  sellertype: string;
};

const Listview = ({ location, type, filters }) => {
  const [loading, setLoading] = useState(true);
  const [property, setProperty] = useState<Property[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const itemsPerPage = 2;

  useEffect(() => {
    const getProperties = async () => {
      try {
        const response = await axios.get(`/getallproperty?location=${location}&type=${type}`);
        const allProperties = response.data.propertydata.allproperty;

        console.log(filters, "ooooo");

        const filteredProperties = allProperties.filter((property: {
          sellertype: any; room: number; bedrooms: number; bathrooms: number; price: any; sellerType: any;
        }) => {
          if (
            (filters?.numberOfRooms !== '' && property.room !== Number(filters?.numberOfRooms)) ||
            (filters?.numberOfBedrooms !== '' && property.bedrooms !== Number(filters?.numberOfBedrooms)) ||
            (filters?.numberOfBathrooms !== '' && property.bathrooms !== Number(filters?.numberOfBathrooms)) ||
            (filters?.priceRange !== '' && !isPriceInRange(property.price, convertPriceRange(filters?.priceRange))) ||
            (filters?.sellerType !== '' && property.sellertype !== filters?.sellerType)
          ) {
            return false;
          }

          return true;
        });
        console.log(allProperties, "all");

        console.log(filteredProperties, "fitt");

        const sortedProperty = filteredProperties.sort((a: { price: number; }, b: { price: number; }) => {
          return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
        });

        setProperty(sortedProperty);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
      }
    };

    getProperties();
  }, [location, type, filters, sortOrder]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = property.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const convertPriceRange = (priceRangeString: string) => {
    const [min, max] = priceRangeString.split('-').map(Number);
    return { min, max };
  };

  const isPriceInRange = (price: number, priceRange: { min: number, max: number }) => {
    return price >= priceRange.min && price <= priceRange.max;
  };

  return (
    <div className='bg-white'>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className='w-full h-20 flex justify-between'>
          <h2 className="text-sm font-bold tracking-tight text-gray-900 mt-5 ">
            Property to rent in {location}<br />
            {property.length === 0 ? 'No properties found' : `${property.length} results`}
          </h2>
          <div>
            <select
              className="px-4 py-2 mb-4 mt-5 "
              onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            >
              <option value="asc">Highest price</option>
              <option value="desc">Lowest price</option>
            </select>
          </div>
        </div>
        {loading ? (
          <div className="mt-20 grid gap-3 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 gap-y-8 justify-center">
            {Array.from({ length: itemsPerPage }).map((_, index) => (
              <Listcards key={index} />
            ))}
          </div>
        ) : property.length === 0 ? (
          <div className='flex justify-center'>
            <img className="w-40 h-40 rounded-t-lg scale-1 hover:scale-[1.1] duration-300 " src={notfound} alt="" />
          </div>
        ) : (
          <>
            <div className="mt-20 grid gap-3 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 gap-y-8 justify-center">
              {currentItems.map((data) => (
                <Listcard
                  key={data.id}
                  Id={data._id}
                  title={data.title}
                  image={data.image}
                  date={data.date}
                  room={data.room}
                  bathrooms={data.bathrooms}
                  bedrooms={data.bedrooms}
                  price={data.price}
                  userId={data.userId?._id}
                  username={data.userId.name}
                  userimg={data.userId.image}
                />
              ))}
            </div>
            <div className='flex justify-center mt-10'>
              <nav aria-label="Page navigation example">
                <ul className="list-style-none flex">
                  <li>
                    <a
                      className={`relative block rounded-full bg-transparent px-3 py-1.5 text-sm ${currentPage === 1
                        ? 'pointer-events-none text-neutral-500'
                        : 'text-neutral-600 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white'
                      }`}
                      onClick={() => paginate(currentPage - 1)}
                    >
                      Previous
                    </a>
                  </li>
                  {Array.from({ length: Math.ceil(property.length / itemsPerPage) }).map((_, index) => (
                    <li key={index}>
                      <a
                        className={`relative block rounded-full bg-transparent px-3 py-1.5 text-sm ${currentPage === index + 1
                          ? 'pointer-events-none font-medium text-primary-700'
                          : 'text-neutral-600 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white'
                        }`}
                        onClick={() => paginate(index + 1)}
                      >
                        {index + 1}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      className={`relative block rounded-full bg-transparent px-3 py-1.5 text-sm ${currentPage === Math.ceil(property.length / itemsPerPage)
                        ? 'pointer-events-none text-neutral-500'
                        : 'text-neutral-600 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white'
                      }`}
                      onClick={() => paginate(currentPage + 1)}
                    >
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Listview;
