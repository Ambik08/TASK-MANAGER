# Organix — React + Tailwind CSS + DaisyUI

## Requirements
- Node.js 18+
- Spring Boot backend running at `http://localhost:8080`
- MySQL configured in the backend

## Run the frontend

```bash
npm install
```

Copy `.env.example` to `.env` if you want to configure the backend URL.
The default API base URL is `http://localhost:8080`.

```bash
npm run dev
```

Open `http://localhost:5173`.

## Pages
- `/` — Welcome page
- `/tasks` — Dashboard and task list
- `/tasks/new` — Create task
- `/tasks/:id` — Task details, complete/in-progress, delete
- `/tasks/:id/edit` — Edit task

## Backend endpoints used
- `GET /tasks`
- `GET /tasks/{id}`
- `POST /tasks`
- `PUT /tasks/{id}`
- `DELETE /tasks/{id}`

## Backend CORS
Allow the Vite origin in your Spring Boot controller:

```java
@CrossOrigin(origins = "http://localhost:5173")
```

The project uses Tailwind utility classes and DaisyUI classes directly in JSX.
`src/index.css` contains only the Tailwind directives; there is no separate custom styling file.
