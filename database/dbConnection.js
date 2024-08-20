import mongoose from "mongoose";

export const dbConnection = ()=> {
mongoose.connect("mongodb://127.0.0.1:27017/e-commerce").then(()=>{
    console.log("Database connected successfully");
}).catch((err)=>{
console.log("database error",err);
})
}
//mongodb+srv://e-commUser:Mego2002@cluster0.55oeadx.mongodb.net/e-commerce