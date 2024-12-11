const userSchema = require("../models/user")




exports.getAllUsers = async (req, res) => {
	try {

		const response = await userSchema.find({});

		if (response.length > 0) {
			return res.status(200)
				.json({
					success: true,
					message: " all users are fetched succefully",
					data: response
				})
		}

		else {
			return res.status(200)
				.json({
					success: true,
					message: "No user is created yet ",
					data: response
				})
		}
	}
	catch (error) {
		console.log(error)
		return res.status(500)
			.json({
				success: false,
				message: "Internal error occured"
			})
	}
}