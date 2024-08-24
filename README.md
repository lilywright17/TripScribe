# Team 5: TRIPSCRIBE
### Travel Diary app project 

Tripscribe is a platform designed to help users document and share their travel experiences. It allows users to create, manage, and showcase trips by uploading photos, adding descriptions, and keeping track of the places they've visited. 

## Prerequisites 

 - [Node.js](https://nodejs.org/en/): LTS v.20.12.2 and npm installed on your machine.
 - [MySQL](https://dev.mysql.com/downloads/mysql/) server installed and running.
 - [Workbench](https://dev.mysql.com/downloads/workbench/) OR [DBeaver](https://dbeaver.io/): Used for creating the database and visualizing any changes.
 - [Cloudinary](https://cloudinary.com/users/register_free): Used for storing the images.

## Installation
1. **Clone the Repository**

```bash
git clone https://github.com/lilywright17/TripScribe/tree/main
```

2. **Install Dependencies**

```bash
npm install 
```


```bash
npm install nodemon dotenv 
```

**Navigate to the `/backend` folder**
```
cd backend
npm install
```

**Navigate to the `/tripscribe` folder**
```
cd tripscribe
npm install
```

4. **Set Up the Environment Variables on `./backend` folder**

Create a `.env` file in the backend folder based on the `.env.EXAMPLE` file  

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
    ```

#### Generate the `JWT_SECRET` (used to protect the Routes and the User information) run the command bellow in your terminal. 

    node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

copy the result of the above command and replace the `paste_your_secret_key_here` in your `.env` file.

#### Cloudinary credentials- follow these steps to obtain your credentials:
1. Sign Up or Log In to [Cloudinary](https://cloudinary.com/users/register_free)
2. Access Your Cloudinary Dashboard
3. On the dashboard, you'll find your Cloudinary credentials, including the *Cloud Name*, *API Key*, and *API Secret*
4. Navigate to Upload Settings:  In the top-right corner of the dashboard, click on your profile picture or the gear icon to access the settings
In the settings menu, click on the "Upload" tab. This is where you can find and manage your *upload presets*

Go to your `.env` file and replace the `cloudname`, `uploadpreset`,
`apikey` and `apisecret` with your own credentials

#### Google Key- follow these steps to obtain your APIkey 

1. Go to [Google Maps](https://console.cloud.google.com/) and then Sign In with your Google account  
2. Create a project
3. Select the project and click on it
4. Navigate to APIs and Services and  click on *Libraries*.
5. Enable the following Libraries one by one: *Google Javascript API*, *Google Place API*, *Google Direction  API*, *Google Geolocation API*, *Google Geocoding  API*
6. Navigate to *APIs and Services* and  click on *Credentials*
7. Click on *Create Credentials* and then click on *API key* it will show your key

Then replace the `api_key` in your  `.env` file.

5. **Set Up the Database**

    Ensure your MySQL server is running and execute the SQL script to create the `tripscribeDB.sql` database and tables. You can use a MySQL client like MySQL Workbench or DBeaver.

    ```sql
    CREATE DATABASE tripscribeDB;
    USE tripscribeDB;

    -- Include the rest of your SQL script here to create tables and insert data.
    ```

    Open the Workbench/DBeaver, open the `tripscribedb.sql` file (located in the `/backend` folder) and run the SQL script. This step is required to create the database. Then open the  `mockData.sql` and run the SQL script - this step will create some mock data to see the functionality of the app.
    
    If you want to run data from users that we create you can use the `mockData.sql` 

    ```
    ### ADA LOVELACE CREDENTIALS
        email: 
        pwd:

    ``` 

## Running the project 

1. **Start the Server**

To start the server with automatic restarts on file changes, uun the API in development mode with nodemon:
```bash
npm run dev
```
    
To start the server without nodemon:
```bash
npm start
```

This will start the Express server and listen on port `8000`. You should see a message indicating the server is running.

```bash
Listening: http://localhost:8000
```

2. **Open the User Interface**

Navigate  `/tripscribe` folder, you will need to open a second terminal, run the command below to start the React app.

```
cd tripscribe
npm start
```
This will open your browser, and you are ready to use Tripscribe!


## Overview- Project features 

### Security Features

The TripScribe application is built with security in mind for the user. The following security features were implemented across both the backend and frontend to ensure that user data and access are protected:

**JWT (JSON Web Token): Used for Authentication and Authorization.**

- **Token-Based Authentication:** Upon successful login, a JWT is generated and stored in session storage for the user. This token is attached to subsequent API requests for authentication. The token contains encoded information about the user and is signed using a secret key.

- **Protected Routes:** Application routes such as /mytrips, /edittrip, /addtrip, /tripdetails, /map, and /userprofile are protected by JWT middleware, which checks for a valid JWT in the request headers. If the token is missing, invalid, or expired, access to the route is denied, and the user is redirected to the login page.

- **Session Expiry and Forced Logout:** The JWT includes an expiration time of 1 hour, after which the token becomes invalid. This time limitation ensures that even if a token is compromised, it has a limited lifespan. The application checks the token's validity and, when the session expires, forces a logout and redirects the user to the login page.

**Password Hashing: Secure Password Storage**

- **Hashed passwords:** user password are not stored in plain text. They are hashed using a secure hashing algorithm called bcrypt before being stored in the MySQL database. When a user logs in, the entered plain text password is hashed and compared with the stored hash to authenticate the user.

**SQL Injection Prevention: Parameterized Queries**

- The app uses parameterized queries to interact with the MySQL database, preventing SQL injection attacks by treating user inputs as parameters rather than executable code.
Sensitive Information in Environment Variables:

- Credentials, API keys, and other sensitive information are stored in environment variables in the .env file, rather than being hardcoded in the codebase. This helps protect sensitive data from unauthorized access.


### Accessibility

We prioritized creating an inclusive app by following best practices for a user-friendly interface, guided by Nielsen's design principles. Key accessibility features include descriptive alt-text for images and strong color contrast for readability, especially for users with visual impairments. After a 92% Lighthouse accessibility audit, we made improvements like adding descriptive page titles and a keyboard-accessible navigation bar to enhance accessibility.

Color Palette: We chose calming shades of green, ideal for a travel diary app. Greens evoke nature and exploration, while blue-greens are widely liked, gender-neutral, and easy on the eyes. The dark green (#476a6f) contrasts well with white for readability, and the predominantly white background keeps user-uploaded images as the focal point.

**[Figma-MVP TravelScribe](https://www.figma.com/design/1NMuILlUhbKr1rhzCM0Lol/Our-Travel-Diary-App?node-id=0-1&t=yXA9hvILT9kdZKje-1)**
[INCLUDE FLOW DEMO RUNNING THE APP-DRIVE store video]

![Wireframe Figma](./tripscribe/public/img/2024-08-02%2012_33_20-.png)

## License / Contact 

License TBD

### Contact 