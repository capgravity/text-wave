<h1 align="center">Texting Application</h1>

<p align="center">
  <img src="frontend/public/TextWave.png" alt="TextWave"  />
</p>

<br />

A chat application built with Node.js, Express, Socket.io for the backend, and Vite for the frontend.


## Development Setup

### Prerequisites
Ensure that you have the following software installed on your system:

- **Node.js** (v16 or higher)
- **npm** (comes bundled with Node.js)


### Steps to Clone and Run the Project

1. Clone the repository:

    ```bash
    git clone https://github.com/capgravity/text-wave.git
    cd text-wave
    ```

2. Install backend dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:

    - Create a `.env` file in the root of the project.
    - Add the following variables:

      ```env
      PORT=5000
      MONGO_DB_URI=<your MongoDB connection string>
      JWT_SECRET=<your secret key>
      ```

    Replace `<your MongoDB connection string>` and `<your secret key>` with your actual values.

4. Install frontend dependencies:

    ```bash
    cd frontend
    npm install
    ```

5. Start the development server:

    - For the backend server, stay in the `text-wave` directory and run:

      ```bash
      npm run server
      ```

    - For the frontend development server, navigate to the `frontend` directory and run:

      ```bash
      npm run dev
      ```

6. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the frontend.  
   The backend will be running on [http://localhost:5000](http://localhost:5000).
   
## Documentation

For a detailed Project Structure, head to [Project Structure](docs/Project_Structure.md).


## License
 This project is licensed under the [MIT License](https://opensource.org/license/mit).
