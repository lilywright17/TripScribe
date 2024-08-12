# Team 5's Travel Diary app project 

## Prerequisites  
## Installation
1. **Clone the Repository**

    ```bash
    git clone https://github.com/lilywright17/TripScribe/tree/main
    ```

2. **Install Dependencies**

    ```bash
    npm install 

    ```bash
    npm install nodemon dotenv 
    ```

3. **Set Up the Environment Variables**

    Create a `.env` file in the [] of the project based on the `.env.EXAMPLE` file. This file should contain your MySQL credentials.

    ```env
    host=localhost
    user=root
    password=password
    database=database
    port=5000
    ```
    Create a `.env` file in the [] of the project based on the `.env.EXAMPLE` file. This file should contain your Cloudinary env credentials.

    ```cloudinary preset
    REACT_APP_CLOUDINARY_CLOUD_NAME=cloudname
    REACT_APP_CLOUDINARY_UPLOAD_PRESET=uploadpreset
    ```

4. **Set Up the Database**

    Ensure your MySQL server is running and execute the SQL script to create the [] database and tables. You can use a MySQL client like MySQL Workbench.

    ```sql
    CREATE DATABASE [];
    USE [];

    -- Include the rest of your SQL script here to create tables and insert data.
    ```

## Running the project 
1. **Start the Server**

    To start the server with automatic restarts on file changes, use nodemon:
    ```bash
    npm run dev
    ```
    
    To start the server without nodemon:
    ```bash
    npm start
    ```

    This will start the Express server and listen on port [ ]. You should see a message indicating the server is running.

    ```bash
    Listening: http://localhost:[ ] Sucess! Connected to [] database
    ```

2. **Open the User Interface**


## Overview- Project features 
## Usability 
## License / Contact 