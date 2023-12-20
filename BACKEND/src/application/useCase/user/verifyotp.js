


const verifyotp= async(otp,phoneNumber,otpService)=>{

    return otpService.verify(otp,phoneNumber).then(async (user) => {
        if (user) {
          return { status: true};
        } else {
          return { message: 'Invalid otp', status: false };
        }
      });
    


}
export default verifyotp