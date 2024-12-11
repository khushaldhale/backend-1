const express = require('express');
const app = express();
require("dotenv").config()



app.use(express.json());
const cookie = require("cookie-parser");
app.use(cookie());

const cors = require("cors");
app.use(cors({
	origin: "*",
	//  so that we can accept the cookies  as well
	credentials: true
}))

app.get("/", (req, res) => {
	return res.status(200)
		.json({
			success: true,
			message: 'server is up and  running '
		})
}
)

const dbConnect = require("./config/database");
dbConnect()

//  mapping 
const authRoutes = require("./routes/authRoutes");
app.use("/api/v1/auth", authRoutes)

const userRoutes = require("./routes/userRoutes");
app.use("/api/v1/users", userRoutes)
const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
	console.log("server is listening at : ", PORT)
})