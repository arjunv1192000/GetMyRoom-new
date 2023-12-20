const getalllistedproperty = async (repositories) => {
  
    try {

        const userdata=await repositories.listedproperty()
       
   

        return { status: true,userdata }

    } catch {
        return { message: 'Error getting property', status: false };

    }
}
export default getalllistedproperty