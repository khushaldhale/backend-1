
const jwt = require("jsonwebtoken");
require("dotenv").config()




exports.authentication = async (req, res, next) => {
	try {

		const token = req.cookies.token;


		if (!token) {
			return res.status(401)
				.json({
					success: false,
					message: " you are not logged in "
				})
		}

		const decode = jwt.verify(token, process.env.JWT_SECRET)

		if (decode) {
			// auth data is mapped
			req.decode = decode;

			//  provide return statement here  else  multiple responses are sent
			return next()
		}

		return res.status(403)
			.json({
				success: false,
				message: 'invalid token, login again'
			})
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

exports.isAdmin = async (req, res, next) => {
	try {

		if (req.decode.accountType === "admin") {
			return next()
		}

		return res.status(403)
			.json({
				success: false,
				message: " This is a protected route for  admin only "
			})
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

// same for user as well


exports.isUser = async (req, res) => {
	try {

		if (req.decode.accountType === "user") {
			return next()
		}

		return res.status(403)
			.json({
				success: false,
				message: "This is a protected route for user only "
			})
	}
	catch (error) {
		console.log(error);
		return res.status(500)
			.json({
				success: false,
				message: "internal error occured"
			})
	}
}