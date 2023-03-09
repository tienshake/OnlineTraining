import userRouter from "./user"

const initWebRoutes = (app) => {
  return app.use("/", userRouter);
};

export default initWebRoutes;
