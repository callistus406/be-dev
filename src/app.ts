import express, { Response } from "express";
import router from "./routes/app.route";
import { logger } from "./middleware/logger.middleware";
import { mongoConnection } from "./config/db.connection";
// import dotenv from "dotenv";
// dotenv.config();
const app = express();

const port = 4000;

app.use(express.json());

app.use(logger);
app.use(router);

//database call

mongoConnection();
app.listen(port, () => {
  console.log(`the server is running on port   ${port}`);
});

// http://localhost:4000/home



