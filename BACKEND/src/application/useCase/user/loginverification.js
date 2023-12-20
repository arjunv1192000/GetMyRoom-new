const verifyotplogin = async (otp, phone, repositories, otpService, authService) => {
    try {
        
        const isOtpValid = await otpService.verify(otp, phone);
        if (!isOtpValid) {
            throw new Error('Invalid OTP');
        }

       
        const user = await repositories.userexist(phone);
        if (!user) {
            throw new Error('User does not exist');
        }

       
        const isUser = {
            userId: user._id,
            userName: user.name,
            userEmail: user.email,
            userphone: user.phone,
            userimg:user.image,
            userdob: user.dob
        };

        const AccessToken = await authService.generateAccessToken(isUser);
        const RefreshToken = await authService.generatRefreshToken(isUser);

        return { status: true, isUser, AccessToken, RefreshToken };
    } catch (error) {
        return { message: error.message, status: false };
    }
};

export default verifyotplogin;
