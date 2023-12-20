

const register = async (phone, repositories,otpService) => {

  return repositories.userexist(phone).then(async (user) => {
    console.log(user);
    if (user===null) {
      const otp=await otpService.createotp(phone)

      return { status: true,phone};
    } else  {
      console.log("hai");
      return { message: 'email already exists', status: false };
    }
  });

   
  };
  
  export default register;