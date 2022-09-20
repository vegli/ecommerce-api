const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");

dotenv.config();

mongoose
.connect(process.env.MONGO_URL)
.then(() => console.log("Database connection successfull"))
.catch((err)=> {
    console.log(err);
});

app.use(express.json());

// ROUTES - endpointoiv
app.use("/api/users", userRoute); //    dakle localhost:5000/api/user/usertest(iz user.js! to je ovaj userRoute)

app.use("/api/auth", authRoute);


app.listen(process.env.PORT || 5000, ()=>{
    console.log("Backend sever is running!")
})