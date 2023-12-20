import propertycontroller from "../../../../adapters/controllers/user/propertycontroller.js"
import userpropertyrepositoryImp from "../../../database/mongodb/repositories/user/userpropertyrepositoryImp.js"
import UserpropertyrepositoryInt from "../../../../application/repositories/user/userpropertyrepositoryInt.js"





const propertyRouter=(express)=>{
    const router=express.Router()

    const controller=propertycontroller(UserpropertyrepositoryInt,userpropertyrepositoryImp)

    router.route('/addnewproperty').post(controller.addproperty)
    router.route('/getuserproperty').get(controller.getuserproperty)
    router.route('/getallproperty').get(controller.getproperty)
    router.route('/getsingleproperty').get(controller.selectpropertydata)
   

    return router;
}
export default propertyRouter ;