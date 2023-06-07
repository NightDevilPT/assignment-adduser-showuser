import ConnectDB from "@/ConnectDB";
import userModel from "@/schemas/UserSchema";

const handler = async (req, res) => {
	if (req.method !== "GET") {
		res.status(400).json({
			error: true,
			success: false,
			message: "Wrong Protocol used",
		});
		return;
	}

	const connect = await ConnectDB();
	if (!connect.success) {
		res.status(500).json({
			error: true,
			success: false,
			message: "DataBase Connection Error",
		});
		return;
	}

    try{
        const allUsers = await userModel.find();
        res.status(200).json({error:false,success:true,data:allUsers});
        return;
    }catch(err){
        res.status(400).json({error:true,success:false,message:"Server Error..."});
        return;
    }
}

export default handler