import userRouter from "./user";
import courseRouter from "./course";
import categoryRouter from "./category";
import ratingRouter from "./rating";

const initWebRoutes = (app) => {
  app.use("/user", userRouter);
  app.use("/courses", courseRouter);
  app.use("/category", categoryRouter);
  app.use("/rating", ratingRouter);
};

export default initWebRoutes;
