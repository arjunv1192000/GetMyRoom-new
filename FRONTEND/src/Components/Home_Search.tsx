import { MutableRefObject, useRef, useEffect, useState } from 'react'
import hero from "../assets/shutterstock_1470527960-ezgif.com-optiwebp.webp"
import { useNavigate } from 'react-router-dom';
import { Blurhash } from 'react-blurhash';

const Home_Search = () => {
  const navigate = useNavigate();

  const secondSectionRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const searchInputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const propertyTypeRef: MutableRefObject<HTMLSelectElement | null> = useRef(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCoQVX3-I5XP1kdYs0b1SX-h-qy5Bd_CGU&libraries=places`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      initAutocomplete();
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const initAutocomplete = () => {
    const input = searchInputRef.current;

    if (input) {
      const searchBox = new window.google.maps.places.SearchBox(input);

      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();

        if (places.length === 0) {
          return;
        }


        const selectedPlace = places[0];
        const coordinates = selectedPlace.geometry?.location?.toJSON();
        const locationName = selectedPlace.formatted_address;

        console.log('Coordinates: ', coordinates);
        console.log('Location Name: ', locationName);
      });
    }

  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };


  const handleSearchButtonClicks = () => {
    const locationValue = searchInputRef.current?.value;
    const typeValue = propertyTypeRef.current?.value;




    navigate(`/listdata?location=${locationValue}&type=${typeValue}`);
  };

  useEffect(() => {
    const texts = ["Together", "Connect", "Share"];
    const typingContainer = document.getElementById("custom-typing-span");
    let currentTextIndex = 0;
    let currentText = "";
    let isDeleting = false;
    let typingSpeed = 90;

    function type() {
      const text = texts[currentTextIndex];
      if (isDeleting) {
        currentText = text.substring(0, currentText.length - 1);
      } else {
        currentText = text.substring(0, currentText.length + 1);
      }

      typingContainer.innerHTML = currentText;

      let typingDelay = isDeleting ? typingSpeed / 2 : typingSpeed;

      if (!isDeleting && currentText === text) {
        typingDelay = 1500;
        isDeleting = true;
      } else if (isDeleting && currentText === "") {
        isDeleting = false;
        currentTextIndex++;
        if (currentTextIndex === texts.length) {
          currentTextIndex = 0;
        }
      }

      setTimeout(type, typingDelay);
    }

    type();
  }, []);

  return (
    <>

      <div className=' relative h-[600px]' ref={secondSectionRef} >
        {isImageLoaded ? null : (
          <Blurhash
            hash="LkM%$U9G-;-p_NofofxuIAt7j@WC"
            width="100%"
            height="100%"
            style={{ position: 'absolute'}}
          />

        )}

        <img
          onLoad={handleImageLoad}
          src={hero}
          alt="Hero Image"
          className='w-full h-[600px] object-cover '
        />
        <div className='absolute top-[15%] sm:top-[15%] left-[10%] md:w-[50%] md:left-[6%] md:top=[15%]' >
          <h2 className='flex font-extrabold text-[#870e4d] text-3xl sm:text-4xl'>
            Live Better,  <span id="custom-typing-span" className='text-black  overflow-hidden  pr-5 pb-2 ml-2 '></span>
          </h2>
        </div>
        <div className=' absolute  top-[10%]  lg:w-auto lg:left-[76%] lg:top-[10%]  sm:left-[70%] hidden sm:inline-block '>
          <blockquote className="text-xl italic font-semibold text-gray-900 dark:text-white">
            <svg className="w-5 h-5 text-black dark:text-gray-600 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
              <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
            </svg>
            <h2 className="flex text-black text-lg font-style:gabriela w-58 ">
              "Discover homes that offer flexibility, convenience, and affordability with built-in camaraderie."
            </h2>
          </blockquote>
        </div>

        <div className="absolute top-[60%]  left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-30 p-6 md:p-12 w-[90%] md:w-[40%]  rounded-lg">
          <label htmlFor="searchInput" className="sr-only">
            Search Address or Postcode
          </label>
          <input ref={searchInputRef} className="bg-white px-4 py-2 rounded mb-4 w-full font-semibold" type="text" placeholder="Enter an address or postcode" />
          <select ref={propertyTypeRef} id="propertyType" className="bg-white px-4 py-2 rounded mb-4 w-full font-semibold">
            <option value="AllType" className='font-semibold'>All Type</option>
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

          <button className="transition ease-in-out delay-150 bg-[#390b79] hover:-translate-y-1 hover:scale-110 hover:bg-[#870e4d] duration-300 text-white px-4 py-2 rounded-lg w-full font-semibold h-16" onClick={handleSearchButtonClicks}>
            Search
          </button>
        </div>
      </div >
    </>

  )
}

export default Home_Search