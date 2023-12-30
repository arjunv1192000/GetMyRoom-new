import { createSlice } from "@reduxjs/toolkit";


type RootState = {
    user: {
      value: {
        id: string | null;
        name: string | null;
        email: string | null;
        image:string|null;
        access_token: string;
       
      };
    };
  };

const intialValue = {value:{id:null,
    name:null,
    email:null,
    access_token:"",
    image:null,
  
    
    
}}


export const userSlice=createSlice({
    name:"user",
    initialState:intialValue,
    reducers:{
        login:(state,action)=>{
            console.log(intialValue);
               state.value= action.payload 
               console.log(state.value);
               
           
        },
        logout:()=>{
            localStorage.removeItem('access_token_user'),
            localStorage.removeItem('refresh_token-user')
            return intialValue
            
        }
    }
})

export const { login, logout } = userSlice.actions













