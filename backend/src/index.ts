import "dotenv/config";
import express, {Request, Response} from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { HTTPSTATUS } from "./config/http.config";
import { Env } from "./config/env.config";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { BadRequestException } from "./utils/app-error";
import { asyncHandler } from "./middlewares/asyncHandler.middleware";
import { connectDatabase } from "./config/database.config";

const app = express();

app.use(
    cors({
        origin:[Env.FRONTEND_ORIGIN],
        methods:["GET","POST","PUT","DELETE"],
        credentials:true,
    })
)

app.use(express.json({limit: "10mb" }))
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))

app.get("/health", asyncHandler(async (req: Request, res: Response) => {
  res.status(HTTPSTATUS.OK).json({
    message: "Server is healthy",
    status: "Ok"
  })

}))

app.use(errorHandler)

app.listen(Env.PORT, async () => {
  await connectDatabase()
  console.log(`Server running on port ${Env.PORT} in ${Env.NODE_ENV} mode`);
})