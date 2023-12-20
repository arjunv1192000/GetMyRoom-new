

const removepropertys = async (userId,postId,repositories) => {

    console.log(userId,"ppppppppp");
    
    console.log(postId,"ppppppppjfjfjjfjfjp");

    try {

        const remove=await repositories.removeproperty(userId,postId)
        if(remove===true){

            return ({ status: true})

        }else{
            return({status:false})
        }
       

      

    } catch {
        return { message: 'Error removing property', status: false };

    }
}
export default removepropertys
