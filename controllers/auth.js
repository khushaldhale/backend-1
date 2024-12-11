const userSchema = require("../models/user");
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
require("dotenv").config()


exports.signup = async (req, res) => {
	try {

		const { fname, lname, email, password, accountType } = req.body;

		if (!fname || !lname || !email || !password || !accountType) {
			return res.status(404)
				.json({
					success: false,
					message: "kindly provide all credentials"
				})
		}

		const is_existing = await userSchema.findOne({ email });
		if (is_existing) {
			return res.status(404)
				.json({
					success: false,
					message: "you are already registered, kindly login "
				})
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const response = await userSchema.create({ fname, lname, email, password: hashedPassword, accountType });

		return res.status(200)
			.json({
				success: true,
				message: " user is created succesfuly",
				data: response
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


exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(404)
				.json({
					success: false,
					message: "kindly provide credentials"
				})
		}


		const is_existing = await userSchema.findOne({ email });

		if (!is_existing) {
			return res.status(404)
				.json({
					success: false,
					message: "you are not registered yet "
				})
		}

		if (await bcrypt.compare(password, is_existing.password)) {
			const token = jwt.sign({
				//  for  authentication 
				_id: is_existing._id,
				//  for authorization
				accountType: is_existing.accountType
			},
				process.env.JWT_SECRET,
				{
					expiresIn: "24h"
				})

			//  sensitive information is sent via cookie and
			// non sensitive is done  via  response json
			return res.cookie("token", token, {
				httpOnly: true,
				secure: true,
				sameSite: "None",
				expires: new Date(Date.now() + 1000 * 60 * 60 * 24),

			})
				.status(200)
				.json({
					success: true,
					message: "user is logged in succefully",
					data: is_existing
				})
		}
		else {
			return res.status(404)
				.json({
					success: false,
					message: "password is incorrect "
				})
		}
	}
	catch (error) {
		console.log(error);

		return res.status(500)
			.json({
				success: false,
				message: "Internal error occured"
			})
	}
}


exports.logout = async (req, res) => {
	try {

		return res.cookie("token", null, {
			httpOnly: true,
			sameSite: "None",
			secure: true,
			expires: new Date(Date.now())
		})
			.status(200)
			.json({
				success: true,
				message: "you are successfully logged out "
			})
	}
	catch (error) {
		console.log(error);
		return res.status(500)
			.json({
				success: false,
				message: "Internal error occured"
			})
	}
}