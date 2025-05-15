import express, { Response } from "express";
import router from "./routes/app.route";
const app = express();

const port = 4000;

app.use(express.json());

app.use(router);

app.listen(port, () => {
  console.log(`the server is running on port   ${port}`);
});

// http://localhost:4000/home
