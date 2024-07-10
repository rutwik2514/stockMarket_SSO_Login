import mongoose,{Schema} from "mongoose";

const userSchema = new mongoose.Schema(
    {
      userName: {
        type: String,
        required: true,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
      },
      portfolio:{
        type:Schema.ObjectId,
        ref:"Portfolio",
      },
     },
    { timestamps: true }
  );
  
  const User = mongoose.model('User', userSchema);
  
  export default User;
