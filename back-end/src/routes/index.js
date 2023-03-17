import userRouter from "./user";
import courseRouter from "./course";
import categoryRouter from "./category";
const initWebRoutes = (app) => {
  app.use("/user", userRouter);
  app.use("/course", courseRouter);
  app.use("/category", categoryRouter);
};

export default initWebRoutes;
