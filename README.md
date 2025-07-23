# Real-Time Voting System

This project is a web application built as part of a thesis, demonstrating the implementation of a fully functional real-time voting system. The application uses React.js for the user interface (frontend) and Node.js with WebSockets for the server (backend), enabling instant and synchronized updates across all connected clients without needing a page refresh.

## Live Demo

A live version of this project is hosted on Netlify. You can view and test it here:

[**https://sistemi-votimit-ubt.netlify.app/**](https://sistemi-votimit-ubt.netlify.app/)

*Note: The free backend on Render may take 30-60 seconds to "wake up" on the first visit.*

## Technologies Used

The project is divided into two main parts: the client and the server, each with its own set of technologies.

**Frontend (Client):**

* **React.js (v18.x):** For building a dynamic and reactive user interface.
* **Vite:** As a fast build and development tool for the application.
* **JavaScript (ES6+):** The primary programming language.
* **CSS:** For styling the components.

**Backend (Server):**

* **Node.js (v20.x+):** As the runtime environment for server-side JavaScript code.
* **`ws` Library:** A lightweight and high-performance implementation of the WebSocket protocol.

## Project Structure

The folder structure is simple and clearly divided between the client and server logic.

```
sistemi-votimit/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── App.css
│   │   └── App.jsx
│   ├── package.json
│   └── ...
└── server/
    ├── node_modules/
    ├── package.json
    └── server.js
```

## Installation and Setup

To run this project in your local environment, please follow the steps below.

**Prerequisites:**

* You must have **Node.js** (version 20.x or newer) and **npm** installed.

**Installation Steps:**

1.  **Clone the Repository (or download the ZIP):**
    ```bash
    git clone https://github.com/arjonaramadani/sistemi-votimit
    cd sistemi-votimit
    ```

2.  **Install Server Dependencies:**
    Navigate to the server directory and install the necessary packages.
    ```bash
    cd server
    npm install
    ```

3.  **Install Client Dependencies:**
    Navigate to the client directory and install the necessary packages.
    ```bash
    cd ../client
    npm install
    ```

## Running the Application

The application requires both the server and the client to be running simultaneously in two separate terminal windows.

**1. Start the Server:**

* Open a terminal and navigate to the `server` directory.
    ```bash
    cd path/to/sistemi-votimit/server
    ```
* Run the command to start the server.
    ```bash
    node server.js
    ```
* The server will start and display the message: `Serveri WebSocket po funksionon në portin 8080...` (WebSocket server is running on port 8080...)

**2. Start the Client:**

* Open a **second** terminal and navigate to the `client` directory.
    ```bash
    cd path/to/sistemi-votimit/client
    ```
* Run the command to start the Vite development server.
    ```bash
    npm run dev
    ```
* The client will start and provide you with a local address, usually `http://localhost:5173`.

**3. Open the Application:**

* Open your favorite web browser and visit the address `http://localhost:5173`.
* To test the real-time functionality, open the address in two or more different browser windows/tabs.

## Core Features

* **Persistent Connection:** Uses the WebSocket protocol to maintain an open communication channel between the client and the server.
* **Real-Time Updates:** Every registered vote instantly updates the interface for all connected users without requiring a refresh.
* **State Synchronization:** All new clients that connect immediately receive the current state of the poll.
* **Reactive Interface:** Built with React, the interface efficiently re-renders only when the data changes.
* **Reset Functionality:** Includes a button to reset the poll results to zero for all connected users in real-time.
