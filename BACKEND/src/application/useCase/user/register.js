import NodeCache from 'node-cache';

const register = async (email, repositories, otpService) => {

  // const otpCache = new NodeCache({ stdTTL: 120, checkperiod: 180 });

  console.log(email);

  return repositories.userexistemail(email).then(async (user) => {
    console.log(user);
    if (user === null) {

      // const otpValue = await otpService.createotp();

      // console.log(otpValue);

      // otpCache.set(email, otpValue);

      // const keyExists = otpCache.has(email);

      // if (keyExists) {
       
      //   const storedValue = otpCache.get(email);
      //   console.log('Value in the cache:', storedValue);
      // } else {
      //   console.log('Key does not exist in the cache');
      // }

      // await repositories.saveOtp(email, otpValue);


      // await otpService.sendOtpByEmail(email, otpValue);

      return { status: true};


    } else {
      console.log("hai");
      return { message: 'email already exists', status: false };
    }
  });


};

export default register;