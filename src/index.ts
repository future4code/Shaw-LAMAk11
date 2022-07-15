import dotenv from "dotenv";
import {AddressInfo} from "net";
import express from "express";
import { userRouter } from "./routes/userRouter";
import cors from "cors"; 
import { bandRouter } from "./routes/bandRouter";
import { showRouter } from "./routes/ShowRoutes";

dotenv.config();
const app = express();
app.use(cors()); 
app.use(express.json());

app.use("/user", userRouter);
app.use("/band", bandRouter)
app.use("/show", showRouter )
app.use("/search", showRouter)

const server = app.listen(process.env.DB_PORT || 3003, () => {
    if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Servidor rodando em http://localhost:${address.port}`);
    } else {
      console.error(`Falha ao rodar o servidor.`);
    }
  });