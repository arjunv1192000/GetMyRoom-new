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
    password: {
        type: String,

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
    otp: {
        value: {
          type: String,
        },
        expiresAt: {
          type: Date,
        },
      },


})
const userdata = model("Userdata", userSchema);
export default userdata;