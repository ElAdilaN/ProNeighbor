# ProNeighbor Backend Documentation

This document provides detailed information about the backend setup and API endpoints for the ProNeighbor platform, which connects users with various service providers.

## Table of Contents

- [Project Overview](#project-overview)
- [Backend Setup](#backend-setup)
  - [Installation](#installation)
  - [Environment Configuration](#environment-configuration)
  - [Starting the Server](#starting-the-server)
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
    git clone https://github.com/ElAdilaN/ProNeighbor.git
    cd backend
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    ```

### Environment Configuration

1.  **Create `.env` File:**
    Create a `.env` file (if doesn't exist ) in the `backend` directory with the following variables:

    ```
    DB_SERVER=sqlserver
    DB_DATABASE=ProNeighbor2
    DB_USER=sa
    DB_PASSWORD=StrongP@ssword123
    DB_PORT=1433
    DB_ENCRYPT=true
    DB_TRUST_SERVER_CERTIFICATE=true

    JWT_SECRET=S3cReT!kEy@1234567890&\*(A^VeRy$Tr0nG_SeCrEt_K3y
    JWT_EXPIRATION=1h

    ```

### Starting the Server

1.  **Start the Server:**
    ```bash
    npm start
    ```
    This command will start the Node.js server using `app.js`.

### Database Setup

1.  **SQL Server Setup:**
    Ensure you have SQL Server installed and running.
2.  **Database Creation:**
    Run the `ScriptProNeighbor2.sql` script located in the `db` directory to create the necessary tables and schema.

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

(You'll need to create a visual ERD and include it here. Tools like draw.io or Lucidchart can be used. For text purposes the relations are as follows)

- Users 1---N Services
- Users 1---N Reviews
- Users 1---N Messages
- Users 1---N Chat_participants
- Chats 1---N Messages
- Chats 1---N Chat_participants
- Services 1---N Chats
- Services 1---N Reviews

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
