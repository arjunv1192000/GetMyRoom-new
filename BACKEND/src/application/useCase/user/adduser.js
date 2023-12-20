import userdata from "../../../entities/user.js";

const adduser = async ( phoneNumber,name,email,dob,image,repositories,authService) => {
   

    try {
        const profiledetails = userdata(name,email,phoneNumber,dob,image)
        const newuser = await repositories.create(profiledetails);
        console.log(newuser,"datasss");
      
      const isUser={
        userId:newuser._id,
        userName:newuser.name,
        userEmail:newuser.email,
        userphone:newuser.phone,
        userdob:newuser.dob,
        userimg:newuser.image

      }
      const AccessToken = await authService.generateAccessToken(isUser);
      const RefreshToken = await authService.generatRefreshToken(isUser);

      console.log(AccessToken,"ooooo");
      console.log(RefreshToken,"ooooo");

      return { status: true,isUser,AccessToken,RefreshToken};

    } catch {
        return { message: 'Error creating user profile', status: false };

    }






}
export default adduser