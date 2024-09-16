import { configureStore } from "@reduxjs/toolkit";
import  authReducetr from "./authSclice"

export const store  =  configureStore({
   reducer :{
     auth :authReducetr
   }
})
   