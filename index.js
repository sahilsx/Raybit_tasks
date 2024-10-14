const postRouter = require("./Routes/postroutes");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const express = require("express");
const AdminRoutes = require("./Routes/adminroutes");
const CrudRouter = require("./Routes/crudroutes");
const UserRouter = require("./Routes/userroutes");
const dotenv = require("dotenv").config({ path: "./.env" });
const UUserRoutes = require("./Routes/user2routes");
const Razorpay = require("razorpay");
const globalErrorHandler = require("./middlewares/GlobalerrorHandler");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  bodyParser.json({
    limit: "50mb",
  })
);
app.use(morgan("dev"));
app.use(cors());

app.use(globalErrorHandler);

app.use("/user", UserRouter);
app.use("/crud", CrudRouter);
app.use("/product", postRouter);
app.use("/user2", UUserRoutes);
app.use("/admin", AdminRoutes);

module.exports = app;
