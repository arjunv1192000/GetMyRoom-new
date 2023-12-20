

const OtpserviceInt=(repository)=>{

    const createotp=(number)=>repository.createotp(number)
    const verify=(otp,phoneNumber)=>repository.verify(otp,phoneNumber)


    return{
        createotp,
        verify

    }
}
export default OtpserviceInt