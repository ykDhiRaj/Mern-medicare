# mediCare

**mediCare** is a full-stack appointment booking system designed to facilitate hospital appointments with enhanced security and user management. This project utilizes the MERN stack, including Express and Mongoose, to provide a seamless experience for both users and hospitals.

## Features

- **User Authentication**: Users can sign up and log in with secure password encryption.
- **Hospital Authentication**: Hospitals can log in to manage appointment requests.
- **Appointment Management**: Hospitals can view, accept, or reject appointment requests.
- **Appointment Requests**: Users can request appointments from a list of available hospitals.
- **Security**: Only manually added hospitals can log in; no hospital sign-up is allowed to maintain database integrity.

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js with Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens) for secure user and hospital sessions
- **Password Encryption**: bcrypt for hashing passwords

## Installation

### Prerequisites

- Node.js
- MongoDB

### Clone the Repository

```bash
git clone https://github.com/ykDhiraj/Mern-medicare.git
cd Mern-medicare
