<img src="https://raw.githubusercontent.com/FelpsDevilla/Loregon_Server/refs/heads/main/public/Logo.png" alt="MDN" width="200px"/>

# Loregon Server

Official backend of the **Loregon Projetct**.

This project was developed using **Node.js** + **TypeScript**, using a modular architecture, environment variable support, and ready for execution via **Docker**.

## 🚀 Running in Production

To run **Loregon Server** with **PostgreSQL** in a production environment, follow the steps below:

1. Copy this [Docker Compose](docker-compose.yml)
2. Generate an SSL certificate and key named `ssl.crt` and `ssl.key`
3. Change the `hostSSLPath` value in **docker-compose.yml** to the exact directory where the certificate files will be stored on the host. This directory will be mounted into the container at `/etc/ssl/mvdb` with read-only permission and must contain the files generated in the previous step.
4. Create a `.env` file from [.env.example](.env.example) in the same folder as the compose file.
5. Run Docker Compose. If everything is correct, the backend environment will be running.

> [!WARNING]  
> Make sure to update the environment variables in the Docker Compose file.

## :toolbox: Technologies Used

- **Node.js** v22
- **TypeScript**
- **Express**
- **tsx**
- **tsconfig-paths**
- **Docker**
- **Docker Compose**
- **dotenv**
- **jsonwebtoken**
- **bcryptjs**
- **typeORM**

---

## :technologist: Development

### Standard Development

After cloning the repository, follow the steps below:

1. `npm install`
2. Create a `.env` file based on [.env.example](.env.example)
3. Create a folder named `SSL` at the project root and add an SSL certificate and key named `ssl.crt` and `ssl.key`
4. Run `npm run createDB` to create the database tables
5. Run `npm run dev` to start the application

> [!NOTE]  
> These commands only start the application server.  
> To configure the database locally, create the database beforehand with the name `LoregonDB`.

> [!WARNING]  
> Do not version the `SSL` folder or `.env` file.
>
> The server starts only in HTTPS mode. Without the `SSL` folder containing the certificate and key, the application will not start.

---

### 🐳 Testing the Application with Docker

As an alternative to a local Node.js environment, you can test the application using **Docker** and **Docker Compose**, which ensures a standardized environment with the database automatically configured.

#### Steps:

1. Make sure Docker and Docker Compose are installed.
2. Create a folder named `SSL` at the project root and add an SSL certificate and key named `ssl.crt` and `ssl.key`
3. Run the following command:

   ```bash
   npm run docker
   ```

This will:

- Build the Docker image of the backend
- Start a PostgreSQL database container
- Run the migration to create tables and an admin user
- Run the application in development mode (port 8000 by default)

> [!TIP]  
> I recommend using the certificate generator from [Rako Tools](https://pt.rakko.tools/tools/46/#google_vignette)

## 🛠️ Available Scripts

The following scripts can be run using `npm run <command>`:

| Command               | Description                                                                                  |
| --------------------- | -------------------------------------------------------------------------------------------- |
| `dev`                 | Starts the server in development mode with auto-reload using **tsx** and **nodemon**.        |
| `build`               | Compiles the TypeScript code to JavaScript and resolves paths, generating files in `dist`.   |
| `start`               | Runs the migrations and starts the application from the compiled JavaScript files in `dist`. |
| `docker`              | Builds and runs the application and database containers using **Docker Compose**.            |
| `typeorm`             | Runs the TypeORM CLI with ES Modules support.                                                |
| `migrations:generate` | Generates a new migration based on detected changes in the entities.                         |
| `createDB`            | Generates an initial migration named `createDB` and runs it immediately.                     |
| `migrations:run`      | Runs all pending migrations.                                                                 |
| `migrations:revert`   | Reverts the last executed migration.                                                         |
| `lint`                | Runs **ESLint** to analyze the code.                                                         |
| `lint:fix`            | Runs **ESLint** and automatically fixes any detected issues.                                 |
