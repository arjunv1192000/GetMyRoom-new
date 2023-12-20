 
const propertydata=(userId,title,type,location,room,bathrooms,bedrooms,buildYear,features,image,video,description,price,floorplans,seller)=>{
    
    return{
        getuserid:()=>userId,
        gettitle:()=>title,
        gettype:()=>type,
        getlocation:()=>location,
        getroom:()=>room,
        getbathrooms:()=>bathrooms,
        getbedrooms:()=>bedrooms,
        getbuildYear:()=>buildYear,
        getfeatures:()=>features,
        getimage:()=>image,
        getvideo:()=>video,
        getdescription:()=>description,
        getprice:()=>price,
        getfloorplans:()=>floorplans,
        getseller:()=>seller,
       
    }


}

export default propertydata