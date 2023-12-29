

const removelistproperty= async (postId,repositories) => {
    console.log(postId,"oododo");

    try {

        const remove =await repositories.removlisteproperty(postId)
        if(remove===true){

            return ({ status: true})

        }else{
            return({status:false})
        }
       

    } catch {
        return { message: 'Error removing property', status: false };

    }
}
export default removelistproperty
