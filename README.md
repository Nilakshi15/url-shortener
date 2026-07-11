# 🔗 URL Shortener

A production-inspired URL Shortener built using **Node.js, Express, PostgreSQL, Redis, React, Docker, and asynchronous analytics processing**.

The application generates short URLs, redirects users with Redis-backed caching, records click analytics asynchronously, and provides a dashboard to monitor shortened links.

---

# ✨ Features

- Shorten long URLs instantly
- Optional custom aliases
- Fast Redis-backed redirects
- Click analytics
- Dashboard to view all URLs
- PostgreSQL persistence
- Background analytics worker
- Docker Compose support
- REST API
- Rate limiting
- Error handling & validation

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- React Router
- CSS
- Lucide Icons

## Backend

- Node.js
- Express.js

## Database

- PostgreSQL

## Cache

- Redis

## Containerization

- Docker
- Docker Compose

---

# 📁 Project Structure

```
url-shortener/

│
├── backend/
│   ├── src/
│   │
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── repositories/
│   ├── queue/
│   ├── workers/
│   ├── middleware/
│   ├── config/
│   ├── db/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── services/
│   └── App.jsx
│
├── docker-compose.yml
└── README.md
```

---

# 🏗 Architecture

```
                User
                  │
                  ▼
          React Frontend (Vite)
                  │
                  ▼
          Express REST API
                  │
      ┌───────────┴───────────┐
      │                       │
      ▼                       ▼
 PostgreSQL               Redis Cache
      │
      ▼
 Analytics Queue
      │
      ▼
 Analytics Worker
```

---

# 🚀 API Endpoints

## Create Short URL

```
POST /api/v1/shorten
```

Example Request

```json
{
  "url": "https://www.google.com"
}
```

Response

```json
{
  "success": true,
  "data": {
    "short_code": "abc123",
    "short_url": "http://localhost:5000/abc123"
  }
}
```

---

## Redirect

```
GET /:shortCode
```

Example

```
http://localhost:5000/abc123
```

Automatically redirects to the original URL.

---

## Get Analytics

```
GET /api/v1/analytics/:shortCode
```

---

## Get All URLs

```
GET /api/v1/urls
```

---

# ⚙ Local Installation

## Clone Repository

```bash
git clone https://github.com/nilakshi15/url-shortener.git

cd url-shortener
```

---

## Install Backend

```bash
cd backend

npm install
```

---

## Install Frontend

```bash
cd ../frontend

npm install
```

---

## Environment Variables

Backend `.env`

```env
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=url_shortener

REDIS_HOST=localhost
REDIS_PORT=6379
```

---

## Run Backend

```bash
cd backend

npm run dev
```

---

## Run Frontend

```bash
cd frontend

npm run dev
```

---

# 🐳 Docker Setup

The complete application can be started using Docker Compose.

```bash
docker compose up --build
```

Services started

- Frontend
- Backend
- PostgreSQL
- Redis

Access

Frontend

```
http://localhost:5173
```

Backend

```
http://localhost:5000
```

---

# 📊 Dashboard

The dashboard displays

- All shortened URLs
- Total clicks
- Creation date
- Analytics panel
- Click statistics

---

# ⚡ Redis Caching

When a redirect is requested

```
Client
   │
   ▼
Redis Cache
   │
Cache Hit?
   │
 ┌─┴──────────┐
 │            │
Yes          No
 │            │
 ▼            ▼
Redirect   PostgreSQL
              │
              ▼
         Store in Redis
```

Benefits

- Faster redirects
- Reduced database load
- Improved scalability

---

# 📈 Analytics Flow

Analytics are processed asynchronously.

```
User Click
     │
     ▼
Redirect Immediately
     │
     ▼
Queue Analytics Event
     │
     ▼
Background Worker
     │
     ▼
Insert into PostgreSQL
```

This ensures redirects remain fast while analytics are recorded in the background.

---

# 🛡 Validation

The application validates

- Invalid URLs
- Duplicate aliases
- Empty requests
- Invalid short codes
- Missing resources

---

# 📦 Design Decisions

## Short Code Generation

- Random Base62 encoding
- Supports custom aliases
- Database uniqueness constraint

Trade-off

Random codes are simple and efficient but may require retry logic in rare collision cases.

---

## PostgreSQL

Chosen because

- ACID compliant
- Reliable indexing
- Excellent support for relational data
- Easy aggregation for analytics

---

## Redis

Redis is used for

- Redirect caching
- Reducing database reads
- Faster response times

---

## Background Worker

Analytics are processed separately from redirects.

Benefits

- Faster user experience
- Better scalability
- Non-blocking redirects

---

## Rate Limiting

Implemented on API endpoints to

- Prevent abuse
- Reduce spam
- Protect backend resources

---

# 📈 Scalability Considerations

Future improvements

- Redis Cluster
- PostgreSQL Read Replicas
- Database Sharding
- CDN for redirects
- Kubernetes deployment
- Distributed analytics queue
- URL expiration
- User authentication
- QR Code generation
- Custom domains

---

# 📸 Screenshots

## Home Page

![Home Page](<home_page.png>)

---

## Dashboard

![Dashboard](dashboard_page.png)

---

# 🎯 Resume Highlights

- Built a production-inspired URL Shortener using React, Node.js, PostgreSQL, Redis, and Docker.
- Implemented asynchronous click analytics processing using a background worker to reduce redirect latency.
- Designed Redis-backed caching to improve redirect performance and reduce database load.
- Containerized the complete application using Docker Compose for one-command deployment.
- Developed REST APIs with validation, rate limiting, custom aliases, analytics dashboard, and scalable architecture.

---

# 👩‍💻 Author

**Nilakshi Patil**

Computer Engineering Student

PCCOE, Pune

GitHub: https://github.com/Nilakshi15