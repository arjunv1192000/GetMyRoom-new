import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_TOKEN;
const serviceToken = process.env.Service_ID;

const client = twilio(accountSid, authToken, { serviceSid: serviceToken });

const OtpserviceImp = () => {
    const createotp = async (number) => {
        console.log(number,"creation");
        try {
            const serviceSid = process.env.Service_ID;

            const verification = await client.verify.services(serviceSid)
                .verifications
                .create({ to: number, channel: 'sms' });

            console.log(`OTP sent to ${number}:`, verification);

           
            const otp = 'GeneratedOTP'; 
            return otp;
        } catch (error) {
            console.error('Error sending OTP:', error);
            throw error;
        }
    };

    const verify = async (otp,phoneNumber) => {

          
        try {

            const serviceSid = process.env.Service_ID;
            const verificationCheck = await client.verify.services(serviceSid).verificationChecks.create({ to: phoneNumber, code: otp });

             console.log('Verification Status:', verificationCheck.status);

           return verificationCheck.status;

           
        } catch (error) {
            console.error('Error verify OTP:', error);
            throw error;
        }
    };

    return {
        createotp,
        verify
    };
};

export default OtpserviceImp;
