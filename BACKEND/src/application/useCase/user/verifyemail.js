

const Verifyemail = async (email, repositories, otpService) => {

    console.log(email);

    return repositories.userexistemail(email).then(async (user) => {
        console.log(user, "ssss");
        if (user === null) {

            return { message: 'email not found', status: false };


        } else {
            const otpValue = await otpService.createotp();

            console.log(otpValue);

            await repositories.saveOtp(email, otpValue);


            await otpService.sendOtpByEmail(email, otpValue);

            return { status: true };
        }
    });


};

export default Verifyemail;