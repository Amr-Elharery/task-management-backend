# Task Management API

A RESTful task management backend.

This project was developed as part of a MERN Stack technical assessment.

## Tech Stack

- Node.js
- Express.js
- MongoDB

## Prerequisites

Make sure you have installed:

- Node.js
- npm
- MongoDB or a MongoDB Atlas database

## Quick Start

- Clone the repository:

```bash
git clone https://github.com/Amr-Elharery/task-management-backend
cd task-management-backend
```

- Install dependencies:

```bash
npm install
```

- Create a `.env` file in the project root based on `.env.example` and fill in the required values.

- Run the application in development mode:

```bash
npm run dev
```

## Features

### Authentication

- User registration
- User login
- JWT-based authentication
- Protected API endpoints
- Logout
- HTTP-only authentication cookie
- Bearer token authentication support

### Users

- Get the currently authenticated user

### Tasks

- Create tasks
- Update tasks
- Delete tasks
- Get user's tasks
- Get a task by ID
- Search tasks by title
- Filter tasks by status and priority
- User-specific task access

### Task Fields

Each task contains:

- `title`
- `description`
- `status`
- `priority`
- `dueDate`

Available statuses:

- `To Do`
- `In Progress`
- `Done`

Available priorities:

- `Low`
- `Medium`
- `High`

## Project Structure

```text
src/
├── config/
├── db/
├── features/
│   ├── auth/
│   ├── user/
│   └── tasks/
└── shared/
    ├── middlewares/
    └── utils/

docs/
└── openapi.yaml

index.js
```

The project follows a feature-based structure with controllers, services, models, routes, and validation separated by responsibility.


## API Documentation

Interactive Swagger documentation is available at:

```text
http://localhost:<PORT>/api-docs
```

The OpenAPI specification is located at:

```text
src/docs/openapi.yaml
```

## API Endpoints

### Authentication

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login               |
| POST   | `/api/auth/logout`   | Logout              |

### Users

| Method | Endpoint       | Description                    |
| ------ | -------------- | ------------------------------ |
| GET    | `/api/user/me` | Get current authenticated user |

### Tasks

| Method | Endpoint                   | Description           |
| ------ | -------------------------- | --------------------- |
| POST   | `/api/tasks`               | Create a task         |
| GET    | `/api/tasks`               | Get user's tasks      |
| GET    | `/api/tasks/search?title=` | Search tasks by title |
| GET    | `/api/tasks/:id`           | Get task by ID        |
| PUT    | `/api/tasks/:id`           | Update a task         |
| DELETE | `/api/tasks/:id`           | Delete a task         |

All task and user endpoints require authentication.

## Authentication

The API supports JWT authentication using either:

```http
Authorization: Bearer <token>
```

or the authentication cookie:

```text
token=<jwt>
```

Passwords are hashed using bcrypt before being stored.

## Security

- Passwords are hashed using bcrypt.
- JWT is used for authentication.
- Protected endpoints require authentication.
- Users can only access their own tasks.
- Authentication cookies are configured as HTTP-only.
- Secrets and database connection strings must not be committed.

## Error Handling

The API uses centralized error handling and returns errors in the following format:

```json
{
  "error": "Error message"
}
```

Common HTTP status codes:

| Status | Description           |
| ------ | --------------------- |
| 400    | Bad Request           |
| 401    | Unauthorized          |
| 403    | Forbidden             |
| 404    | Not Found             |
| 500    | Internal Server Error |

## Main Design

The application separates responsibilities into:

```text
Routes
  ↓
Middleware / Validation
  ↓
Controller
  ↓
Service
  ↓
Model
  ↓
MongoDB
```

Controllers handle HTTP requests and responses, while services contain the application logic.

## Bonus Features

Implemented:

- OpenAPI / Swagger documentation
- Docker
- Pagination
- Live deployment
