import admindata from "../../models/AdminModels.js";

const adminAuthRepositoryImp = () => {

  const adminExist = async (email,password) => {
    console.log(email, "email");
   
    try {
      return await  admindata.findOne({email:email});

     
    } catch (error) {
      console.error("Error while finding the admin:", error);
      throw new Error("An error occurred while finding the admin.");
    }
  };

  return {
    adminExist,
  };
};

export default adminAuthRepositoryImp;
