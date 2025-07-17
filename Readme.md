<img src="https://raw.githubusercontent.com/FelpsDevilla/Loregon_Server/refs/heads/main/public/Logo.png" alt="MDN" width="200px"/>

# Loregon Server

Official backend of the **Loregon Projetct**.

This project was developed using **Node.js** + **TypeScript**, using a modular architecture, environment variable support, and ready for execution via **Docker**.

## 🚀 Running in Production

To run **Loregon Server** with **PostgreSQL** in a production environment, follow the steps below:

1. Copy this [Docker Compose](docker-compose.yml)
2. Create a `.env` file from [.env.example](.env.example) in the same folder as the compose file.
3. Run Docker Compose. If everything is correct, the backend environment will be running.

> [!NOTE]
> The best setup to run the server is using Docker with Reverse Proxy

> [!TIP]
> To setup the server on https, I recommend use [NGINX Proxy](https://github.com/nginx/nginx)

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
3. Run `npm run createDB` to create the database tables
4. Run `npm run dev` to start the application

> [!NOTE]  
> These commands only start the application server.  
> To configure the database locally, create the database beforehand with the name `LoregonDB`.

---

### 🐳 Testing the Application with Docker

As an alternative to a local Node.js environment, you can test the application using **Docker** and **Docker Compose**, which ensures a standardized environment with the database automatically configured.

#### Steps:

1. Make sure Docker and Docker Compose are installed.
2. Run the following command:

   ```bash
   npm run docker
   ```

This will:

- Build the Docker image of the backend
- Start a PostgreSQL database container
- Run the migration to create tables and an admin user
- Run the application in development mode (port 8000 by default)

## 🛠️ Available Scripts

The following scripts can be run using `npm run <command>`:

| Command               | Description                                                                                  |
| --------------------- | -------------------------------------------------------------------------------------------- |
| `dev`                 | Starts the server in development mode with auto-reload using **tsx** and **nodemon**.        |
| `build`               | Compiles the TypeScript code to JavaScript and resolves paths, generating files in `dist`.   |
| `start`               | Runs the migrations and starts the application from the compiled JavaScript files in `dist`. |
| `docker`              | Builds and runs the application and database containers using **Docker Compose**.            |
| `typeorm`             | Runs the TypeORM CLI with ES Modules support.                                                |
| `createDB`            | Generates an initial migration named `createDB` and runs it immediately.                     |
| `migrations:generate` | Generates a new migration based on detected changes in the entities.                         |
| `migrations:run`      | Runs all pending migrations.                                                                 |
| `migrations:revert`   | Reverts the last executed migration.                                                         |