# Lab 3 – Restaurant Database REST API

NodeJS + Express + MongoDB Atlas + Mongoose application for querying restaurant data.

---

## 👩‍💻 Student
Najnin Sultana  

---

## 🚀 Technologies Used
- Node.js
- Express
- MongoDB Atlas
- Mongoose
- dotenv
- nodemon

---

## ⚙️ Setup & Run

### 1. Install dependencies
npm install

### 2. Configure environment
Create `.env` file in the root:

PORT=3000  
MONGODB_URI=your_mongodb_connection_string

### 3. Run server
npm run dev

Server runs at:
http://localhost:3000

---

## 🗄 Database
Database Name: **Restaurants**  
Collection Name: **Restaurants**

Data imported using JSON seed file.

---

## 📡 API Endpoints

### ✅ Get all restaurants
GET /restaurants

---

### ✅ Get restaurants by cuisine
GET /restaurants/cuisine/:cuisine

Examples:
- /restaurants/cuisine/Japanese
- /restaurants/cuisine/Italian
- /restaurants/cuisine/Bakery

---

### ✅ Get restaurants with sorting
Returns: id, cuisines, name, city, restaurant_id  
Sort by restaurant_id.

GET /restaurants?sortBy=ASC  
GET /restaurants?sortBy=DESC

---

### ✅ Delicatessen not in Brooklyn
Returns cuisines, name, city  
Sorted by name ascending.

GET /restaurants/Delicatessen

---

## 🧪 Testing
Tested using:
- Browser
- Postman

---

## ✅ Status
✔ MongoDB Atlas connected  
✔ REST APIs working  
✔ Sorting & filtering implemented
