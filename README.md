# Employee Leave Management System

A full-stack web-based Employee Leave Management System that allows employees to register, log in, apply for leave, upload supporting documents, track leave status, and receive notifications.

Managers can view employee leave requests and approve or reject them through a dedicated manager interface.

---

## 🚀 Live Application

### Frontend / Live Application

https://daring-love-production-d190.up.railway.app

### Backend API

https://employee-leave-management-system-production-1648.up.railway.app


---

## 📌 Project Overview

The Employee Leave Management System is designed to digitize and simplify the employee leave management process.

Employees can submit leave applications with supporting documents and track their application status. Managers can review pending requests and approve or reject them. The system also generates notifications to keep employees informed about decisions made on their leave requests.

The application uses a React.js frontend, Node.js and Express.js backend, and MySQL database.

---

## ✨ Features

### Employee Features

- Employee registration
- Employee login
- Secure password hashing using bcrypt
- JWT-based authentication
- Role-based authorization
- Apply for leave
- Select leave start and end dates
- Enter leave reason
- Upload supporting documents
- View personal leave history
- Track leave approval/rejection status
- Receive notifications
- View notification status

### Manager Features

- Manager login
- Secure manager authentication
- View employee leave requests
- View leave request details
- Review pending leave applications
- Approve leave requests
- Reject leave requests
- Add remarks while processing requests
- Update leave request status
- Send notifications to employees

---

## 🛠️ Technologies Used

### Frontend

- React.js
- JavaScript
- HTML
- CSS
- Axios

### Backend

- Node.js
- Express.js
- REST API
- JWT
- bcrypt
- Multer
- CORS

### Database

- MySQL
- MySQL2

### Deployment

- Railway

### Development Tools

- Visual Studio Code
- Git
- GitHub
- Google Chrome

---

## 🏗️ System Architecture

The application follows a client-server architecture.

The React frontend communicates with the Node.js and Express.js backend through REST APIs. The backend handles authentication, authorization, leave management, document uploads, manager approval workflows, and notifications.

MySQL is used as the persistent database.

```text
                    Employee / Manager
                           |
                           v
                  +------------------+
                  |  React Frontend  |
                  +--------+---------+
                           |
                        REST APIs
                           |
                           v
                  +------------------+
                  | Node.js / Express|
                  |     Backend      |
                  +--------+---------+
                           |
              +------------+------------+
              |                         |
              v                         v
      +---------------+         +---------------+
      |     MySQL     |         |    Multer     |
      |    Database   |         | File Uploads  |
      +---------------+         +---------------+
---

## 👤 Sample Manager Credentials

**Username:** manager@gcu.in

**Password:** Manager@123

**Role:** Manager

> These credentials are provided for project demonstration and evaluation.

---

## ⚙️ Local Setup

### Prerequisites

- Node.js
- npm
- MySQL
- Git
- Visual Studio Code

### Backend Setup

Open a terminal in the project folder and run:

```bash
cd backend
npm install
npm start
---

## 🔗 GitHub Repository

[View Source Code on GitHub](https://github.com/kushim2005/employee-leave-management-system)

---

## 📄 License

This project was developed for academic and educational purposes.