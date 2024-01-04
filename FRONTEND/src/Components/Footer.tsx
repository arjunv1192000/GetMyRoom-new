import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Footer = () => {
  const [showContactInfo, setShowContactInfo] = useState(false);

  const handleContactClick = () => {
    setShowContactInfo(!showContactInfo);
  };

  const navigate = useNavigate();
  return (
    <footer className="bg-[#f7f6f5] mt-10">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8 " />
        <div className="sm:flex sm:items-center sm:justify-between xl:px-24">
          <div className="flex flex-col mt-4 gap-2 sm:flex-row sm:flex-nowrap sm:gap-5">
            <a href="" className="text-gray-500 hover:text-gray-900" onClick={() => navigate('/privacy')}>Privacy</a>
            <a href="" className="text-gray-500" onClick={() => navigate('/terms')}>Terms</a>
            {/* <a href="" className="text-gray-500 hover:text-gray-900">Cookies</a> */}
            <a className="text-gray-500 hover:text-gray-900 cursor-pointer" onClick={handleContactClick}>Contact us</a>
            {/* <a href="" className="text-gray-500 hover:text-gray-900">About</a> */}
            {showContactInfo && (
              <div className="mt-4 sm:mt-0">
                <p>Email: <a href="mailto:Admin@visahelpgb.com" >Admin@visahelpgb.com</a></p>
                <p className='text-gray-500'>Phone: 07733580559</p>
              </div>
            )}

          </div>

          <div className="flex mt-4 sm:justify-center gap-4 sm:mt-0">
            <a>
            <img
              alt=""
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png"
              className="w-5 h-5 mt-2 "
            />

            </a>

            <a href='https://www.instagram.com/getmy_room?igsh=ODA1NTc5OTg5Nw=='target='new'>
            <img
              alt=""
              src="https://w7.pngwing.com/pngs/722/1011/png-transparent-logo-icon-instagram-logo-instagram-logo-purple-violet-text-thumbnail.png"
              className="w-5 h-5 mt-2"
            />

            </a>
           
           
            <img
              alt=""
              src="https://w7.pngwing.com/pngs/239/740/png-transparent-twitter-logo-icon-twitter-file-logo-social-media-news-thumbnail.png"
              className="w-5 h-5 mt-2"
            />
          </div>
        </div>
        <div className="sm:flex sm:items-center sm:justify-between mt-5 xl:px-24">
          <div className="flex flex-nowrap mt-1 sm:justify-center sm:mt-0 gap-1">

          </div>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="" className="hover:underline">Getmyroom™</a>. All Rights Reserved.
            </span>

          </div>
        </div>
        <div className="mt-10 xl:px-24 ">
          <p className="text-gray-500 text-xs p-3">GetMyRoom: Your one-stop shop for stress-free travel. Find your ideal accommodation, research visa requirements with our expert guidance (Registered Visa Help Company No. 14409618).</p>
          <p className="text-gray-500 text-xs p-3">Explore local attractions, and manage your booking with ease. We're here to empower your adventures every step of the wayRegistered Office Address: 12, 2 Westbourne Crescent, London, United Kingdom, W2 3DB</p>


        </div>




      </div>
    </footer>


  )
}

export default Footer

