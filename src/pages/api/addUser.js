import ConnectDB from "@/ConnectDB";
import userModel from "@/schemas/UserSchema";

const handler = async (req, res) => {
	if (req.method !== "POST") {
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

	try {
		const find = await userModel.find({ email: req.body.email });
		if (find.length > 0) {
			res.status(200).json({
				error: false,
				success: true,
				message: "This Email-ID User Already Exist..",
                isUserExist:true
			});
			return;
		} else {
			try {
				const save = await userModel.create({ ...req.body });
				res.status(200).json({
					error: false,
					status: true,
					message: "User Successfully Added",
                    isUserExist:false
				});
				return;
			} catch (err) {
				res.status(500).json({
					error: true,
					status: false,
					message: err.message,
				});
				return;
			}
		}
	} catch (err) {
		res.status(500).json({
			error: true,
			status: false,
			message: err.message,
		});
		return;
	}
};

export default handler;
