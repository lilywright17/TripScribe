CREATE DATABASE tripscribeDB;
USE tripscribeDB;

-- Users table
CREATE TABLE Users (
	userID INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(70),
    username VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    pword_hash VARCHAR(255) NOT NULL
);

-- Trips table
CREATE TABLE Trips (
	tripID INT AUTO_INCREMENT primary KEY,
    userID INT NOT NULL,
    city VARCHAR(60) NOT NULL,
    country VARCHAR(60) NOT NULL,
    description VARCHAR(255) NOT NULL,
    date_from DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    date_to DATETIME,
    FOREIGN KEY (userID) REFERENCES Users(userID)
);

-- Location table
CREATE TABLE Locations (
	locationID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    latitude DECIMAL(10,8) NOT NULL,
    longitude DECIMAL(11,8) NOT NULL
);

-- Photos table
CREATE TABLE Photos (
	photoID INT AUTO_INCREMENT PRIMARY KEY,
    tripID INT NOT NULL,
    userID INT NOT NULL,
    secure_url VARCHAR(255) NOT NULL,
    alt_text VARCHAR(255),
    FOREIGN KEY (tripID) REFERENCES Trips(tripID),
    FOREIGN KEY (userID) REFERENCES Users(userID)
);

-- Trips-Location joining table
CREATE TABLE Trip_Location (
	tripID INT NOT NULL,
    locationID INT NOT NULL,
    FOREIGN KEY (tripID) REFERENCES Trips(tripID),
    FOREIGN KEY (locationID) REFERENCES Locations(locationID)
);
    