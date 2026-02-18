import express , {request, response} from 'express';
import userRouter from "./routes/user.routes";
import usageRouter from "./routes/usage.routes";

const app = express();

app.use(express.json());

app.use("/users", userRouter);
app.use("/usage", usageRouter);

app.get("/", (request, response) => {
    return response.json({message: "Hello World"});
});

export default app;
