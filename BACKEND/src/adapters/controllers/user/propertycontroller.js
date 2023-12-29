
import adduserproperty from "../../../application/useCase/user/addproperty.js"
import Getuserproperty from "../../../application/useCase/user/getuserproperty.js"
import getallproperty from "../../../application/useCase/user/getallproperty.js"
import getsingleproperty from "../../../application/useCase/user/getsingleproperty.js"
import removelistproperty from "../../../application/useCase/user/removelistproperty.js"


const propertycontroller=(userpropertyrepositoryInt,userpropertyrepositoryImp)=>{

    const dbrepository=userpropertyrepositoryInt(userpropertyrepositoryImp())


    const addproperty=(req,res)=>{
     const {userId,tilte,type,location,room,bathrooms,bedrooms,buildYear,features,image,video,description,price,floorplans,seller}=req.body
     adduserproperty(userId,tilte,type,location,room,bathrooms,bedrooms,buildYear,features,image,video,description,price,floorplans,seller,dbrepository).then((response)=>{
        console.log(response);
         res.json(response)
       
     }).catch((err)=>console.log(err))   
 }


 const getuserproperty=(req,res)=>{
    const userId=req.query.id
    console.log(userId);

    Getuserproperty(userId,dbrepository).then((response)=>{
        console.log(response);
         res.json(response)
       
     }).catch((err)=>console.log(err)) 
 }

 const getproperty=(req,res)=>{
    const location=req.query.location
    const type=req.query.type
    console.log(type,location);
    


    getallproperty(location,type,dbrepository).then((response)=>{
        console.log(response);
        res.json(response)

    }).catch((err)=>console.log(err))

 }
 const selectpropertydata=(req,res)=>{
    const Id = req.query.id;
    console.log(Id,"auth");
   
    getsingleproperty(Id,dbrepository).then((response)=>{
        console.log(response);
        res.json(response)

    }).catch((err)=>console.log(err))

 }

 const removepropertyes=(req,res)=>{

    const {postId} = req.body
    console.log(postId,"ploooo");
    removelistproperty(postId,dbrepository).then((response)=>{
        res.json(response)

    }).catch((err)=>console.log(err))


 }


   


    return{
        addproperty,
        getuserproperty,
        getproperty,
        selectpropertydata,
        removepropertyes

    }
}

export default propertycontroller