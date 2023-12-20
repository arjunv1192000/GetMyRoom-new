import jwt from 'jsonwebtoken';
import config from '../../../config/config.js';

const AuthserviceImp=()=>{

    const generateAccessToken=(user)=>jwt.sign({user},config.ACESS_TOKEN_SCERET,{expiresIn:'25m'})
    const generatRefreshToken=(user)=>jwt.sign({user},config.REFRESH_TOKEN_SECRET,{expiresIn:"7d"})
    const verifyAccessToken = (token) => jwt.verify(token, config.ACESS_TOKEN_SCERET);
    const verifyRefreshToken=(token)=>jwt.verify(token,config.REFRESH_TOKEN_SECRET)



    return{
        generateAccessToken,
        generatRefreshToken,
        verifyAccessToken,
        verifyRefreshToken
        
    }

}

export default AuthserviceImp