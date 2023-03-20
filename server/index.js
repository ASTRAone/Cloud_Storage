require('dotenv').config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./routes/index")
const app = express();
const corsMiddleware = require("./middleware/cors.middleware");
const errorMiddleware = require("./middleware/error.middleware");

app.use(corsMiddleware);
app.use(express.json());
app.use(cookieParser())

app.use("/api", router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect((process.env.DB_URL), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });

    app.listen(process.env.SERVER_PORT, () => {
      console.log("server started on PORT = ", process.env.SERVER_PORT);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
