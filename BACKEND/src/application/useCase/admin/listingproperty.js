const Verifyproperty = async (repositories,postId) => {
    console.log(postId,"gdfugdfg");

    try {
       
         const verification=await repositories.verification(postId)
         if(verification===true){
            return ({status:true})

         }else{
            return({status:false})

         }
      

    } catch {
        return { message: 'Error gettin verify property', status: false };

    }
}
export default Verifyproperty