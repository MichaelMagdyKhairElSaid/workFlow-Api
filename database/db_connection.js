import mongoose from "mongoose";   
const dbConnection = async () => {
    mongoose.connect(process.env.DB_ONLINE).then(() => { 
        console.log("connected to db");
}).catch((err) => {
        console.log("error message : ",err);
    }) 
}  
export default dbConnection;
