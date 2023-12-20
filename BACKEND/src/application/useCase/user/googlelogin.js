
const googlelogin= async(email,repositories,authService)=>{
    console.log(email);

    const isEmail=await repositories.userexistemail(email)
    console.log(isEmail);
    if(isEmail && isEmail.email){
        const isUser={
            userId:isEmail._id,
            userName:isEmail.name,
            userEmail:isEmail.email,
            userphone:isEmail.phone,
            userdob:isEmail.dob,
            userimg:isEmail.image
    
          }
          const AccessToken = await authService.generateAccessToken(isUser);
          const RefreshToken = await authService.generatRefreshToken(isUser);

        return({status:true,isUser,AccessToken,RefreshToken})
       
    }else if(isEmail==null){
        const errorMessage ='Invalid user';
        return ({status:false, message: errorMessage})
    }


}
export default googlelogin