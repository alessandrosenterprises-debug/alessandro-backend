# Alessandro Enterprises Backend

Small Node.js API that connects the customer app and admin dashboard.

## Run Locally

```bash
npm.cmd start
```

The API runs on:

```text
http://localhost:4000
```

Admin credentials:

```text
admin@alessandroenterprises.com
Admin@2026
```

## Main Endpoints

- `POST /auth/login`
- `POST /users/register`
- `POST /users/login`
- `POST /users/reset-password`
- `PUT /users/{email}`
- `GET /dashboard/summary`
- `GET /requests`
- `POST /requests`
- `PUT /requests/{id}`
- `GET /messages`
- `POST /messages/reply`
- `GET /emails`
- `POST /emails/{id}/reply`
- `PUT /emails/{id}/archive`

For production, deploy this API to an HTTPS host and set the same URL in the admin dashboard `.env` and Android app `API_BASE_URL`.
