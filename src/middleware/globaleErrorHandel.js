export const globalError = (err,req,res,next) => {
    console.log(err);
    process.env.MODE == "dev" ? res.status(err.statusCode || 400).json({message:err.message,stack:err.stack}) : res.status(err.statusCode || 400).json({message:err.message})
}