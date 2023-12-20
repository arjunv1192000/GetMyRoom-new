
const  adminAuthRepositoryInt=(repository)=>{
    
    const adminExist=(email,password)=>repository.adminExist(email,password);
   



    return{
        adminExist,
       
    }

}
export default adminAuthRepositoryInt