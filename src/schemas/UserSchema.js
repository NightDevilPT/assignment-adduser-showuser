import mongoose, { Schema } from "mongoose"


const userSchema = new Schema({
    firstname:{
        type:String,
        required:[true,"First Name is Empty"]
    },
    lastname:{
        type:String,
        required:[true,"Last Name is Empty"]
    },
    email:{
        type:String,
        required:[true,"Email-ID is Empty"]
    },
    gender:{
        type:String,
        required:[true,"Gender is Empty"]
    },
    country:{
        type:String,
        required:[true,"Country is Empty"]
    },
    state:{
        type:String,
        required:[true,"State is Empty"]
    },
    dateofbirth:{
        type:String,
        required:[true,"Date of Birth is Empty"]
    }
});

const userModel = mongoose.models.registration||mongoose.model("registration",userSchema);
export default userModel;