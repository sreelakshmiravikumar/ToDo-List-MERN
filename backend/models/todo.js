import mongoose from 'mongoose';

const Todo=mongoose.model("ToDo",{
 todo:{
   type:String,
   default:'task',
   required:true
 },
 completed:{
    type:Boolean,
    default:false
 }
})
export {Todo}