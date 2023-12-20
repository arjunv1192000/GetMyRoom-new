import usergoogledata from "../../../entities/google.js";



const googleregister = async (fullname,email,image,phoneNumber,dob,dbrepository,authService) => {
    const emailExists = await dbrepository.userexistemail(email);
    const phoneExists = await dbrepository.userexist(phoneNumber);

    if (emailExists || phoneExists) {
        const errorMessage = emailExists ? 'Email already exists.' : 'Phone number already exists.';
        return { status: false, message: errorMessage };
    }else{
        const userdetails = usergoogledata(fullname,email,image,phoneNumber,dob);
        const newuser = await dbrepository.googlecreate(userdetails);
    
        const isUser={
            userId:newuser._id,
            userName:newuser.name,
            userEmail:newuser.email,
            userphone:newuser.phone,
            userdob:newuser.dob,
            userimg:newuser.image
    
          }

    const AccessToken = await authService.generateAccessToken(isUser);
    const RefreshToken = await authService.generateRefreshToken(isUser);

    return { status: true, isUser, AccessToken, RefreshToken };

   
    };

    
};

export default googleregister
