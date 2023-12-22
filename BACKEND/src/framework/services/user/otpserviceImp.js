import twilio from 'twilio';
// import telesignsdk from "telesignsdk"

// const customerId ="EEF31231-3BC1-4AD3-createotptelisign-D1DA52E31C48";
// const apiKey = "Nn/KjxarzqIgIQqmeYkOXffUsXBC6ToykHSQxqsXd7NSjZ3WLjZr/1YPbvXJmU24PDHIGeBSlBlw1N9i4SZL+A==";
// const message = "Your package has shipped! Follow your delivery at https://vero-finto.com/orders/3456";
// const messageType = "ARN";



const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_TOKEN;
const serviceToken = process.env.Service_ID;

const client = twilio(accountSid, authToken, { serviceSid: serviceToken });

const OtpserviceImp = () => {
    const createotp = async (number) => {
        console.log(number,"creation");
        try {
            const serviceSid = process.env.Service_ID;

            const verification = await client.verify.v2.services(serviceSid)
                .verifications
                .create({ to: number, channel: 'sms' });

            console.log(`OTP sent to ${number}:`, verification);
            const otp = 'GeneratedOTP'; 
            return otp;
        } catch (error) {
            console.error('Error sending OTP:', error.message);
            console.error('Twilio error details:', error.details);
            throw error;
        }
    };

    const verify = async (otp,phoneNumber) => {

          
        try {

            const serviceSid = process.env.Service_ID;
            const verificationCheck = await client.verify.v2.services(serviceSid).verificationChecks.create({ to: phoneNumber, code: otp });

             console.log('Verification Status:', verificationCheck.status);

           return verificationCheck.status;

           
        } catch (error) {
            console.error('Error verify OTP:', error);
            throw error;
        }
    };

    // const  createotptelisign=async(number)=>{

    //     console.log(number);

    //     function sendSMS(callback) {
    //         const client = new telesignsdk(customerId, apiKey);
    //         client.sms.message(callback, number, message, messageType);
    //     }
        
    //     function smsCallback(error, responseBody) {
    //         if (error === null) {
    //             console.log("\nSMS sent successfully. Response body:\n" + JSON.stringify(responseBody));
    //         } else {
    //             console.error("Unable to send SMS. Error:\n\n" + error);
    //         }
    //     }

    //     sendSMS(smsCallback);

    // }

    return {
        createotp,
        verify,
        // createotptelisign
    };
};

export default OtpserviceImp;
