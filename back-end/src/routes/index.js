import userRouter from "./user";

const initWebRoutes = (app) => {
  app.use("/user", userRouter);
  // return app.use("/", userRouter);
};

export default initWebRoutes;
