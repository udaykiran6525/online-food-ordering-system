# 🍽️ FoodEase - Online Food Ordering System

FoodEase is a modern Full Stack Online Food Ordering System developed to provide a seamless experience for customers and restaurant administrators. The application allows customers to browse food items, add items to their cart, place orders, and track their order status, while restaurant administrators can efficiently manage menus, categories, customers, and orders through a dedicated dashboard.

---

# ✨ Features

## 👤 Customer Module

- User Registration & Login
- Secure JWT Authentication
- Browse Food Menu
- Search & Filter Food Items
- Add to Cart
- Wishlist Management
- Checkout & Order Placement
- Order History
- Profile Management
- Responsive User Interface

## 🏪 Restaurant Admin Module

- Secure Admin Login
- Dashboard Overview
- Menu Management
- Category Management
- Order Management
- Customer Management
- Restaurant Profile Management
- Revenue Analytics
- Real-time Notifications

---

# 💻 Tech Stack

## Frontend

- React.js
- HTML5
- CSS3
- JavaScript
- Axios
- React Router

## Backend

- Spring Boot
- Spring Security
- JWT Authentication
- REST API
- WebSocket
- Maven

## Database

- Aiven Cloud MySQL

## Cloud & Deployment

- Vercel (Frontend Hosting)
- Render (Backend Hosting)
- Cloudinary (Image Storage)
- GitHub (Version Control)

## Development Tools

- IntelliJ IDEA
- Visual Studio Code
- Postman
- Git
- GitHub

---

# 📂 Project Structure

```text
FoodEase/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   ├── controller/
│   │       │   ├── service/
│   │       │   ├── repository/
│   │       │   ├── entity/
│   │       │   ├── dto/
│   │       │   ├── config/
│   │       │   └── security/
│   │       │
│   │       └── resources/
│   │           ├── application.properties
│   │           ├── schema.sql
│   │           └── data.sql
│   │
│   └── pom.xml
│
└── README.md
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/your-username/foodease.git
```

## Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# 🗄️ Database Configuration

This project uses **Aiven Cloud MySQL** as the production database.

Database configuration is available in:

```text
backend/src/main/resources/application.properties
```

Database schema:

```text
backend/src/main/resources/schema.sql
```

Sample data:

```text
backend/src/main/resources/data.sql
```

---

# 🔐 Authentication

- JWT Token Based Authentication
- Password Encryption (BCrypt)
- Role-Based Authorization
- Protected REST APIs
- Secure Login & Registration

---

# 📦 Main Modules

- Landing Page
- Customer Dashboard
- Restaurant Dashboard
- Food Categories
- Food Menu
- Shopping Cart
- Wishlist
- Checkout
- Orders
- Profile Management

---

# ☁️ Deployment

| Service | Platform |
|----------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | Aiven Cloud MySQL |
| Image Storage | Cloudinary |
| Source Code | GitHub |

---

# 🔮 Future Enhancements

- Online Payment Gateway
- Email Notifications
- SMS Notifications
- Live Delivery Tracking
- Coupon & Offers System
- AI-Based Food Recommendation
- Mobile Application
- Review & Rating System

---

# 👨‍💻 Author

**KOTAPATI UDAY KIRAN**

---

# 📄 License

This project is developed for educational, internship, and learning purposes.
