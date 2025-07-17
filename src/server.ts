import { config } from "@/config/config";
import app from "@/app";
import { AppDataSource } from "@/data-source";

AppDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  }).catch((err) => {
    console.error("Error during Data Source initialization:", err)
  })

try {
  app.listen(config.port, () => {
    console.log(`Server started at port ${config.port}`);
  });
} catch (error) {
  console.error("Failed to start server:", error);
}