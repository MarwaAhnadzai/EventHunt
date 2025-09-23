Event Hunt 🌿

Event Hunt is a modern web application for discovering, exploring, and joining exciting events near you. Built with Angular on the frontend and Node.js / Express with Sequelize / PostgreSQL on the backend, it provides a professional, responsive, and interactive event browsing experience.

Table of Contents

Features

Demo

Tech Stack

Setup & Installation

API Endpoints

Project Structure

Contributing

License

Features

Browse upcoming events with search, filter, and sorting.

View detailed event pages with date, location, and description.

Responsive green & white professional UI inspired by Eventbrite.

Category-based filtering (Conference, Seminar, Networking, Music, Arts, etc.).

Event creation and management on the backend (for admins).

JWT-based authentication and secure login.

Health check endpoint for backend server status.

Demo


http://localhost:4200/

Tech Stack

Frontend:

Angular (standalone components)

TypeScript

HTML / CSS (Responsive & modern UI)

Backend:

Node.js / Express

Sequelize ORM

PostgreSQL

JWT Authentication

dotenv for environment configuration

Tools & Libraries:

Angular Router

Angular FormsModule

CORS, bcrypt, and JSON Web Tokens

Axios / HttpClient for API calls

Setup & Installation
1. Clone the repository
git clone https://github.com/yourusername/event-hunt.git
cd event-hunt

2. Backend Setup
cd backend
npm install


Create a .env file in the backend folder with the following:

PORT=5000
DB_USER=postgres
DB_PASSWORD=event1234
DB_HOST=127.0.0.1
DB_PORT=5432
DB_NAME=eventhunt
JWT_SECRET=supersecretkey123



Run migrations and start the backend:

npx sequelize-cli db:migrate
npm start


Health check:
Visit http://localhost:5000/api/health to ensure the server is running.

3. Frontend Setup
cd ../frontend
npm install
ng serve --open


The frontend will run at http://localhost:4200/ by default.

Make sure the backend is running on http://localhost:5000/.

API Endpoints
Endpoint	Method	Description
/api/health	GET	Backend health check
/api/auth/login	POST	User login
/api/auth/register	POST	User registration
/api/events	GET	Fetch all events
/api/events/:id	GET	Fetch single event by ID
/api/tickets	POST	Create ticket
Project Structure
event-hunt/
│
├── backend/
│   ├── config/       # DB configuration
│   ├── models/       # Sequelize models
│   ├── routes/       # Express API routes
│   ├── controllers/  # Route logic
│   ├── middleware/   # Auth & error handlers
│   └── server.js     # Backend entry point
│
├── frontend/
│   ├── src/app/      # Angular components
│   ├── assets/       # Images, CSS
│   └── main.ts       # Angular entry point
│
└── README.md

Contributing

Fork the repository.

Create a new branch: git checkout -b feature/your-feature.

Commit your changes: git commit -m 'Add new feature'.

Push to the branch: git push origin feature/your-feature.

Open a pull request.

License

This project is licensed under the MIT License.