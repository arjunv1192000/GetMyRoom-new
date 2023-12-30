


const userAuthRepositoryInt=(repository)=>{

    const userexist=(number)=>repository.userExist(number);
    const create=(user)=>repository.create(user);
    const userProfile=(userId)=>repository.userProfile(userId)
    const save=(userId,postId)=>repository.save(userId,postId)
    const userSavedproperty=(userId)=>repository.userSavedproperty(userId)
    const userexistemail=(email)=>repository.userexistemail(email);
    const googlecreate=(user)=>repository.googlecreate(user);
    const removeproperty=(userId,postId)=>repository.removeproperty(userId,postId)
    const userDatas=()=>repository.userDatas()
    const userupdate=(fullname,email,image,userId)=>repository.userupdate(fullname,email,image,userId)


    return{
        userexist,
        create,
        userProfile,
        save,
        userSavedproperty,
        userexistemail,
        googlecreate,
        removeproperty,
        userDatas,
        userupdate


    }
}
export default userAuthRepositoryInt