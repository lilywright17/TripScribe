-- SQL script with mock data for the Users and Trips table
INSERT INTO Users (userID, fullname, username, email, pword_hash)
VALUES 
(1, 'Ada Lovelace', 'adalovelace', 'ada.lovelace@example.com', '$2y$10$7eL1g5J23M/Nq3PvKT/vfOd41n/M1Ox7dR/Lk6Rjlt9UMPa7s6EWS'),
(2, 'Rosalind Franklin', 'rosalindf', 'rosalind.franklin@example.com', '$2y$10$F7GHb43MQU9B/VxK0mvOUuCRQnNV/s6WRGpFi5i9R2s/zDeRExQ72'),
(3, 'Lise Meitner', 'lisemeitner', 'lise.meitner@example.com', '$2y$10$T9zXnRZb.xS4G6HGi21O6ujm8IaUM5K4/1T/QF2bqW1aUIRbMqTAJ');

INSERT INTO Trips (tripID, userID, city, country, description, date_from, date_to)
VALUES 
-- Trips for Ada Lovelace (userID 1)
(1, 1, 'Paris', 'France', 'Attended a mathematics conference.', '2024-01-15 09:00:00', '2024-01-20 18:00:00'),
(2, 1, 'London', 'United Kingdom', 'Visited the Royal Society for a seminar.', '2024-03-05 10:00:00', '2024-03-07 17:00:00'),
(3, 1, 'Florence', 'Italy', 'Explored the historical archives of computing.', '2024-06-10 14:00:00', '2024-06-15 12:00:00'),

-- Trips for Rosalind Franklin (userID 2)
(4, 2, 'New York', 'United States', 'Gave a keynote speech at a molecular biology conference.', '2024-02-12 08:00:00', '2024-02-16 20:00:00'),
(5, 2, 'Cambridge', 'United Kingdom', 'Collaborated on DNA research.', '2024-04-20 09:30:00', '2024-04-25 18:00:00'),
(6, 2, 'Zurich', 'Switzerland', 'Attended an international symposium on crystallography.', '2024-08-01 10:00:00', '2024-08-05 19:00:00'),

-- Trips for Lise Meitner (userID 3)
(7, 3, 'Berlin', 'Germany', 'Visited the Institute for Nuclear Physics.', '2024-01-22 09:00:00', '2024-01-27 18:00:00'),
(8, 3, 'Stockholm', 'Sweden', 'Received an honorary doctorate.', '2024-03-15 12:00:00', '2024-03-20 15:00:00'),
(9, 3, 'Vienna', 'Austria', 'Presented research on nuclear fission.', '2024-05-10 09:00:00', '2024-05-14 16:00:00');