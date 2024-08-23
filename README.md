# Team 5's Travel Diary app project 

## Prerequisites 

- Node.js and npm installed on your machine.
- MySQL server installed and running.

## Installation
1. **Clone the Repository**

    ```bash
    git clone https://github.com/lilywright17/TripScribe/tree/main
    ```

2. **Install Dependencies**

    ```bash
    npm install 
    ```
    You can use nodemon 

    ```bash
    npm install nodemon dotenv 
    ```

3. **Set Up the Environment Variables**

    Create a `.env` file in the backend folder based on the `.env.EXAMPLE` file. This file should contain these credentials

    ```env
        #Database credentials
        host=db.localhost
        user=root
        password=db.passowrd
        database=db.name

        #Server configuration
        PORT=5000

        #JWT credential
        JWT_SECRET=paste_your_secret_key_here

        #Cloudinary credentials
        CLOUDINARY_CLOUD_NAME=cloudname
        CLOUDINARY_UPLOAD_PRESET=uploadpreset
        CLOUDINARY_API_KEY=apikey
        CLOUDINARY_API_SECRET=apisecret

        #Google API Key
        GOOGLE_KEY=api_key

4. **Set Up the Database**

    Ensure your MySQL server is running and execute the SQL script to create the `tripscribeDB.sql` database and tables. You can use a MySQL client like MySQL Workbench.

    ```sql
    CREATE DATABASE tripscribeDB;
    USE tripscribeDB;

    -- Include the rest of your SQL script here to create tables and insert data.
    ```

    If you want to run data from users that we create you can use the `mockData.sql` These 

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