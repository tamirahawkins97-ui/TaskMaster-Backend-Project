# TaskMaster Backend API

## Data model

- A user has a unique username and email, a bcrypt-hashed password, and a role.
- A project belongs to one user and has a name and description.
- A task belongs to one project and one user. Its status is `not done`, `in progress`, or `complete`.

## Authentication

Register at `POST /api/users/register` with `username`, `email`, and `password`. Log in at `POST /api/users/login` with `email` and `password`; the response includes a JWT. Send that token on protected requests as `Authorization: Bearer <token>`.

## Endpoints

All request bodies use JSON. Project and task routes require a JWT.

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/api/users/register` | Register a user |
| POST | `/api/users/login` | Log in and receive a JWT |
| POST | `/api/projects` | Create a project for the authenticated user |
| GET | `/api/projects` | List the authenticated user's projects |
| GET | `/api/projects/:id` | Get an owned project |
| PUT | `/api/projects/:id` | Update an owned project |
| DELETE | `/api/projects/:id` | Delete an owned project |
| POST | `/api/projects/:projectId/tasks` | Create a task in an owned project |
| GET | `/api/projects/:projectId/tasks` | List tasks in an owned project |
| PUT | `/api/tasks/:taskId` | Update a task after verifying ownership of its parent project |
| DELETE | `/api/tasks/:taskId` | Delete a task after verifying ownership of its parent project |

Task creation requires `title` and `description`; `status` is optional and defaults to `not done`. Valid statuses are `not done`, `in progress`, and `complete`. The task's project and user references come from the URL and authenticated token, not the request body.