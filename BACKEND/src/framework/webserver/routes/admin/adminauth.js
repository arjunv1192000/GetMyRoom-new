import authController from "../../../../adapters/controllers/admin/authController.js";
import adminAuthRepositoryImp from "../../../database/mongodb/repositories/admin/adminauthrepositoryImp.js";
import adminAuthRepositoryInt from "../../../../application/repositories/admin/adminrepositoryInt.js";
import AuthserviceInt from "../../../../application/services/admin/authserviceInt.js";
import AuthserviceImp from "../../../services/admin/authserviceImp.js";
import userpropertyrepositoryImp from "../../../database/mongodb/repositories/user/userpropertyrepositoryImp.js"
import UserpropertyrepositoryInt from "../../../../application/repositories/user/userpropertyrepositoryInt.js"
import userAuthRepositoryImp from "../../../database/mongodb/repositories/user/userauthrepositoryImp.js";
import userAuthRepositoryInt from "../../../../application/repositories/user/userauthrepositoryInt.js";



const authRouterAdmin=(express)=>{
    const router=express.Router()

const controller=authController(adminAuthRepositoryInt,adminAuthRepositoryImp,UserpropertyrepositoryInt,userpropertyrepositoryImp,AuthserviceInt,AuthserviceImp,userAuthRepositoryInt,userAuthRepositoryImp)

    
    router.route('/login').post(controller.adminLogin)
    router.route('/getuserdetails').get(controller.getuserdata)
    router.route('/getuserlistedproperty').get(controller.getlistedproperty)
    router.route('/getuserunlistedproperty').get(controller.getunlistedproperty)
    router.route('/verify').post(controller.verifyproperty)
   

    return router;

}
export default authRouterAdmin;