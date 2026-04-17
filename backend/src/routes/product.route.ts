import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware";
import { getProductByIdController, getProductsController } from "../controllers/product.controller";


const productRoutes = Router()
  .use(requireAuth)
  .get("/all", getProductsController)
.get("/:id", getProductByIdController)

export default productRoutes