
import { IoShareSocialSharp } from "react-icons/io5";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { BiBed } from "react-icons/bi";
import { MdMeetingRoom } from "react-icons/md";
import { FaBath } from "react-icons/fa6";
import axios from "../Components/Utils/user/axios";
import { useSelector } from "react-redux";
import toast, { Toaster } from 'react-hot-toast';
import { useState } from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";

type Props = {
  id: string;
  Id: string;
  title: string;
  location: {
    coordinates: {
      lat: number;
      lng: number;
    }
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
    interiorDetails: [string],
    otherFeatures: [string],
    outdoorDetails: [string],
    utilities: [string],
  };
  image: [string];
  price: number;
  video: string;
  userId: string;
  username: string;
  userimg: string;

}

type RootState = {
  user: {
    value: {
      image: string | undefined;
      id: string | null;
      name: string | null;
      email: string | null;
      phone: string | null;
      access_token: string;
    };
  };
};




const Listcard: React.FC<Props> = ({ Id, title, image, date, room, bathrooms, bedrooms, price, userId, username, userimg }) => {
  const navigate = useNavigate();
  const userdata = useSelector((state: RootState) => state.user.value);
  console.log(userdata.id);
  const shareUrl = window.location.href;





  const handleSaveClick = async () => {

    try {
      const savejob = await axios.post('/save', { UserId: userdata.id, postId: Id });

      if (savejob.data.status == true) {

        toast.success('Property Saved Successfully')



      } else {
        toast.error("Already Saved this Property")


      }



    } catch (error) {

      console.error('Error Saving this Property:', error);
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShareClick = () => {
     
      setIsModalOpen(true);
  };

  const closeModal = () => {
      setIsModalOpen(false);
  };


  return (
    <div className="w-80 h-auto bg-white border border-gray-200 rounded-lg shadow-lg items-center overflow-hidden">
      <a
        className="relative inline-block"
        href=""
        onClick={() => navigate(`/details?Id=${Id}`)}
      >
        <img
          className="rounded-t-lg scale-1 hover:scale-[1.1] duration-300 h-[250px]"
          src={image[0]}
        />
        <h2 className="absolute bottom-0 right-0 p-4 font-semibold text-white bg-black bg-opacity-50">
          £ {price}/month
        </h2>
      </a>

      <div className="w-full h-20 flex flex-row  gap-6">
        <div className='w-20 h-20 ml-4  flex flex-col items-center'>

          <MdMeetingRoom color="#870e4d" fill="#870e4d" className=" w-[20px] h-[20px] mt-5" />




          <h5 className="mb-2 text-sm  tracking-tight text-gray-900 mt-1"> {room} room</h5>


        </div>
        <div className='w-20 h-20  flex flex-col items-center'>
          <BiBed color="#870e4d" fill="#870e4d" className=" w-[20px] h-[20px] mt-5" />


          <h5 className="mb-2 text-sm  tracking-tight text-gray-900 mt-1"> {bathrooms}Beds</h5>

        </div>
        <div className='w-20 h-20  flex flex-col items-center'>
          <FaBath color="#870e4d" fill="#870e4d" className=" w-[20px] h-[20px] mt-5" />


          <h5 className="mb-2 text-sm  tracking-tight text-gray-900 mt-1">{bedrooms} Baths</h5>

        </div>
      </div>
      <hr className=" border-gray-200 sm:mx-auto dark:border-gray-700 " />
      <div className='w-full h-16 flex flex-row'>
        <div className="flex items-center w-1/2">
          <div className="flex-shrink-0 ml-3">
            <img className="w-8 h-8 rounded-full" src={userimg} alt="Neil image" />
          </div>
          <div className="flex-1 min-w-0 ms-4">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              {username}
            </p>

          </div>
        </div>
        <div className="w-1/2 flex items-center gap-5">
          <button data-popover-target="popover-default" type="button" className="w-10 h-10 flex items-center  border rounded ml-12  " onClick={handleShareClick} >
            <IoShareSocialSharp className="w-5 h-5 ml-2" color="#c2cbd9" fill="#c2cbd9" />
          </button>
          {isModalOpen && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                                    <div className="relative w-auto max-w-[90%] sm:max-w-md">

                                        <div className="relative flex flex-col w-full bg-white border rounded-md shadow-lg outline-none focus:outline-none">

                                            <button
                                                className="self-end p-2 text-sm font-semibold text-gray-500 hover:text-gray-700 focus:outline-none"
                                                onClick={closeModal}
                                            >
                                                Close
                                            </button>

                                            <div className="p-4">
                                                <div style={{ display: 'grid', gridGap: '20px', gridTemplateColumns: 'repeat(auto-fill, 30px)', maxWidth: '200px', margin: '0 auto' }}>
                                                    <div style={{ textAlign: 'center' }}>
                                                        <FacebookShareButton
                                                            url={shareUrl}
                                                            className="inline-flex justify-content-center white-space-nowrap overflow-visible width-0 font-size-14px"
                                                        >
                                                            <FacebookIcon size={32} round />
                                                        </FacebookShareButton>
                                                    </div>
                                                    <div style={{ textAlign: 'center' }}>
                                                        <TwitterShareButton
                                                            url={shareUrl}
                                                           
                                                            className="inline-flex justify-content-center white-space-nowrap overflow-visible width-0 font-size-14px"
                                                        >
                                                            <XIcon size={32} round />
                                                        </TwitterShareButton>
                                                    </div>
                                                    <div style={{ textAlign: 'center' }}>
                                                        <TelegramShareButton
                                                            url={shareUrl}
                                                           
                                                            className="inline-flex justify-content-center white-space-nowrap overflow-visible width-0 font-size-14px"
                                                        >
                                                            <TelegramIcon size={32} round />
                                                        </TelegramShareButton>
                                                    </div>
                                                    <div style={{ textAlign: 'center' }}>
                                                        <WhatsappShareButton
                                                            url={shareUrl}
                                                           
                                                            separator=":: "
                                                            className="inline-flex justify-content-center white-space-nowrap overflow-visible width-0 font-size-14px"
                                                        >
                                                            <WhatsappIcon size={32} round />
                                                        </WhatsappShareButton>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

          <button className="w-10 h-10 flex items-center  border rounded " onClick={handleSaveClick} >
            <MdOutlineFavoriteBorder className="w-5 h-5 ml-2" color="#c2cbd9" fill="#c2cbd9" />
          </button>



        </div>

      </div>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
    </div>

  )
}

export default Listcard