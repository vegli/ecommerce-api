const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const cors = require("cors")

dotenv.config();

mongoose
.connect(process.env.MONGO_URL)
.then(() => console.log("Database connection successfull"))
.catch((err)=> {
    console.log(err);
});

app.use(express.json());
app.use(cors())


app.use("/api/users", userRoute); //    dakle localhost:5000/api/user/usertest(iz user.js! to je ovaj userRoute)
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);



app.listen(process.env.PORT || 5000, ()=>{
    console.log("Backend sever is running!")
})