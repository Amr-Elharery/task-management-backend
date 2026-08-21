# Task Management API

REST API for the Task Management application.

Interactive API documentation is available at:

`/api-docs`

## Authentication

The API supports JWT authentication using either:

* `Authorization: Bearer <token>`
* `HttpOnly` cookie named `token`

## Endpoints

### Authentication

| Method | Endpoint             | Description                            | Auth |
| ------ | -------------------- | -------------------------------------- | ---- |
| POST   | `/api/auth/register` | Register a new user                    | No   |
| POST   | `/api/auth/login`    | Login and receive JWT                  | No   |
| POST   | `/api/auth/logout`   | Logout and clear authentication cookie | Yes  |

### Users

| Method | Endpoint       | Description                    | Auth |
| ------ | -------------- | ------------------------------ | ---- |
| GET    | `/api/user/me` | Get current authenticated user | Yes  |

### Tasks

| Method | Endpoint                   | Description                   | Auth |
| ------ | -------------------------- | ----------------------------- | ---- |
| POST   | `/api/tasks`               | Create a task                 | Yes  |
| GET    | `/api/tasks`               | Get user's tasks with filters | Yes  |
| GET    | `/api/tasks/search?title=` | Search tasks by title         | Yes  |
| GET    | `/api/tasks/:id`           | Get a task by ID              | Yes  |
| PUT    | `/api/tasks/:id`           | Update a task                 | Yes  |
| DELETE | `/api/tasks/:id`           | Delete a task                 | Yes  |

## Task Fields

* `title` — Task title
* `description` — Task description
* `status` — `To Do`, `In Progress`, or `Done`
* `priority` — `Low`, `Medium`, or `High`
* `dueDate` — Task due date

## Task Filters

`GET /api/tasks` supports:

* `status`
* `priority`

Example:

`GET /api/tasks?status=In%20Progress&priority=High`

## Error Handling

The API returns errors using a consistent JSON format:

```json
{
  "error": "Error message"
}
```

Common status codes:

* `400` — Bad Request
* `401` — Unauthorized
* `403` — Forbidden
* `404` — Not Found
* `500` — Internal Server Error
