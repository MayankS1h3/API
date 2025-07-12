import { Router } from "express";
import { creatSubscription, getUserSubscriptions } from "../controllers/subscription.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", authorize, creatSubscription);
subscriptionRouter.get('/:id', authorize, getUserSubscriptions);

export default subscriptionRouter;
