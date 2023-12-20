

const AuthserviceInt=(repository)=>{

    const generateAccessToken = (user) => repository.generateAccessToken(user);
    const generatRefreshToken=(userId)=>repository.generatRefreshToken(userId)
    const verifyAccessToken=(token)=>repository.verifyAccessToken(token)
    const verifyRefreshToken=(token)=>repository.verifyRefreshToken(token)


    return{
        generateAccessToken,
        generatRefreshToken,
        verifyAccessToken,
        verifyRefreshToken
        
    }

}
export default AuthserviceInt