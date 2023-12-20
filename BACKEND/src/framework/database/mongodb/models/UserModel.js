import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: String,
       

    },
    dob:{
        type:String
    },
    image: {
        type: String
    },
   
    isBlock:{
        type:Boolean
    },
    savedlist: { 
        
            type:[Schema.Types.ObjectId],
            ref: "Properties",
    

    },


})
const userdata = model("Userdata", userSchema);
export default userdata;