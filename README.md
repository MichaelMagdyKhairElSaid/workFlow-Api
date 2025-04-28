# Workflow
* is a comprehensive employee attendance management system designed to streamline the tracking and monitoring of employee work schedules, absences, and leave requests.
* link:[Use-worKFlow-API](https://www.postman.com/michaelsayed/workspace/workflow/documentation/33172638-cb4a02d7-6f8c-4d9d-a54d-6dd6153a7ec1)

## Key Features

### Employee Management
- Robust CRUD operations: add, update, retrieve (all/by ID), and delete employee records.
- Upload employee images with support for multiple file formats (PNG, JPEG, JPG, etc.) for streamlined identification.

### Authentication & Security
- Secure password hashing for all user accounts.
- Token-based authentication with configurable expiration for enhanced security.
- Password change functionality that invalidates previous tokens to prevent unauthorized access.

### Absence Management
- Simplified leave request submission process.
- Efficient and customizable leave approval workflows.
- Support for various leave types: vacation, sick leave, personal leave, and more.

### Attendance Tracking
- Clock in/out functionality via web app, mobile app, or physical terminals.
- Automatic calculation of work hours based on attendance logs.

### Task Management
- Full task CRUD operations: add, update, retrieve (all/by ID), and delete tasks for effective workflow organization.

### Alerts & Notifications
- Send alerts to individual or multiple employees.
- View, manage, and display all alerts with detailed descriptions.

### Reporting & Analytics
- Generate comprehensive reports on attendance, leave patterns, and work schedules.
- Gain insights into workforce productivity and areas for improvement.
- Export reports in various formats (e.g., PDF, CSV) for analysis and sharing.

### Benefits:
* Improved accuracy and efficiency in attendance tracking.
* Reduced administrative burden on HR personnel.
* Increased transparency and accountability for employees.
* Valuable data for informed decision-making regarding workforce management.
* Potential cost savings through better leave management.

## Installation

### Clone the repository
``` bash
git clone https://github.com/MichaelMagdyKhairElSaid/workFlow-Api
cd awesome-project
```
### Environment variables
``` .ENV
MODE = Production
ENCYPTION_KEY=AnyWord
SALT_ROUNDS=5
connectionURI=[YourConnectionURI]
CLOUDINARY_CLOUD_NAME=[cloudName]
CLOUDINARY_API_KEY=[API_KEY]
CLOUDINARY_API_SECRET=[API_SECRET]
```
### Run
``` CMD
npm install
node index,js
```
### OPEN
link : [http://localhost:3000/](http://localhost:3000/)
