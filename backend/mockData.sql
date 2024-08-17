-- SQL script with mock data for the Users and Trips table
INSERT INTO Users (userID, fullname, username, email, pword_hash)
VALUES 
(1, 'Ada Lovelace', 'adalovelace', 'ada.lovelace@gmail.com', '$2b$10$A/FfTkuxVxuuzobymwpNCOzDLsctzpX3HN0KSmlOFKgjmF5YoLp9W'),
(2, 'Rosalind Franklin', 'rosalindf', 'rosalind.franklin@gmail.com', '$2b$10$6sub3KkksQrBdy2VjpBTF.qK6F8XzsEhpqxXCV4kno.3s0L1To02W'),
(3, 'Lise Meitner', 'lisemeitner', 'lise.meitner@gmail.com', '$2y$10$T9zXnRZb.xS4G6HGi21O6ujm8IaUM5K4/1T/QF2bqW1aUIRbMqTAJ'),
(4,	'Victoria Test', 'victoriatest01', 'th4les.vic.jkm@gmail.com', '$2b$10$URSNfNyaCimQwnNssm65MuXDeNbyd74XoG4HW6sqN3SIC9VIeOrQC');

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
(9, 3, 'Vienna', 'Austria', 'Presented research on nuclear fission.', '2024-05-10 09:00:00', '2024-05-14 16:00:00'),

-- Trips for Victoria Test
(10, 4,	'Tokyo', 'Japan',	'Immersing myself in the unique blend of tradition and modernity, from ancient temples to futuristic districts.', '2024-06-15 00:00:00', '2024-08-22 00:00:00'),
(11, 4, 'Reykjavik', 'Iceland', 'Experiencing the magic of the Northern Lights, soaking in hot springs, and exploring stunning volcanic landscapes.', '2024-07-19 00:00:00', '2024-08-01 00:00:00'),
(12, 4, 'Sydney', 'Australia', 'Soaking up the sun on Bondi Beach, followed by a harbor cruise and indulging in fresh seafood along the coastline.', '2024-01-12 00:00:00', '2024-10-19 00:00:00'),
(13, 4, 'Rio de Janeiro', 'Brazil', 'Enjoying the vibrant culture of Carnival, lounging on Copacabana Beach, and taking in the stunning views from Sugarloaf Mountain.', '2024-03-10 00:00:00', '2024-08-29 00:00:00'),
(14, 4, 'Bilbao', 'Spain', 'Exploring the rich Basque culture, visiting the iconic Guggenheim Museum, and enjoying pintxos in the old town.', '2024-08-01 00:00:00', '2024-09-07 00:00:00');

INSERT INTO Photos (photoID, tripID, userID, secure_url, alt_text )
VALUES 
-- Photos for userID=4 // tripID= 10, 11, 13, ,14
(1, 10, 4, 'https://res.cloudinary.com/cfgvicteam5/image/upload/v1723898930/hsp9umyioxxlkvcnmmux.png', NULL),
(2, 10, 4, 'https://res.cloudinary.com/cfgvicteam5/image/upload/v1723898933/cwqdgzlvml95zmntkqzj.png', NULL),
(3, 10, 4, 'https://res.cloudinary.com/cfgvicteam5/image/upload/v1723898932/kbg7xrtiwtybtensfmnk.png', NULL),
(4, 11, 4, 'https://res.cloudinary.com/cfgvicteam5/image/upload/v1723899190/s6eh9lm9mp3pom1lhgpo.png', NULL),
(5, 11, 4, 'https://res.cloudinary.com/cfgvicteam5/image/upload/v1723899189/j92deqzionxkvu2ljbzp.png', NULL),
(6, 11, 4, 'https://res.cloudinary.com/cfgvicteam5/image/upload/v1723899189/slmrxyyvmja0lpxc4voi.png', NULL),
(7, 12, 4, 'https://res.cloudinary.com/cfgvicteam5/image/upload/v1723899279/r4zcxz1c2redpqcqdrq6.png', NULL),
(8, 12, 4, 'https://res.cloudinary.com/cfgvicteam5/image/upload/v1723899279/e62fvnrw1eeeztywbyv6.png', NULL),
(9, 12, 4, 'https://res.cloudinary.com/cfgvicteam5/image/upload/v1723899280/d45qtocfl7xs9i2xwylu.png', NULL),
(10, 13, 4, 'https://res.cloudinary.com/cfgvicteam5/image/upload/v1723899690/pug27wg2x2jqq9xxcv9z.png', NULL),
(11, 13, 4, 'https://res.cloudinary.com/cfgvicteam5/image/upload/v1723899689/iogt29g9h5hjwozbtuag.png', NULL),
(12, 13, 4, 'https://res.cloudinary.com/cfgvicteam5/image/upload/v1723899688/epmazjwpazugaixmi7yz.png', NULL),
(13, 14, 4, 'https://res.cloudinary.com/cfgvicteam5/image/upload/v1723900899/jrgaoyckwtniuemthtgo.png', NULL),
(14, 14, 4, 'https://res.cloudinary.com/cfgvicteam5/image/upload/v1723900899/pezhjnx4azgrolhhjdvo.png', NULL),
(15, 14, 4, 'https://res.cloudinary.com/cfgvicteam5/image/upload/v1723900905/nwikftoiyd8fqudgr22u.png', NULL);



-- For testing purposes 
-- select * from Users;
-- SET SQL_SAFE_UPDATES = 0;
-- DELETE FROM Users WHERE username='Jsmith';
