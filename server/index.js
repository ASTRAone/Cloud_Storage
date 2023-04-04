require('dotenv').config();
const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const router = require("./routes/index")
const corsMiddleware = require("./middleware/cors.middleware");
const errorMiddleware = require("./middleware/error.middleware");
const cors = require('cors');   

const options = {
  definition: {
    swagger: "2.0",
    openapi: "3.1.0",
    info: {
      title: "Swagger of Cloud Mern",
      version: "3.1.0",
      description:
        "No one cares, I guess",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));
app.use(fileUpload({}));
app.use(corsMiddleware);
app.use(express.json());
app.use(express.static(process.env.STATIC_PATH))
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
