# Viae Frontend (React + Vite)
```
## 📌 Description

The Viae frontend provides a modern and responsive user interface for a role-based fleet and ride management system. It enables authenticated users to interact with the platform through dashboards tailored to their roles, supporting efficient management of drivers, rides, and availability within an organization.

The frontend is responsible for handling user interactions, role-based navigation, and communication with backend APIs, ensuring a secure and user-friendly experience for both administrators and drivers.
```

## 🎯 Application Idea – Viae (Frontend Perspective)
```
### System Overview

Viae is a role-based fleet management web application designed to manage internal transportation operations within an organization. From a frontend perspective, the system provides intuitive dashboards and interfaces that allow users to perform tasks based on their assigned roles.

The overall system follows a full-stack architecture consisting of:
- **React (with Vite)** for frontend user interaction and dashboards
- **Node.js and Express** for backend API services
- **PostgreSQL** for persistent data storage
- **Role-Based Access Control (RBAC)** to ensure system security and data integrity

```

## 👥 Target Users (Frontend)
```
### System Administrators
- Manage and approve pending driver applications
- Create and manage ride requests
- Assign drivers to rides
- View, update, and delete driver information
- Monitor ride statuses and system activity through dashboards

### Drivers
- Apply for access to the platform
- Manage their availability status
- View assigned rides and ride history
- Interact with ride actions such as starting or completing rides
```

## 🧾 User Requirements (Frontend)

### Admin Requirements
- Create an account and log in securely using email and password
- View all registered drivers
- Approve or reject pending driver applications
- View all ride requests and their statuses
- View available drivers and assign them to ride requests
- Filter ride requests based on status
- Create new ride requests
- Update driver information
- Log out securely from the system

### Driver Requirements
- Submit a request to create a driver account
- Log in after receiving administrator approval
- Set and update availability status
- View assigned rides
- Start or complete assigned rides
- View personal profile information
- Log out securely from the system



## 🛠 Technologies Used (Frontend)

- **React.js** – Component-based frontend framework
- **Vite** – Fast development server and build tool
- **React Router** – Client-side routing and navigation
- **Context API** – Global state management
- **Fetch API** – Communication with backend REST APIs
- **MDB (Material Design for Bootstrap)** – UI components and styling
- **LocalStorage** – Persisting authentication and session data

---

## 🚀 Getting Started (Frontend)

Follow the steps below to run the frontend application locally:

```bash
cd viae-frontend
npm install
npm run dev
