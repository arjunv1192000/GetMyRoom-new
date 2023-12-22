

const OtpserviceInt=(repository)=>{

    const createotp=(number)=>repository.createotp(number)
    const verify=(otp,phoneNumber)=>repository.verify(otp,phoneNumber)
    const createotptelisign=(number)=>repository.createotptelisign(number)


    return{
        createotp,
        verify,
        createotptelisign

    }
}
export default OtpserviceInt