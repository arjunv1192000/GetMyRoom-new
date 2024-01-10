 
const userdata=(name,email,hashpassword,image)=>{
    
    return{
        getname:()=>name,
        getemail:()=>email,
        getpassword:()=>hashpassword,
        getimage:()=>image,
       
    }


}

export default userdata