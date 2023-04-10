import userRouter from "./user";
import courseRouter from "./course";
import categoryRouter from "./category";
import ratingRouter from "./rating";
import paymentRouter from "./payment";

const initWebRoutes = (app) => {
  app.use("/user", userRouter);
  app.use("/courses", courseRouter);
  app.use("/category", categoryRouter);
  app.use("/rating", ratingRouter);
  app.use("/payment", paymentRouter);
};

export default initWebRoutes;
