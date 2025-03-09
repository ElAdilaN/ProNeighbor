# ProNeighbor Backend Documentation

This document provides detailed information about the backend setup and API endpoints for the ProNeighbor platform, which connects users with various service providers.

## Table of Contents

- [Project Overview](#project-overview)
- [Backend Setup](#backend-setup)
  - [Installation](#installation)
  - [Environment Configuration](#environment-configuration)
  - [Starting the Server (Docker Compose)](#starting-the-server-docker-compose)
  - [Database Setup](#database-setup)
  - [Folder Structure](#folder-structure)
- [Entity-Relationship Diagram](#entity-relationship-diagram)
- [Authentication Process](#authentication-process)
- [API Endpoints](#api-endpoints)
  - [Authentication Endpoints](#authentication-endpoints)
  - [Message Endpoints](#message-endpoints)
  - [Review Endpoints](#review-endpoints)
  - [Service Endpoints](#service-endpoints)
  - [User Endpoints](#user-endpoints)
- [Error Handling](#error-handling)

## Project Overview

ProNeighbor is a platform designed to connect users with service providers such as teachers, painters, and other professionals. This document focuses on the backend implementation and its configuration.

## Backend Setup

### Installation

1.  **Clone the Repository:**
    ```bash
    git clone [repository-link]
    cd backend
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    ```

### Environment Configuration

1.  **Create `.env` File:**
    Create a `.env` file in the `backend` directory with the following variables:
    ```
    DB_SERVER=[your_db_server]
    DB_DATABASE=[your_db_database]
    DB_USER=[your_db_user]
    DB_PASSWORD=[your_db_password]
    DB_PORT=[your_db_port]
    DB_ENCRYPT=true
    DB_TRUST_SERVER_CERTIFICATE=true
    JWT_SECRET=[your_jwt_secret]
    JWT_EXPIRATION=1h
    ```
    Replace the bracketed values with your actual database and JWT settings.

# Installation & Running with Docker Compose

## Prerequisites

- Ensure you have **Docker** and **Docker Compose** installed.
  - 👉 [Download Docker here](https://www.docker.com/get-started)

## Run the Project

From the root directory of the project, run:

```bash
docker-compose up --build
```

This command will build and start all required containers, including the backend and database.

> **Important:** Before running Docker Compose, make sure the `db/init-db.sh` file has **LF (Line Feed)** line endings instead of **CRLF (Carriage Return Line Feed)**. This is essential for proper execution inside the container.

## How to Fix Line Endings in VS Code:

1. Open `db/init-db.sh` in **VS Code**.
2. Look at the bottom-right corner—find and click where it says **"CRLF"** (if applicable).
3. Select **"LF"** from the dropdown menu.
4. Save the file.

This ensures the database initialization script runs correctly inside the Linux-based Docker container. 🚀

---

# Instal·lació i Execució amb Docker Compose

## Prerequisits

- Assegureu-vos que teniu **Docker** i **Docker Compose** instal·lats.
  - 👉 [Descarrega Docker aquí](https://www.docker.com/get-started)

## Executar el Projecte

Des de la carpeta arrel del projecte, executeu:

```bash
docker-compose up --build
```

Aquesta ordre construirà i iniciarà tots els contenidors necessaris, incloent el backend i la base de dades.

> **Important:** Abans d'executar Docker Compose, assegureu-vos que el fitxer `db/init-db.sh` té terminacions de línia en format **LF (Line Feed)** en lloc de **CRLF (Carriage Return Line Feed)**. Això és essencial perquè s'executi correctament dins del contenidor.

## Com corregir les terminacions de línia a VS Code:

1. Obriu `db/init-db.sh` a **VS Code**.
2. A la cantonada inferior dreta, feu clic a **"CRLF"** (si apareix).
3. Seleccioneu **"LF"** al menú desplegable.
4. Deseu el fitxer.

Això garantirà que l'script d'inicialització de la base de dades s'executi correctament dins del contenidor Docker basat en Linux. 🚀

### Folder Structure

backend/
├── config/
│ └── db.js
├── controllers/
│ ├── authController.js
│ ├── messageController.js
│ ├── reviewController.js
│ ├── servicesController.js
│ └── userController.js
├── middleware/
│ └── authMiddleware.js
├── models/
│ ├── authModel.js
│ ├── messageModel.js
│ ├── reviewModel.js
│ ├── servicesModel.js
│ └── userModel.js
├── routes/
│ ├── authRoutes.js
│ ├── messageRoutes.js
│ ├── reviewRoutes.js
│ ├── serviceRoutes.js
│ └── userRoutes.js
├── app.js
├── Dockerfile
├── package.json
├── package-lock.json
├── .env
├── .gitignore
└── socket.js

db/
├── Dockerfile
├── init-db.sh
└── ScriptProNeighbor2.sql

## Entity-Relationship Diagram

## Authentication Process

1.  **Registration:**
    Users register with their name, email, password, and user type. The password is hashed before being stored.
2.  **Login:**
    Users log in with their email and password. A JWT is generated upon successful login.
3.  **Authorization:**
    Protected routes require a valid JWT in the `Authorization` header. The middleware verifies the token and attaches user information to the request.

## API Endpoints

### Authentication Endpoints

- **`POST /auth/register`**
  - Body: `{ name, email, password, user_type }`
  - Response: `{ message: "User registered successfully" }` (201) or `{ message: "User already exists" }` (400)
- **`POST /auth/login`**
  - Body: `{ email, password }`
  - Response: `{ message: "Successfully logged in", token }` (200) or `{ message: "Invalid email or password" }` (400)

### Message Endpoints

- **`POST /messages/chats`**
  - Body: `{ serviceId, ChatName }`
  - Response: `{ message: "Chat created successfully", chatId }` (201)
- **`GET /messages/chats`**
  - Response: `[{ chat }]` (200)
- **`POST /messages/send`**
  - Body: `{ chatId, message }`
  - Response: `{ message: "Message sent successfully", newMessage }` (201)
- **`GET /messages/chats/:chatId`**
  - Response: `[{ message }]` (200)
- **`POST /messages/participants`**
  - Body: `{ chatId, userId }`
  - Response: `{ message: "Participant added successfully" }` (200)
- **`PUT /messages/:messageId/status`**
  - Body: `{ status }`
  - Response: `{ message: "Message status updated successfully" }` (200)
- **`GET /messages/chatInfo/:id`**
  - Response: `{ chatInfo }` (200)

### Review Endpoints

- **`POST /reviews`**
  - Body: `{ service_id, rating, comment }`
  - Response: `{ message: "Review added successfully" }` (201)
- **`GET /reviews/service/:serviceId`**
  - Response: `[{ review }]` (200)
- **`GET /reviews/user`**
  - Response: `[{ review }]` (200)
- **`PUT /reviews/:reviewId`**
  - Body: `{ rating, comment }`
  - Response: `{ message: "Review updated successfully" }` (200)
- **`DELETE /reviews/:reviewId`**
  - Response: `{ message: "Review deleted successfully" }` (200)

### Service Endpoints

- **`GET /services`**
  - Query: `page`, `limit`
  - Response: `{ success: true, services }` (200)
- **`GET /services/provider/:id`**
  - Response: `{ success: true, services }` (200)
- **`GET /services/:id`**
  - Response: `{ success: true, service }` (200)
- **`POST /services`**
  - Body: `{ _id, _category, _name, _price, _description, _location }`
  - Response: `{ success: true, message: "Service created", id }` (201)
- **`PUT /services/:id`**
  - Body: `{ name, price, description, location, category_id }`
  - Response: `{ success: true, message: "Service updated successfully" }` (200)
- **`DELETE /services/:id`**
  - Response: `{ success: true, message: "Service deleted" }` (200)
- **`GET /services/category/:category_id`**
  - Response: `{ success: true, services }` (200)
- **`GET /services/search`**
  - Query: `search`
  - Response: `{ success: true, services }` (200)
- **`GET /services/categories`**
  - Response: `[{ category }]` (200)

### User Endpoints

- **`GET /users/chat/:id`**
  - Response: `[{ users }]` (200)
- **`GET /users/profile`**
  - Response: `{ userProfile }` (200)
- \*\*
  **`GET /users/:id`** - Response: `{ user }` (200)
- **`POST /users/:id/image`**
  - Body: `image file`
  - Response: `Profile image updated successfully.` (200)
- **`GET /users/:id/image`**
  - Response: `image file` (200)
- **`PUT /users/profile`**
  - Body: `{ _name, _email, _phone, _address }`
  - Response: `{ message: "Profile updated successfully", updatedUser }` (200)

## Error Handling

- **400 Bad Request:**
  - Invalid input data.
  - Missing required fields.
  - Invalid format.
- **401 Unauthorized:**
  - Missing or invalid JWT.
  - Access denied.
- **404 Not Found:**
  - Resource not found.
  - User, service, or review does not exist.
- **500 Internal Server Error:**
  - Database errors.
  - Server-side issues.
