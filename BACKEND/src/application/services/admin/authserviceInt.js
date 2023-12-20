

const AuthserviceInt=(repository)=>{

    const bcryptpassword = (password) => repository.bcryptpassword(password);
    const comparePassword = (password, hashPassword) => repository.comparePassword(password, hashPassword);
    const generateAccessToken = (user) => repository.generateAccessToken(user);
    const generatRefreshToken=(userId)=>repository.generatRefreshToken(userId)
    const verifyAccessToken=(token)=>repository.verifyAccessToken(token)
    const verifyRefreshToken=(token)=>repository.verifyRefreshToken(token)


    return{
        bcryptpassword,
        comparePassword,
        generateAccessToken,
        generatRefreshToken,
        verifyAccessToken,
        verifyRefreshToken
        
    }

}
export default AuthserviceInt