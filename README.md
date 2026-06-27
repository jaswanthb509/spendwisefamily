# SpendWiseFamily

A full-stack MERN application that enables families to collaboratively manage expenses, budgets, and savings goals while gaining valuable financial insights through analytics and AI-powered recommendations.

---

## Live Demo

### Frontend
https://spendwisefamily.vercel.app

### Backend API
https://spendwisefamily-backend.onrender.com

---

## Overview

SpendWiseFamily is a family finance management platform designed to help households track spending, manage budgets, achieve savings goals, and make better financial decisions together.

The application supports family groups, role-based access control, expense tracking, budgeting, savings goals, analytics dashboards, activity monitoring, and AI-generated financial recommendations.

---

## Features

### Authentication & Security

- User Registration & Login
- JWT Authentication
- Protected Routes
- Secure Password Hashing using Bcrypt
- Role-Based Authorization

---

### Family Management

- Create Family Groups
- Join Family Using Invite Code
- Admin & Member Roles
- Family Member Tracking
- Shared Financial Data

---

### Expense Management

- Add Expenses
- Edit Expenses
- Delete Expenses
- Expense Categories
- Date-Based Tracking
- Member-Wise Expense Monitoring

Categories Include:

- Food
- Transport
- Bills
- Shopping
- Health
- Education
- Other

---

### Budget Management

- Monthly Category Budgets
- Budget Utilization Tracking
- Remaining Budget Monitoring
- Budget Alerts
- Visual Progress Indicators

---

### Savings Goals

- Create Savings Goals
- Track Goal Progress
- Add Savings Contributions
- Completion Status Monitoring
- Savings Analytics

---

### Analytics Dashboard

- Total Expense Tracking
- Family Spending Overview
- Category-Wise Analysis
- Monthly Financial Summary
- Family Performance Metrics

Charts Built Using:

- Pie Charts
- Bar Charts
- Summary Statistics

---

### AI Financial Insights

Generate intelligent recommendations based on spending habits:

- Spending Pattern Analysis
- Savings Suggestions
- Budget Optimization Tips
- Financial Health Evaluation

Powered by Google Gemini AI.

---

### PDF Report Export

Generate downloadable reports including:

- Expenses
- Budgets
- Savings Goals
- Financial Summaries

---

### Activity Tracking

Track recent family actions:

- Expense Added
- Expense Updated
- Expense Deleted
- Budget Created
- Goal Created
- Family Events

---

## Tech Stack 

### Frontend :

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Recharts
- Axios
- React Hot Toast
- jsPDF

### Backend :

- Node.js
- Express.js
- JWT Authentication
- Bcrypt
- Express Validator

### Database :

- MongoDB Atlas
- Mongoose ODM

### AI :

- Google Gemini API

### Deployment :

- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas (Database)

---

## System Architecture

```text
React + Vite Frontend
         │
         ▼
Express.js REST API
         │
         ▼
MongoDB Atlas Database
         │
         ▼
Google Gemini AI
```

---

## Project Structure

```text
SpendWiseFamily
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── assets
│   │   └── App.jsx
│   │
│   └── package.json
│
├── server
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── config
│   └── server.js
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/jaswanthb509/spendwisefamily.git

cd spendwisefamily
```

### Frontend Setup

```bash
cd client

npm install

npm run dev
```

### Backend Setup

```bash
cd server

npm install

npm start
```

---

##  Environment Variables

### Backend (.env)

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key
```

### Frontend (.env)

```env
VITE_API_URL=https://your-backend-url.com
```

---

## Screenshots

### Dashboard


<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/33cf9ce2-2bd0-4fb9-9904-01fef522558d" />



### Expenses


<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/52a912da-6254-4044-85fb-18b6f05e0ac1" />


### Analytics


<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e1558f74-ccb8-4e02-9270-65a9c4b05a99" />


### Goals


<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/577eaa35-ce16-4ea6-8c2d-87b4baf3b590" />


### Family Management


<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/0e0a84aa-8683-455f-884d-4a38acdd95cb" />


### AI Insights


<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/b2306f14-c5fb-42ec-b98c-ea31a310a910" />


---

## Key Highlights :

- Full-Stack MERN Application
- JWT Authentication
- Role-Based Access Control
- Family Collaboration System
- Interactive Analytics Dashboard
- AI-Powered Financial Recommendations
- PDF Report Generation
- MongoDB Atlas Integration
- Cloud Deployment (Vercel + Render)

---

## Author :

### Jaswanth B

B.Tech CSE Student | IIIT Nagpur

GitHub:
https://github.com/jaswanthb509

LinkedIn:
https://www.linkedin.com/in/bjaswanth7/

---

## License

This project is licensed under the MIT License.

---

⭐ If you found this project useful, consider giving it a star on GitHub.
