

const OtpserviceInt=(repository)=>{

    const createotp=()=>repository.createotp()
    const sendOtpByEmail=(email, otpValue)=>repository.sendOtpByEmail(email, otpValue)
   


    return{
        createotp,
        sendOtpByEmail
       

    }
}
export default OtpserviceInt