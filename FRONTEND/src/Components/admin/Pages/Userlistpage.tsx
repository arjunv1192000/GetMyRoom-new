import React from 'react';
import Layout from '../Components/Layout';
import Usercard from '../Components/Usercard';
import { useEffect, useState } from 'react';
import axios from "../../admin/Utils/axios"

type User = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  image:string;
  dob:string;
  isBlock: boolean;
};

function Userlistpage() {

  const [user, setuser] = useState<User[]>([]);

  const fetchData = () => {

      axios.get('/getuserdetails')
          .then((response) => {
            console.log(response.data.userdata);
            
              setuser(response.data.userdata);
          })
          .catch((response) => {
              console.error(response.message);
          });
  }


  useEffect(() => {
      fetchData()

  }, []);

  return (
    <Layout>
      <div className="flex flex-wrap justify-center gap-4 mt-10">
        {user.map((data) =>

          <Usercard userId={data?._id} name={data?.name} email={data?.email} phone={data?.phone} isBlock={data?.isBlock} dob={data?.dob} image={data?.image} fetchData={fetchData} />

        )}
        
      </div>
    </Layout>
  );
}

export default Userlistpage;
