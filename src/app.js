const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const { validatorSignUp } = require("./helper/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middleware/user");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const connectionRouter = require("./routes/connection");
const userRouter = require("./routes/user");


app.use(express.json()); // middleware to parse the body of the request
app.use(cookieParser()); // middleware to parse the cookies of the request
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/",connectionRouter)
app.use("/",userRouter)




const startServer = async () => {
  try {
    await connectDB();
    app.listen(7777, () => {
      console.log("Server is running on port 7777");
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();

/*
Top    -> normal middleware (json parser, auth, logger)
Middle -> routes
Bottom -> error handler

always start the server after the database is connected

*/
