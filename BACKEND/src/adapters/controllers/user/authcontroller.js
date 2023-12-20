import register from "../../../application/useCase/user/register.js"
import verifyotp from "../../../application/useCase/user/verifyotp.js"
import adduser from "../../../application/useCase/user/adduser.js"
import login from "../../../application/useCase/user/login.js"
import verifyotplogin from "../../../application/useCase/user/loginverification.js"
import getuserprofile from "../../../application/useCase/user/getprofile.js"
import Saveproperty from "../../../application/useCase/user/Saveproperty.js"
import getsavedproperty from "../../../application/useCase/user/getsavedproperty.js"
import googleregister from "../../../application/useCase/user/googleregister.js"
import googlelogin from "../../../application/useCase/user/googlelogin.js"
import removepropertys from "../../../application/useCase/user/removeproperty.js"
import userdataupdation from "../../../application/useCase/user/userdataupdation.js"


const Authcontroller = (userAuthRepositoryInt, userAuthRepositoryImp, authServiceInterface, authServiceImp,otpserviceInt,otpserviceImp) => {

    const dbrepository = userAuthRepositoryInt(userAuthRepositoryImp())
    const authService = authServiceInterface(authServiceImp())
    const otpService=otpserviceInt(otpserviceImp())


    const createuser = (req, res) => {
        const{phoneNumber}=req.body
    
        register(phoneNumber,dbrepository,otpService).then((response)=>{
            console.log(response,"login");
            res.json(response)

          
        }).catch((err)=>console.log(err))


    }
    const otpverification = (req, res) =>{
        const {otp,phoneNumber}=req.body

        verifyotp(otp,phoneNumber,otpService).then((response)=>{
            res.json(response)
          
        }).catch((err)=>console.log(err))
    }

       


    
    const userlogin = (req, res) => {
        const{phoneNumber}=req.body
        login(phoneNumber,dbrepository,otpService,authService).then((response)=>{
            console.log(response,"login");
            res.json(response)

        }).catch((err)=>console.log(err))

    }

    const adduserdata = (req, res) => {
        const{phoneNumber,name,email,dob,image}=req.body

        console.log(req.body,"kittyooooo");

        adduser(phoneNumber,name,email,dob,image,dbrepository,authService).then((response)=>{
            console.log(response);
            res.json(response)
          
        }).catch((err)=>console.log(err))



    }


    const loginverification = (req, res) => {

        const {otp,phoneNumber}=req.body

        verifyotplogin(otp,phoneNumber,dbrepository,otpService,authService).then((response)=>{
            res.json(response)
          
        }).catch((err)=>console.log(err))
    }


    const selectprofiledata=(req,res)=>{
        const userId = req.query.id;
        console.log(userId,"auth");
       
        getuserprofile(userId,dbrepository).then((response)=>{
            console.log(response);
            res.json(response)
    
        }).catch((err)=>console.log(err))
    
     }

     const saveproperty=(req,res)=>{
        const { UserId, postId } = req.body
        console.log(req.body);

        Saveproperty(dbrepository,UserId,postId).then((response)=>{
            console.log(response);
            res.json(response)

        }).catch((err)=>console.log(err))


     }
     const selectsavedproperty=(req,res)=>{
        const userId=req.query.id
        console.log(userId);
       
        getsavedproperty(userId,dbrepository).then((response)=>{
            res.json(response)
    
        }).catch((err)=>console.log(err))
    }


    const createuserbygoogle=(req,res)=>{
        const{fullname,email,image,phoneNumber,dob}=req.body
        googleregister(fullname,email,image,phoneNumber,dob,dbrepository,authService).then((response)=>{
            res.json(response)
        }).catch((err)=>console.log(err))
    }



    const userloginbygoogle=(req,res)=>{
            
        const {email}=req.body
        googlelogin(email,dbrepository,authService).then((response)=>{
            console.log(response,"google login");
            res.json(response)

        }).catch((err)=>console.log(err))

    }
    const removeproperty=(req,res)=>{

        const {UserId,postId} = req.body
        removepropertys(UserId,postId,dbrepository).then((response)=>{
            res.json(response)

        }).catch((err)=>console.log(err))


     }

     const updateuserdata=(req,res)=>{
        const{name,email,image,dob,userId}=req.body
        userdataupdation(name,email,image,dob,userId,dbrepository,authService).then((response)=>{
            res.json(response)
        }).catch((err)=>console.log(err))
    }


    return {
        createuser,
        otpverification,
        userlogin,
        adduserdata,
        loginverification,
        selectprofiledata,
        saveproperty,
        selectsavedproperty,
        createuserbygoogle,
        userloginbygoogle,
        removeproperty,
        updateuserdata
        

    }



    }
export default Authcontroller