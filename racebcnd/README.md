# Racebcnd -- Raceline Backend API

The Node.js + Express + MongoDB backend for the Raceline racing community platform.

---

## Prerequisites

- **Node.js** >= 18
- **MongoDB** running locally on `mongodb://localhost:27017`

---

## Quick Start

```bash
# Install dependencies
npm install

# Start with auto-restart (development)
npm run dev

# Or start without auto-restart (production)
npm start
```

Server runs at **http://localhost:5000**.

On first start, the database is automatically seeded with 12 racing events.

---

## Scripts

| Command         | Description                                      |
|-----------------|--------------------------------------------------|
| `npm start`     | Start the server with `node server.js`           |
| `npm run dev`   | Start with nodemon (auto-restart on file changes)|

---

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/raceline
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
```

| Variable       | Default                              | Description                    |
|----------------|--------------------------------------|--------------------------------|
| `PORT`         | `5000`                               | Server port                    |
| `MONGODB_URI`  | `mongodb://localhost:27017/raceline` | MongoDB connection string      |
| `JWT_SECRET`   | --                                   | Secret key for signing JWTs    |
| `JWT_EXPIRES_IN`| `7d`                                | Token expiration time          |

---

## Tech Stack

- **Express** 4.21 -- Web framework
- **Mongoose** 8.9 -- MongoDB ODM
- **bcryptjs** 2.4 -- Password hashing
- **jsonwebtoken** 9.0 -- JWT authentication
- **express-validator** 7.2 -- Request validation
- **cors** 2.8 -- Cross-origin resource sharing
- **dotenv** 16.4 -- Environment variable management
- **nodemon** 3.1 -- Development auto-restart (dev dependency)

---

## Folder Structure

```
racebcnd/
├── server.js                  # Entry point (Express app, DB connect, auto-seed)
│
├── config/
│   └── db.js                  # MongoDB connection using Mongoose
│
├── middleware/
│   └── auth.js                # JWT auth middleware (required + optional)
│
├── models/
│   ├── User.js                # User (name, email, password with bcrypt)
│   ├── Event.js               # Event (title, date, location, tag, image)
│   ├── EventRegistration.js   # Event registration (personal, vehicle, emergency)
│   ├── CommunityMember.js     # Community member profile
│   ├── Subscription.js        # Plan subscription (stores card last 4 only)
│   └── Newsletter.js          # Newsletter email subscriber
│
├── routes/
│   ├── auth.js                # /api/auth -- signup, login, me
│   ├── events.js              # /api/events -- list, detail, register
│   ├── community.js           # /api/community -- members, join
│   ├── subscriptions.js       # /api/subscriptions -- plans, subscribe
│   └── newsletter.js          # /api/newsletter -- subscribe
│
├── seeders/
│   └── seed.js                # Auto-seeds 12 events on first run
│
├── .env                       # Environment variables (git-ignored)
├── .env.example               # Template for .env
├── .gitignore
└── package.json
```

---

## API Endpoints

### Auth (`/api/auth`)

| Method | Endpoint           | Auth     | Description              |
|--------|--------------------|----------|--------------------------|
| POST   | `/api/auth/signup`  | No       | Register a new user      |
| POST   | `/api/auth/login`   | No       | Login and get JWT token  |
| GET    | `/api/auth/me`      | Required | Get current user profile |

**POST /api/auth/signup**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
Returns: `{ token, user: { id, name, email } }`

**POST /api/auth/login**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
Returns: `{ token, user: { id, name, email } }`

---

### Events (`/api/events`)

| Method | Endpoint                         | Auth     | Description                |
|--------|----------------------------------|----------|----------------------------|
| GET    | `/api/events`                    | No       | List all events            |
| GET    | `/api/events/:eventId`           | No       | Get single event details   |
| POST   | `/api/events/:eventId/register`  | Optional | Register for an event      |

**GET /api/events** -- Query params: `?tag=CIRCUIT&featured=true`

**POST /api/events/:eventId/register**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+1 555 0000",
  "dob": "1995-06-15",
  "licenseNumber": "",
  "vehicleType": "car",
  "vehicleMake": "BMW",
  "vehicleModel": "M4",
  "experience": "intermediate",
  "emergencyName": "Jane Doe",
  "emergencyPhone": "+1 555 0001"
}
```
Returns: `{ message, registration }`

---

### Community (`/api/community`)

| Method | Endpoint                 | Auth     | Description             |
|--------|--------------------------|----------|-------------------------|
| GET    | `/api/community/members` | No       | List community members  |
| POST   | `/api/community/join`    | Optional | Join the community      |

**POST /api/community/join**
```json
{
  "displayName": "SpeedRacer",
  "email": "racer@example.com",
  "phone": "+1 555 0000",
  "city": "Los Angeles",
  "country": "USA",
  "vehicleType": "car",
  "vehicleName": "BMW M4",
  "experience": "pro",
  "racingStyle": "circuit",
  "bio": "Weekend racer",
  "instagram": "@speedracer"
}
```
Returns: `{ message, member }`

---

### Subscriptions (`/api/subscriptions`)

| Method | Endpoint                   | Auth     | Description           |
|--------|----------------------------|----------|-----------------------|
| GET    | `/api/subscriptions/plans` | No       | List available plans  |
| POST   | `/api/subscriptions`       | Optional | Subscribe to a plan   |

**Available Plans:**

| Plan ID   | Name      | Price   |
|-----------|-----------|---------|
| `starter` | Starter   | $9.99   |
| `pro`     | Pro Racer | $19.99  |
| `elite`   | Elite     | $39.99  |

**POST /api/subscriptions**
```json
{
  "planId": "pro",
  "fullName": "John Doe",
  "email": "john@example.com",
  "cardNumber": "4242 4242 4242 4242",
  "expiry": "12/26",
  "cvv": "123",
  "billingAddress": "123 Race Street",
  "city": "New York",
  "zip": "10001",
  "country": "us",
  "promoCode": ""
}
```
Returns: `{ message, subscription: { id, planName, price, status } }`

> Only the last 4 digits of the card number are stored.

---

### Newsletter (`/api/newsletter`)

| Method | Endpoint                      | Auth | Description              |
|--------|-------------------------------|------|--------------------------|
| POST   | `/api/newsletter/subscribe`   | No   | Subscribe to newsletter  |

**POST /api/newsletter/subscribe**
```json
{
  "email": "fan@example.com"
}
```
Returns: `{ message: "Subscribed to newsletter!" }`

---

### Health Check

| Method | Endpoint       | Description          |
|--------|----------------|----------------------|
| GET    | `/api/health`  | Server status check  |

Returns: `{ status: "ok", message: "Raceline API is running" }`

---

## Authentication

- JWT-based authentication
- Token is returned on signup/login
- Send token in header: `Authorization: Bearer <token>`
- Token expires based on `JWT_EXPIRES_IN` env variable (default: 7 days)
- Passwords are hashed with bcrypt (12 salt rounds)

---

## Database Models

| Model              | Collection           | Description                         |
|--------------------|----------------------|-------------------------------------|
| User               | users                | Registered users (name, email, pwd) |
| Event              | events               | Racing events (auto-seeded)         |
| EventRegistration  | eventregistrations   | Event registration submissions      |
| CommunityMember    | communitymembers     | Community member profiles           |
| Subscription       | subscriptions        | Plan subscriptions                  |
| Newsletter         | newsletters          | Newsletter email subscribers        |

---

## Auto-Seeding

When the server starts, it checks if the `events` collection is empty. If so, it seeds 12 racing events automatically. On subsequent starts, seeding is skipped.

---

## CORS

Configured to allow requests from `http://localhost:3000` (the React frontend). Update the `origin` in `server.js` for production.
