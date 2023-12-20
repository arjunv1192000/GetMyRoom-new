import login from "../../../application/useCase/admin/login.js"
import Getusersdata from "../../../application/useCase/admin/getusersdata.js"
import getalllistedproperty from "../../../application/useCase/admin/listedpropertydata.js"
import getallunlistedproperty from "../../../application/useCase/admin/unlistedpropertydata.js"
import Verifyproperty from "../../../application/useCase/admin/listingproperty.js"


const authController = (adminAuthRepositoryInt,adminAuthRepositoryImp,UserpropertyrepositoryInt,userpropertyrepositoryImp,AuthserviceInt,AuthserviceImp,userAuthRepositoryInt,userAuthRepositoryImp) => {

    const dbrepository = adminAuthRepositoryInt(adminAuthRepositoryImp())
    const authService = AuthserviceInt(AuthserviceImp())
    const propertyrepository=UserpropertyrepositoryInt(userpropertyrepositoryImp())
    const userdbrepository=userAuthRepositoryInt(userAuthRepositoryImp())
    

    const adminLogin = (req, res) => {
        const { email, password } = req.body
        console.log(email,password);
        login(email, password, dbrepository, authService).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))

    }

    const getuserdata=(req,res)=>{

       
        Getusersdata(userdbrepository).then((response)=>{
            console.log(response);
            res.json(response)
    
        }).catch((err)=>console.log(err))
    
     }

     const getlistedproperty=(req,res)=>{
        getalllistedproperty(propertyrepository).then((response)=>{
            console.log(response);
            res.json(response)
    
        }).catch((err)=>console.log(err))
    
     }
     const getunlistedproperty=(req,res)=>{
        getallunlistedproperty(propertyrepository).then((response)=>{
            console.log(response);
            res.json(response)
    
        }).catch((err)=>console.log(err))
    
     }
     const verifyproperty=(req,res)=>{
        const {postId } = req.body
        console.log(req.body);

        Verifyproperty(propertyrepository,postId).then((response)=>{
            console.log(response);
            res.json(response)

        }).catch((err)=>console.log(err))


     }

   


    return {
      
        adminLogin,
        getuserdata,
        getlistedproperty,
        getunlistedproperty,
        verifyproperty
        
        
    }

}
export default authController