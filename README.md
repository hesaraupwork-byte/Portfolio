# Graphic Designer Portfolio

Next.js (frontend) + Node/Express (backend) portfolio site. Projects are managed
from a simple `/admin` page (protected by a secret key, no login system) and
images are stored on Cloudinary.

## Structure

```
backend/    Express API (MongoDB + Cloudinary + Nodemailer)
frontend/   Next.js App Router site (Tailwind CSS)
```

## Backend setup

```
cd backend
npm install
```

Copy `.env.example` to `.env` and fill in real values:

| Variable | Where to get it |
| --- | --- |
| `MONGO_URI` | MongoDB Atlas connection string (free tier works) |
| `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` | Cloudinary dashboard → Account Details |
| `ADMIN_SECRET` | Any strong string you choose — this is the password for `/admin` |
| `EMAIL_USER` / `EMAIL_PASS` | A Gmail address + an [App Password](https://myaccount.google.com/apppasswords) (not your normal password) |
| `EMAIL_TO` | Where contact form messages should be delivered (defaults to `EMAIL_USER`) |

Run it:

```
npm run dev
```

Health check: `http://localhost:5000/health`

## Frontend setup

```
cd frontend
npm install
npm run dev
```

Site: `http://localhost:3000`
Admin: `http://localhost:3000/admin` (enter the `ADMIN_SECRET` value from the backend `.env`)

`frontend/.env.local` already points to `http://localhost:5000` — update
`NEXT_PUBLIC_API_URL` if the backend runs elsewhere.

## Before going live

- Replace placeholder copy in `Hero`, `About`, `Skills`, `Navbar`, `Footer`
  (search for "Your Name") with real content.
- Add a real `resume.pdf` to `frontend/public/` (the Skills section links to it).
- Add your first projects via `/admin`.
