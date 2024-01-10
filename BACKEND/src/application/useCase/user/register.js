

const register = async (email, repositories) => {

  console.log(email);

  return repositories.userexistemail(email).then(async (user) => {
    console.log(user);
    if (user===null) {

      return { status: true};
    } else  {
      console.log("hai");
      return { message: 'email already exists', status: false };
    }
  });

   
  };
  
  export default register;