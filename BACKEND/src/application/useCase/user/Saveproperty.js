const Saveproperty = async (repositories,UserId,postId) => {
    console.log(postId,UserId);

    try {
       
         const saveproperty=await repositories.save(UserId,postId)
         if(saveproperty===true){
            return ({status:true})

         }else{
            return({status:false})

         }
      

    } catch {
        return { message: 'Error gettin saving property', status: false };

    }
}
export default Saveproperty