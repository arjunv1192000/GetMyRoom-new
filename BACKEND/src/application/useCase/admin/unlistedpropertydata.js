const getallunlistedproperty = async (repositories) => {
  
    try {

        const userdata=await repositories.unlistedproperty()
       
   

        return { status: true,userdata }

    } catch {
        return { message: 'Error getting property', status: false };

    }
}
export default getallunlistedproperty