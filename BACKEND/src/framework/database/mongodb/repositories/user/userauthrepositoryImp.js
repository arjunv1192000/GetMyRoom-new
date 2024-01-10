import userdata from "../../models/UserModel.js"

const userAuthRepositoryImp = () => {


  const userExist = (number) => userdata.findOne({ phone: number });

  const userexistemail = (email) => userdata.findOne({ email: email });

  const create = (user) => {
    console.log(user, "dbbbbb");
    const newuser = new userdata({
      name:user?.getname(),
      email:user?.getemail(),
      password:user?.getpassword(),
      image:user?.getimage(),
      isBlock: false

    })
    return newuser.save()

  }

  const userProfile = async (userId) => {
    console.log(userId, "dbbb");
    return await userdata.findById(userId)
  }


  const save = async (userId, postId) => {

    try {
      const userProfile = await userdata.findById(userId)
      if (!userProfile) {
        return false;
      }
      const savedlist = userProfile.savedlist;
      if (!savedlist.includes(postId)) {
        savedlist.push(postId);
        userProfile.savedlist = savedlist;
        await userProfile.save();
        return true;
      }
      return false;
    } catch (error) {
      console.log(error, "error");
      return false;
    }
  };

  const userSavedproperty = async (userId) => {
    console.log(userId, "plloklk");
    try {
      const user = await userdata.findById(userId)
        .populate({
          path: 'savedlist',
          populate: {
            path: 'userId',
            model: 'Userdata', // Adjust the model name if needed
            select: 'name email phone image', // Specify the fields you want to select
          }
        });

      console.log(user, "saved");

      return user.savedlist;
    } catch (error) {
      console.error(error);
    }
  };

  const googlecreate = (user) => {
    const newuser = new userdata({
      name: user?.getname(),
      email: user?.getemail(),
      image: user?.getimage(),
      isBlock: false


    })
    return newuser.save()

  }

  const removeproperty = async (userId,postId) => {
    console.log(userId,postId,"hhhhh");
    try {
      const userProfile = await userdata.findById(userId)
      if (!userProfile) {
        console.log('Error: userdata model not defined or imported incorrectly.');
        return false;
      }
      const savedJobs = userProfile.savedlist;
      console.log(savedJobs);
      const index = savedJobs.indexOf(postId);
      console.log(index);
      if (index !== -1) {
        savedJobs.splice(index, 1);
        userProfile.savedlist = savedJobs;
        await userProfile.save();
        return true;
      }
      return false;
    } catch (error) {
      console.log(error, "error");
      return false;
    }
  };

  const userDatas = async () => {
    return await userdata.find();
  }


  const userupdate = async (fullname,email,image,userId) => {
    const profile = await userdata.findOneAndUpdate(
      { _id: userId },
      {
        name:fullname,
        email: email,
        image:image,
        
      },
      { new: true }
    );
    return profile;
  };





  return {
    userExist,
    create,
    userProfile,
    save,
    userSavedproperty,
    userexistemail,
    googlecreate,
    removeproperty,
    userDatas,
    userupdate

  }

}
export default userAuthRepositoryImp