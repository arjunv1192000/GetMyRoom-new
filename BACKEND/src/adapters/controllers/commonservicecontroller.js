import fileUpload from "../../application/useCase/common/FileuploadingUrl.js"
import Nodemailer  from "../../application/useCase/common/Nodemailer.js"

const commonserviceController=()=>{
    const s3service=(req,res)=>{
        fileUpload().then((response)=>{
            
            res.json({response})
            

        }).catch(()=>console.log(ErrorEvent))
    }

    const createemail=(req,res)=>{
        
        const {fullname,email,phoneNumber,message,useremail,propertyname,location,name}=req.body

        Nodemailer(fullname,email,phoneNumber,message,useremail,propertyname,location,name).then((response)=>{

            console.log(response,"poooo");
            
            res.json({response})
            

        }).catch(()=>console.log(ErrorEvent))
    }

  

return{
    s3service,
    createemail,
   
}

}
export default commonserviceController