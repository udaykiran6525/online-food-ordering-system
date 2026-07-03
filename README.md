# FoodEase - Online Food Ordering System
FoodEase is a modern Full Stack Online Food Ordering System designed to provide a seamless experience for customers and restaurant administrators. The application allows users to browse food items, manage carts, place orders, and track order status, while administrators can efficiently manage menus, customers, and orders through a dedicated dashboard.

## Features

### Customer Module
- User Registration & Login
- Secure JWT Authentication
- Browse Food Menu
- Search & Filter Food Items
- Add to Cart
- Wishlist Management
- Checkout & Order Placement
- Order History
- Profile Management
- Real-time Order Status Updates
- Responsive Dashboard

### Restaurant Admin Module
- Secure Admin Login
- Dashboard Overview
- Menu Management
- Category Management
- Order Management
- Customer Management
- Revenue Analytics
- Profile Management
- Real-time Notifications

## Tech Stack

### Frontend
- React.js
- HTML5
- CSS3
- JavaScript
- Axios
- React Router

### Backend
- Spring Boot
- Spring Security
- JWT Authentication
- REST API
- WebSocket

### Database
- MySQL

### Tools
- Maven
- Git
- GitHub
- IntelliJ IDEA
- Visual Studio Code
- Postman

---

## 📂 Project Structure

```
FoodEase/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   ├── pom.xml
│   └── application.properties
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/foodease.git
```

### Backend

```bash
cd backend
mvn spring-boot:run
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Database Configuration

Update the database configuration in:

```
backend/src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/foodease
spring.datasource.username=<your_mysql_username>
spring.datasource.password=<your_mysql_password>
```
Note: Update the database credentials in backend/src/main/resources/application.properties according to your local MySQL configuration before running the application.
---

## Authentication

- JWT Token Based Authentication
- Password Encryption
- Role-Based Authorization
- Protected APIs

## Main Modules

- Landing Page
- Customer Dashboard
- Restaurant Admin Dashboard
- Food Menu
- Shopping Cart
- Wishlist
- Checkout
- Orders
- Notifications
- Profile Management

## Future Enhancements

- Online Payment Gateway
- Email Notifications
- SMS Notifications
- Delivery Tracking
- Coupon System
- AI-Based Food Recommendations
- Mobile Application

## Developed By
K.Uday Kiran
Bachelor of Technology (B.Tech)
Artificial Intelligence & Data Science (AI&DS)

## License
This project is developed for educational and learning purposes.
