# Racefront -- Raceline Frontend

The React frontend for the Raceline racing community platform.

---

## Prerequisites

- **Node.js** >= 18
- **Backend running** at `http://localhost:5000` (see `../racebcnd/README.md`)

---

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start
```

Opens at **http://localhost:3000**.

> Make sure the backend (`racebcnd`) is running first so API calls work.

---

## Scripts

| Command           | Description                                       |
|-------------------|---------------------------------------------------|
| `npm start`       | Run dev server with hot reload                    |
| `npm test`        | Run tests in watch mode                           |
| `npm run build`   | Build optimized production bundle to `/build`     |

---

## Tech Stack

- **React** 19.1 -- UI framework
- **React Router DOM** 7.6 -- Client-side routing
- **FontAwesome** -- Solid and brand icons
- **React Icons** -- Additional icon library
- **CSS** -- Vanilla CSS with responsive media queries
- **Google Fonts** -- Roboto font family

---

## Folder Structure

```
racefront/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   ├── manifest.json
│   └── robots.txt
│
├── src/
│   ├── Assets/
│   │   └── images.js              # Unsplash image URLs
│   │
│   ├── Components/
│   │   ├── Navbar.js              # Navigation bar (shows user name when logged in)
│   │   └── Footer.js              # Footer with newsletter subscribe (calls API)
│   │
│   ├── Pages/
│   │   ├── Landing.js             # Home page (assembles all sections)
│   │   ├── SignupPage.js          # Signup form -> POST /api/auth/signup
│   │   ├── LoginPage.js           # Login form -> POST /api/auth/login
│   │   ├── EventsPage.js          # Events listing page
│   │   ├── EventRegisterPage.js   # Event registration -> POST /api/events/:id/register
│   │   ├── CommunityPage.js       # Community profiles page
│   │   ├── CommunityJoinPage.js   # Join community -> POST /api/community/join
│   │   ├── GaragePage.js          # Membership plans page
│   │   ├── CheckoutPage.js        # Checkout/subscribe -> POST /api/subscriptions
│   │   ├── MediaPage.js           # Photo gallery page
│   │   ├── JoinPage.js            # Join CTA page
│   │   ├── Banner.js              # Hero banner section
│   │   ├── OurStory.js            # About section
│   │   ├── FeaturedEvents.js      # Event cards section
│   │   ├── Gallery.js             # Image gallery section
│   │   ├── Community.js           # Community spotlight section
│   │   ├── Plans.js               # Pricing plans section
│   │   ├── OurDNA.js              # Values section
│   │   ├── JoinNow.js             # Final CTA section
│   │   ├── Style.css              # Main page styles
│   │   ├── Auth.css               # Auth form styles (login/signup)
│   │   ├── EventRegister.css      # Event registration styles
│   │   ├── CommunityJoin.css      # Community join styles
│   │   └── Checkout.css           # Checkout page styles
│   │
│   ├── api.js                     # API client (fetch wrapper with JWT)
│   ├── AuthContext.js             # React Context for auth state
│   ├── App.js                     # Root component + routes (wrapped in AuthProvider)
│   ├── App.css                    # Global app styles
│   ├── index.js                   # React DOM entry point
│   └── index.css                  # Base styles
│
├── package.json
└── package-lock.json
```

---

## Routes

| Path                        | Component          | Description                    |
|-----------------------------|--------------------|--------------------------------|
| `/`                         | Landing            | Home page                      |
| `/signup`                   | SignupPage         | User registration              |
| `/login`                    | LoginPage          | User login                     |
| `/events`                   | EventsPage         | Browse racing events           |
| `/events/:eventId/register` | EventRegisterPage  | Register for a specific event  |
| `/community`                | CommunityPage      | View community members         |
| `/community/join`           | CommunityJoinPage  | Join the community             |
| `/garage`                   | GaragePage         | Membership plans               |
| `/checkout/:planId`         | CheckoutPage       | Subscribe to a plan            |
| `/media`                    | MediaPage          | Racing photo gallery           |
| `/join`                     | JoinPage           | Join CTA                       |

---

## API Integration

All API calls go through `src/api.js` which:
- Sends requests to `http://localhost:5000/api`
- Automatically attaches JWT token from `localStorage` (key: `raceline_token`)
- Returns parsed JSON or throws errors with server message

### Auth Flow
1. User signs up or logs in
2. JWT token is stored in `localStorage`
3. `AuthContext` provides `user`, `login`, `signup`, `logout` to all components
4. Navbar shows user's first name and a logout button when logged in

---

## API Endpoints Used

| Frontend Page       | Method | Backend Endpoint              |
|---------------------|--------|-------------------------------|
| SignupPage          | POST   | `/api/auth/signup`            |
| LoginPage           | POST   | `/api/auth/login`             |
| Navbar (on load)    | GET    | `/api/auth/me`                |
| EventRegisterPage   | POST   | `/api/events/:eventId/register` |
| CommunityJoinPage   | POST   | `/api/community/join`         |
| CheckoutPage        | POST   | `/api/subscriptions`          |
| Footer (newsletter) | POST   | `/api/newsletter/subscribe`   |

---

## Build & Deploy

```bash
npm run build
```

The `/build` folder is a static site ready for Vercel, Netlify, or GitHub Pages.

> For production, update the `API_URL` in `src/api.js` to point to your deployed backend.

---

## Dependencies

| Package                          | Version | Purpose                   |
|----------------------------------|---------|---------------------------|
| react                            | 19.1    | UI framework              |
| react-dom                        | 19.1    | DOM rendering             |
| react-router-dom                 | 7.6     | Routing                   |
| @fortawesome/react-fontawesome   | 0.2.2   | FontAwesome React wrapper |
| @fortawesome/free-solid-svg-icons| 6.7.2   | Solid icons               |
| @fortawesome/free-brands-svg-icons| 6.7.2  | Brand icons               |
| react-icons                      | 5.5     | Additional icons          |
| react-scripts                    | 5.0.1   | CRA build toolchain       |
| web-vitals                       | 2.1.4   | Performance metrics       |
