import mongoose from "mongoose"

const ConnectDB=async()=>{
    try{
        const connect = await mongoose.connect(`mongodb+srv://${process.env.NEXT_PUBLIC_USER}:${process.env.NEXT_PUBLIC_PASS}@cluster0.ebffp3o.mongodb.net/Registration?retryWrites=true&w=majority`);
        return {error:false,success:true,message:"Connection Established..."}
    }catch(err){
        return {error:true,success:false,message:err.message}
    }
}

export default ConnectDB;