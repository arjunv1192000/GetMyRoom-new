

const login=async (phone,dbrepository,otpService)=>{

    return dbrepository.userexist(phone).then(async (user) => {
        console.log(user,"login");
        if (user !=null && user.phone) {
          const otp=await otpService.createotp(user.phone)
    
          return { status: true, phone};
        } else {
          return { message: 'user already exists', status: false };
        }
      });  

}
export default login