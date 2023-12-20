import commonserviceController from '../../../adapters/controllers/commonservicecontroller.js'


const commonservice=(express)=>{
    const router=express.Router()

    const controller=commonserviceController()
    router.route('/s3service').get(controller.s3service)
    router.route('/nodemailer').post(controller.createemail)
   
    return router

   

}
export default commonservice ;