import Authcontroller from "../../../../adapters/controllers/user/authcontroller.js";
import AuthserviceInt from "../../../../application/services/user/authserviceInt.js";
import AuthserviceImp from "../../../services/user/authserviceImp.js";
import userAuthRepositoryImp from "../../../database/mongodb/repositories/user/userauthrepositoryImp.js";
import userAuthRepositoryInt from "../../../../application/repositories/user/userauthrepositoryInt.js";
import OtpserviceInt from "../../../../application/services/user/otpserviceInt.js";
import OtpserviceImp from "../../../../framework/services/user/otpserviceImp.js"

const authRouter=(express)=>{
    const router=express.Router()
    const controller=Authcontroller(userAuthRepositoryInt,userAuthRepositoryImp,AuthserviceInt,AuthserviceImp,OtpserviceInt,OtpserviceImp)

    router.route('/register').post(controller.createuser)
    router.route('/verifyotp').post(controller.otpverification)
    router.route('/login').post(controller.userlogin)
    router.route('/adduserdata').post(controller.adduserdata)
    router.route('/getprofile').get(controller.selectprofiledata)
    router.route('/verifyotplogin').post(controller.loginverification)
    router.route('/save').post(controller.saveproperty)
    router.route('/getsavedjobs').get(controller.selectsavedproperty)
    router.route('/googlesignup').post(controller.createuserbygoogle)
    router.route('/googlelogin').post(controller.userloginbygoogle)
    router.route('/removeproperty').post(controller.removeproperty)
    router.route('/updateuserdata').post(controller.updateuserdata)
    router.route('/checkemail').post(controller.verifyemail)
    router.route('/updatepassword').post(controller.updatepassword)
    


    return router;
}
export default authRouter ;