import AppError from "../../utils/services/AppError.js";
import catchAsyncError from "../../utils/middleware/catchAsyncError.js";

const deleteOne = (model)=>{
  return  catchAsyncError(async (req, res, next) => {
  
        let { id } = req.params;
        console.log("req.params",id);
        let category = await model.findByIdAndDelete(id);
        console.log(category);
        !category && next(new AppError("not found category",404))
        category && res.json({message: "done", category });
      });
}

export default deleteOne;