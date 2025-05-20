import https from "https";
import fs from "fs";
import { config } from "@/config/config";
import app from "@/app";
import { AppDataSource } from "@/data-source";

AppDataSource
  .initialize()
  .then(()=>{
    console.log("Data Source has been initialized!")
  }).catch((err) => {
    console.error("Error during Data Source initialization:", err)
})

export function startServer() {
  const { keyPath, certPath } = config.ssl;

  if (!keyPath || !certPath) {
    throw new Error("Certificate or key path not provided");
  }

  const httpsOptions = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
  };

  https.createServer(httpsOptions, app).listen(config.port, () => {
    console.log(`Server started at port ${config.port}`);
  });
}
