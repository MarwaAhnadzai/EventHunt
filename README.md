# Event Hunt 🌿

Event Hunt is a modern web application that allows users to discover, explore, and join exciting events around them. Built with **Angular** for the frontend and **Node.js/Express** with **PostgreSQL** for the backend.

---

## Features

- Browse upcoming events with search and filters
- Filter events by category, date, and location
- View event details
- User authentication (login/register)
- Responsive and modern UI with green/white theme

---

## Technologies Used

- **Frontend:** Angular, HTML5, CSS3, TypeScript
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Authentication:** JWT (JSON Web Tokens)
- **Styling:** CSS3, responsive design
- **Version Control:** Git & GitHub

---

## Installation & Setup

### Prerequisites

- Node.js & npm
- Angular CLI
- PostgreSQL

### Steps

1. **Clone the repository**

```bash
git clone https://github.com/MarwaAhnadzai/event-hunt.git
cd event-hunt
````

2. **Backend Setup**

```bash
cd backend
npm install
```

* Create a `.env` file in the backend folder with:

```
PORT=5000
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_HOST=127.0.0.1
DB_PORT=5432
DB_NAME=eventhunt
JWT_SECRET=supersecretkey123
```

* Start backend server:

```bash
npm start
```

3. **Frontend Setup**

```bash
cd ../frontend
npm install
ng serve
```

* Access the application at [http://localhost:4200](http://localhost:4200)

---

## Usage

* Browse events on the homepage
* Use search and filters to find specific events
* Click on an event to see full details
* Register or login to manage your tickets (future feature)

---

## Project Structure

```
event-hunt/
├── backend/          # Node.js/Express backend
├── frontend/         # Angular frontend
├── .gitignore
├── README.md
└── package.json
```

---

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

---

## License

This project is licensed under the MIT License.

---

## Contact

**Author:** Marwa Ahnadzai
**GitHub:** [https://github.com/MarwaAhnadzai](https://github.com/MarwaAhnadzai)

---


