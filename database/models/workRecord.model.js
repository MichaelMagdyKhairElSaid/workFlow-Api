import mongoose from 'mongoose';

const workRecordSchema = new mongoose.Schema({
  clockIn: {
    type: Date,
  },
  clockOut: {
    type: Date, 
  },
  workingHours: {
    type: String,
    validate: {
      validator: (value) => value > 0,
      message: 'Working hours must be a positive number'
    }
  },
  owner:{
    type:mongoose.Types.ObjectId,
    ref:"Employee",
    required:[true,"record owner is required"]
  },
});

workRecordSchema.pre("findOneAndUpdate",async function (next) {

  if (this._update.clockOut && this._update.clockIn) {

    const diffInMs = Math.abs(this._update.clockOut - this._update.clockIn);
    const workingHours = Math.floor(diffInMs / (1000 * 60 * 60)); // Calculate hours as integer

  // Calculate minutes (considering potential decimals)
  const remainingMinutes = (diffInMs % (1000 * 60 * 60)) / (1000 * 60);
  const workingMinutes = Math.floor(remainingMinutes); // Get whole minutes

  // Format working hours in HH:mm string
  const formattedWorkHours = `${workingHours.toString().padStart(2, '0')}:${workingMinutes.toString().padStart(2, '0')}`;

    // Update the document only if workingHours is a valid number
    this.set({ workingHours: formattedWorkHours });
    
  } else {
    console.warn("Missing clock-out or clock-in time, skipping workingHours calculation.");
  }

  next();
});

const workRecordModel = mongoose.model("WorkRecord",workRecordSchema)

export default workRecordModel