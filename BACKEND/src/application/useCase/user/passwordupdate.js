const passwordupdate = async (email,password,repositories,authService) => {
    try {
      const hashPassword = await authService.bcryptpassword(password);

      console.log(hashPassword);
     
      const userupdate = await repositories.userpasswodupdate(email,hashPassword);
      console.log(userupdate,"updated");
  
      return { status: true,};
    } catch (error) {
      console.error("Error creating new user:", error.message);
      return { status: false, message: error.message };
    }
  };
  
  export default passwordupdate;