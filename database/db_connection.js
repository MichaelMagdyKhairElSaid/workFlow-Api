import mongoose from "mongoose";   
const dbConnection = async () => {
    mongoose.connect("mongodb://127.0.0.1:27017/workFlow").then(() => {
        console.log("connected to db");
}).catch((err) => {
        console.log("error message : ",err);
    }) 
}  
export default dbConnection;
