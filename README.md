# HRMS Lite

**HRMS Lite** is a simple and efficient Human Resource Management System built with **React, TypeScript, Tailwind CSS, FastAPI, and MongoDB**. It allows you to manage employees, mark and view attendance, and provides a minimal yet functional HR dashboard.

---

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Project Structure](#project-structure)
* [Getting Started](#getting-started)
* [API Endpoints](#api-endpoints)
* [Usage](#usage)

---

## Features

* Create, view, and delete employees
* Mark attendance (Present / Absent / Leave)
* View attendance by employee and month/year
* Searchable dropdown for selecting employees
* Modern UI with ShadCN components and Tailwind CSS
* Responsive design and minimal landing page

---

## Tech Stack

* **Frontend:** React, TypeScript, Tailwind CSS, ShadCN UI components, Sonner for toast notifications
* **Backend:** FastAPI, Pydantic, MongoDB
* **Icons:** Lucide Icons
* **HTTP Client:** Axios

---

## Project Structure

```plaintext
hrms-lite/
├─ fontend/src/
│  ├─ components/
│  │  ├─ ui/             # ShadCN UI components (Button, Card, Input, Tabs, Table, Select, etc.)
│  │  └─ sidebar.tsx      # Sidebar component
│  ├─ pages/
│  │  ├─ HomePage.tsx
│  │  ├─ MarkAttendance.tsx
│  │  ├─ ViewAttendance.tsx
│  │  ├─ ViewEmployees.tsx
│  │  └─ CreateEmployee.tsx
│  ├─ api/
│  │  └─ api_instance.ts  # Axios client setup
├─ backend
│  ├─ main.py             # FastAPI app entry
│  ├─ src/
│  │  ├─ routers/
│  │  │  ├─ employee.py      # Employee CRUD routes
│  │  │  └─ attendance.py    # Attendance routes
│  │  ├─ models/
│  │  │  ├─ EmployeeModel.py
│  │  │  └─ AttendanceModel.py
│  │  └─ database.py         # MongoDB connection
│  ├─ .env              # Environment variables for API URLs, DB connection, etc.
```

---

## Getting Started

### Prerequisites

* Node.js >= 18
* Python >= 3.10
* MongoDB instance (local or cloud)
* UV for python

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### Backend

```bash
cd backend
uv sync
uvicorn main:app --reload
```

Open [http://localhost:8000/docs](http://localhost:8000/docs) to see the interactive FastAPI documentation.

---

### Environment Variables

Create a `.env` file in the backend folder:

```env
MONGO_URI=mongodb://localhost:27017/hrms
```

And in the frontend folder (optional):

```env
VITE_API_URL=http://localhost:8000/api
```

---

## API Endpoints

### Employees

| Method | Endpoint                      | Description           |
| ------ | ----------------------------- | --------------------- |
| GET    | `/employee/get-all`           | Get all employees     |
| POST   | `/employee/create`            | Create a new employee |
| DELETE | `/employee/delete-by-id/{id}` | Delete employee by ID |

### Attendance

| Method | Endpoint           | Description                             |
| ------ | ------------------ | --------------------------------------- |
| POST   | `/attendance/mark` | Mark attendance                         |
| GET    | `/attendance/get`  | Get attendance by employee & month/year |

---

## Usage

1. Navigate to the **mark attendance page**.
2. Use the **Employee dropdown** to select an employee. (or Create a new employee)
3. Mark attendance with **Present / Absent / Leave**.
4. View attendance by employee and filter by month/year or select 0 for the full year.
5. Manage employees in the **All Employees** page with search and delete functionality.
