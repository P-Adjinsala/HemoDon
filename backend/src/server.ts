import app from "./app";
import { env } from "./config/env";
import { connectDatabase } from "./config/db";

const startServer = async () => {
  await connectDatabase();

  app.listen(env.PORT, () => {
    console.log(
      `🚀 HemoDon API running on port ${env.PORT}`
    );
  });
};

startServer();