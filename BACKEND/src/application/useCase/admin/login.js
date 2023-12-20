const login = async (email, password, repositories,authService) => {

    const isEmail = await repositories.adminExist(email,password)
      console.log(isEmail,"ppppppp");
    if (isEmail.email!==null && isEmail.password) {
        const isPassword = await authService.comparePassword(password, isEmail.password)
        console.log(isPassword);
        if (isPassword) {

            const isAdmin= {
                recruiterId: isEmail._id,
                recruiterEmail: isEmail.email,
                

            }
            const AccessToken = await authService.generateAccessToken(isAdmin);
            const RefreshToken = await authService.generatRefreshToken(isAdmin);

            console.log(AccessToken,RefreshToken,isAdmin);


            return({status:true,isAdmin,AccessToken,RefreshToken})

        } else {

            return ({ status: false })

        }
    } else if(isEmail=null)  {

        return ({ message: 'Invalid email or password', status: false })
    } else  {

        return ({ message: 'Invalid email or password', status: false })
    }


}
export default login 