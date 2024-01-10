import userdata from "../../../entities/user.js";

const adduser = async (name,email,password, image,repositories,authService) => {
  try {
    const hashPassword = await authService.bcryptpassword(password);
    const profileDetails = userdata(email,name,hashPassword,image);
    const newUser = await repositories.create(profileDetails);

    const isUser = {
      userId:newUser._id,
      userName:newUser.name,
      userEmail:newUser.email,
      userImg: newUser.image,
    };

    const accessToken = await authService.generateAccessToken(isUser);

    return { status: true, isUser, accessToken };
  } catch (error) {
    console.error("Error creating new user:", error.message);
    return { status: false, message: error.message };
  }
};

export default adduser;
