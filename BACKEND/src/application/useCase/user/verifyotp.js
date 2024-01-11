


const verifyotp = async (otp, email, repositories) => {
  console.log(otp, email);

  try {
    const user = await repositories.userexistemail(email);

    if (user && user.otp && user.otp.value && user.otp.expiresAt) {
      const storedOtp = user.otp.value;
      const expiresAt = new Date(user.otp.expiresAt);
      const currentTime = new Date();

      if (otp === storedOtp && expiresAt > currentTime) {
        // Valid OTP
        return { status: true, message: 'OTP verified successfully' };
      } else {
        // Invalid or expired OTP
        return { message: 'Invalid or expired OTP', status: false };
      }
    } else {
      // User not found or missing OTP information
      return { message: 'User not found or missing OTP information', status: false };
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
};

export default verifyotp;
