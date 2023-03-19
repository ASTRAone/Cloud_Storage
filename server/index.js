const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("config");
const authRouter = require("./routes/auth.routes");
const fileRouter = require("./routes/file.routes");
const router = require("./routes/index")
const app = express();
const PORT = config.get("serverPort");
const corsMiddleware = require("./middleware/cors.middleware");

app.use(corsMiddleware);
app.use(express.json());
app.use(cookieParser())

// app.use("/api/auth", authRouter);
// app.use("/api/files", fileRouter);
app.use("/api", router);

const start = async () => {
  try {
    mongoose.connect(config.get("dbUrl"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });

    app.listen(PORT, () => {
      console.log("server started on PORT = ", PORT);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
