const Getusersdata = async (repositories) => {
  

    try {

        const userdata=await repositories.userDatas()
       
   

        return { status: true,userdata }

    } catch {
        return { message: 'Error getting user profile', status: false };

    }
}
export default Getusersdata