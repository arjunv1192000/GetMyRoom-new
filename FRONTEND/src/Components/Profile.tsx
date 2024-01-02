
import { useEffect, useState } from "react";
import Editprofile from "./Modals/Editprofile";
import { useSelector } from "react-redux";
import axios from "../Components/Utils/user/axios"

type RootState = {
  user: {
    value: {
      image: string | undefined
      id: string | null;
      name: string | null;
      email: string | null;
      phone: string | null;
      access_token: string;
    };
  };
};

const Profile = () => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [profile, setprofile] = useState<any>(null);
  const userdata = useSelector((state: RootState) => state.user.value);

  const id = userdata.id


  const openEditModal = () => {
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  useEffect(() => {
    axios.get('/getprofile?id=' + id).then((response) => {
      setprofile(response.data.profiledata)




    }).catch((response) => {
      console.error(response.message);



    })

  }, [id])

  return (
    <div className="font-sans antialiased text-gray-900 leading-normal tracking-wider bg-cover bg-slate-400">
      <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my- lg:my-0">
        <div id="profile" className="w-full mt-20 lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0 ">
          <div className="p-4 md:p-12 text-center lg:text-left">
            <div className="block lg:hidden rounded-full shadow-xl mx-auto mt-16 h-60 w-48 bg-cover bg-center ">
              <img src={profile?.image} className="object-fill block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-60 w-48 bg-cover bg-center" />

            </div>
            <h1 className="text-3xl font-bold pt-8 lg:pt-0">{profile?.name}</h1>
            <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
            <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
              {profile?.email}
            </p>
            {/* <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
             {profile?.phone}
            </p>
            <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
             {profile?.dob}
            </p> */}
            <button className=" mr-20 transition ease-in-out delay-150 bg-[#390b79]  hover: hover:bg-[#870e4d] duration-300 text-white px-4 py-2 rounded w-20 h-10 mt-5  " onClick={openEditModal} >Edit</button>
          </div>
        </div>
        <div className="w-full mt-20 lg:w-2/5 ">
          <img src={profile?.image} className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block w-full h-auto object-fill " alt="Profile" />
        </div>
        {isEditModalOpen && <Editprofile onClose={closeEditModal} />}
      </div>
    </div>
  )
}

export default Profile