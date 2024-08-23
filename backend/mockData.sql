USE tripscribeDB;

-- SQL script with mock data for the Users and Trips table
INSERT INTO Users (userID, fullname, username, email, pword_hash)
VALUES 
(1, 'Ada Lovelace', 'adalovelace', 'ada.lovelace@gmail.com', '$2b$10$A/FfTkuxVxuuzobymwpNCOzDLsctzpX3HN0KSmlOFKgjmF5YoLp9W'),
(2, 'Rosalind Franklin', 'rosalindf', 'rosalind.franklin@gmail.com', '$2b$10$6sub3KkksQrBdy2VjpBTF.qK6F8XzsEhpqxXCV4kno.3s0L1To02W'),
(3, 'Lise Meitner', 'lisemeitner', 'lise.meitner@gmail.com', '$2y$10$T9zXnRZb.xS4G6HGi21O6ujm8IaUM5K4/1T/QF2bqW1aUIRbMqTAJ'),
(4,	'Victoria Test', 'victoriatest01', 'th4les.vic.jkm@gmail.com', '$2b$10$URSNfNyaCimQwnNssm65MuXDeNbyd74XoG4HW6sqN3SIC9VIeOrQC'),
(5, 'Lily', 'lily93', 'lilywright93@gmail.com', '$2b$10$Qw859hFvbPC0fUCKeYWxFu/giGrgJIItxZAXX.GMzzOAbZgrd5oYq');

INSERT INTO Trips (tripID, userID, city, country, description, date_from, date_to)
VALUES 
-- Trips for Ada Lovelace (userID 1)
(1, 1, 'Lisbon', 'Spain', 'Lisbon was a city that instantly felt like home. I loved getting lost in the narrow, winding streets of Alfama, where every corner revealed a new story. Riding the yellow trams was a delight, offering glimpses of the city’s beautiful hills and the shimmering Tagus River. The Jerónimos Monastery was a highlight, its intricate details leaving me speechless.', '2024-01-15 09:00:00', '2024-01-20 17:00:00'),
(2, 1, 'Madrid', 'Spain', 'My trip to Madrid was a whirlwind of culture and excitement. I started at the Royal Palace, where the grandeur of Spanish history unfolded before my eyes. The Prado Museum was next, with its breathtaking art collection that left me in awe. Evenings were spent in bustling plazas, indulging in tapas and soaking up the vibrant atmosphere. Madrid energy is contagious.', '2024-03-05 10:00:00', '2024-03-07 17:00:00'),
(3, 1, 'Berlin', 'Germany', 'Berlin was unlike any place I’ve ever been. The city’s history is palpable; standing before the Brandenburg Gate, I could feel the weight of its past. Visiting the Berlin Wall Memorial was deeply moving, reminding me of the city’s resilience and transformation. Yet, Berlin is also a hub of creativity and innovation. I wandered through eclectic neighborhoods, explored contemporary art galleries.', '2024-06-10 14:00:00', '2024-06-15 12:00:00'),
(4, 1, 'Rome', 'Italy', 'Rome felt like walking through a living museum, every corner revealing a new piece of history. I started my days with a strong espresso before diving into ancient wonders like the Colosseum and the Roman Forum, where I could almost hear the echoes of gladiators. The Vatican left me speechless with its art, especially the Sistine Chapel’s ceiling—a masterpiece beyond words. ', '2024-02-12 08:00:00', '2024-02-16 20:00:00'),
(5, 1, 'Cambridge', 'United Kingdom', 'Cambridge was a step into another world, where history and academia intertwine in the most charming way. I spent hours wandering along the cobbled streets, admiring the grand college buildings that seem straight out of a fairy tale. Punting on the River Cam was a highlight, offering a serene view of the beautiful bridges and college backs. ', '2024-04-20 09:30:00', '2024-04-25 18:00:00'),
(6, 1, 'Istanbul', 'Turkey', 'Istanbul was a mesmerizing blend of East and West that left me enchanted. My mornings began with the hauntingly beautiful call to prayer, echoing through the city as I sipped Turkish tea by the Bosphorus. The Blue Mosque’s grandeur took my breath away, and I found peace in its serene courtyard. Crossing the Galata Bridge, I felt the pulse of the city—fishermen casting lines, bustling markets, and the distant hum of traffic.', '2024-08-01 10:00:00', '2024-08-05 19:00:00'),
-- Trips for Rosalind Franklin (userID 2)
(20, 2, 'New York', 'United States', 'Gave a keynote speech at a molecular biology conference.', '2024-02-12 08:00:00', '2024-02-16 20:00:00'),
(21, 2, 'Cambridge', 'United Kingdom', 'Collaborated on DNA research.', '2024-04-20 09:30:00', '2024-04-25 18:00:00'),
(22, 2, 'Zurich', 'Switzerland', 'Attended an international symposium on crystallography.', '2024-08-01 10:00:00', '2024-08-05 19:00:00'),

-- Trips for Lise Meitner (userID 3)
(7, 3, 'Berlin', 'Germany', 'Visited the Institute for Nuclear Physics.', '2024-01-22 09:00:00', '2024-01-27 18:00:00'),
(8, 3, 'Stockholm', 'Sweden', 'Received an honorary doctorate.', '2024-03-15 12:00:00', '2024-03-20 15:00:00'),
(9, 3, 'Vienna', 'Austria', 'Presented research on nuclear fission.', '2024-05-10 09:00:00', '2024-05-14 16:00:00'),

-- Trips for Victoria Test
(10, 4,	'Tokyo', 'Japan',	'Immersing myself in the unique blend of tradition and modernity, from ancient temples to futuristic districts.', '2024-06-15 00:00:00', '2024-08-22 00:00:00'),
(11, 4, 'Reykjavik', 'Iceland', 'Experiencing the magic of the Northern Lights, soaking in hot springs, and exploring stunning volcanic landscapes.', '2024-07-19 00:00:00', '2024-08-01 00:00:00'),
(12, 4, 'Sydney', 'Australia', 'Soaking up the sun on Bondi Beach, followed by a harbor cruise and indulging in fresh seafood along the coastline.', '2024-01-12 00:00:00', '2024-10-19 00:00:00'),
(13, 4, 'Rio de Janeiro', 'Brazil', 'Enjoying the vibrant culture of Carnival, lounging on Copacabana Beach, and taking in the stunning views from Sugarloaf Mountain.', '2024-03-10 00:00:00', '2024-08-29 00:00:00'),
(14, 4, 'Bilbao', 'Spain', 'Exploring the rich Basque culture, visiting the iconic Guggenheim Museum, and enjoying pintxos in the old town.', '2024-08-01 00:00:00', '2024-09-07 00:00:00'),
(15, 4, 'Vancuver', 'Canada', 'Exploring the breathtaking landscapes of the Pacific Northwest, with hikes in the mountains and visits to vibrant local markets.', '2024-07-01 00:00:00', '2024-10-07 00:00:00'),
-- Trips for Lily
(16, 5, 'Marrakech', 'Morocco', 'Exploring the vibrant souks, tasting exotic spices, and experiencing the rich history of this ancient city.', '2024-09-10 00:00:00', '2024-09-20 00:00:00'),
(17, 5, 'Cairo', 'Egypt', 'Standing in awe of the Pyramids of Giza, cruising the Nile, and discovering ancient Egyptian history.', '2024-10-01 00:00:00', '2024-10-15 00:00:00'),
(18, 5, 'Kyoto', 'Japan', 'Wandering through serene temples, admiring the beauty of cherry blossoms, and soaking in traditional hot springs.', '2024-11-05 00:00:00', '2024-11-20 00:00:00'),
(19, 5, 'Lisbon', 'Portugal', 'Enjoying the picturesque views from Alfama, tasting delicious pastel de nata, and listening to fado music.', '2024-12-01 00:00:00', '2024-12-10 00:00:00'),
(23, 5, 'Cape Town', 'South Africa', 'Experiencing the stunning views from Table Mountain, exploring vibrant neighborhoods, and enjoying local wines.', '2024-11-25 00:00:00', '2024-12-05 00:00:00'),
(24, 5, 'Queenstown', 'New Zealand', 'Thrilling adventure sports in the adventure capital of the world, surrounded by breathtaking landscapes.', '2024-12-15 00:00:00', '2024-12-30 00:00:00'),
(25, 5, 'Santorini', 'Greece', 'Admiring the iconic white-washed buildings, enjoying stunning sunsets over the caldera, and indulging in Mediterranean cuisine.', '2024-09-25 00:00:00', '2024-10-05 00:00:00'),
(26, 5, 'Reykjavik', 'Iceland', 'Chasing the Northern Lights, exploring volcanic landscapes, and relaxing in geothermal hot springs.', '2024-10-20 00:00:00', '2024-10-30 00:00:00'),
(27, 5, 'Rome', 'Italy', 'Walking through ancient history at the Colosseum, marveling at Renaissance art in Vatican City, and savoring authentic Italian gelato.', '2024-11-10 00:00:00', '2024-11-20 00:00:00'),
(28, 5, 'Hanoi', 'Vietnam', 'Exploring the bustling streets of the Old Quarter, tasting pho and banh mi, and cruising through Ha Long Bay.', '2024-11-25 00:00:00', '2024-12-05 00:00:00'),
(29, 5, 'Sydney', 'Australia', 'Visiting the iconic Sydney Opera House, relaxing on Bondi Beach, and taking in the views from the Sydney Harbour Bridge.', '2024-12-10 00:00:00', '2024-12-20 00:00:00'),
(30, 5, 'Machu Picchu', 'Peru', 'Trekking through the Andes to reach the ancient Inca citadel, discovering the Sacred Valley, and exploring Cusco.', '2024-12-25 00:00:00', '2025-01-05 00:00:00'),
(31, 5, 'Buenos Aires', 'Argentina', 'Dancing the tango, exploring vibrant neighborhoods like La Boca, and enjoying a traditional Argentine asado.', '2025-01-10 00:00:00', '2025-01-20 00:00:00'),
(32, 5, 'Istanbul', 'Turkey', 'Experiencing the crossroads of East and West, visiting the Blue Mosque, and shopping in the Grand Bazaar.', '2025-02-01 00:00:00', '2025-02-10 00:00:00'),
(33, 5, 'Petra', 'Jordan', 'Walking through the ancient rock-carved city, exploring the Treasury, and hiking to the Monastery.', '2025-02-15 00:00:00', '2025-02-25 00:00:00'),
(34, 5, 'Banff', 'Canada', 'Exploring the stunning Canadian Rockies, hiking through Banff National Park, and relaxing in natural hot springs.', '2025-03-05 00:00:00', '2025-03-15 00:00:00'),
(35, 5, 'Barcelona', 'Spain', 'Marveling at Gaudi’s architecture, strolling along La Rambla, and enjoying tapas and sangria.', '2025-03-20 00:00:00', '2025-03-30 00:00:00'),
(36, 5, 'Dubai', 'United Arab Emirates', 'Experiencing modern luxury, visiting the Burj Khalifa, and exploring the vast desert landscape.', '2025-04-05 00:00:00', '2025-04-15 00:00:00'),
(37, 5, 'Moscow', 'Russia', 'Exploring the Red Square, visiting the Kremlin, and experiencing the culture of this historic city.', '2025-04-20 00:00:00', '2025-04-30 00:00:00'),
(38, 5, 'Bali', 'Indonesia', 'Relaxing on beautiful beaches, visiting ancient temples, and immersing in the island’s rich culture.', '2025-05-05 00:00:00', '2025-05-15 00:00:00'),
(39, 5, 'Edinburgh', 'Scotland', 'Exploring historic castles, strolling through the medieval Old Town, and experiencing the local whisky culture.', '2025-05-20 00:00:00', '2025-05-30 00:00:00'),
(40, 5, 'Bruges', 'Belgium', 'Wandering through cobblestone streets, exploring medieval architecture, taking a canal boat tour, and savoring Belgian chocolates and waffles.', '2024-09-25 00:00:00', '2024-10-05 00:00:00'),
(41, 5, 'Berlin', 'Germany', 'Exploring the Berlin Wall, visiting the Brandenburg Gate, and experiencing the vibrant culture of the city.', '2025-06-01 00:00:00', '2025-06-10 00:00:00'),
(42, 5, 'Paris', 'France', 'Visiting the Eiffel Tower, exploring the Louvre, and enjoying the romantic atmosphere of the city.', '2025-06-15 00:00:00', '2025-06-25 00:00:00'),
(43, 5, 'Copenhagen', 'Denmark', 'Exploring the historic Nyhavn, visiting Tivoli Gardens, and enjoying the city’s charming canals.', '2025-07-01 00:00:00', '2025-07-10 00:00:00'),
(44, 5, 'Budapest', 'Hungary', 'Strolling along the Danube River, visiting Buda Castle, and enjoying the city’s famous thermal baths.', '2025-07-15 00:00:00', '2025-07-25 00:00:00'),
(45, 5, 'Oslo', 'Norway', 'Exploring the Viking Ship Museum, visiting the Opera House, and enjoying the beautiful fjords.', '2025-08-01 00:00:00', '2025-08-10 00:00:00'),
(46, 5, 'Warsaw', 'Poland', 'Visiting the Royal Castle, exploring the historic Old Town, and learning about the city’s rich history.', '2025-08-15 00:00:00', '2025-08-25 00:00:00'),
(47, 5, 'London', 'United Kingdom', 'Exploring the British Museum, visiting Buckingham Palace, and enjoying the city’s iconic landmarks.', '2025-09-01 00:00:00', '2025-09-10 00:00:00'),
(48, 5, 'Dublin', 'Ireland', 'Visiting the Guinness Storehouse, exploring Trinity College, and enjoying the lively atmosphere of Temple Bar.', '2025-09-15 00:00:00', '2025-09-25 00:00:00');

INSERT INTO Photos (photoID, tripID, userID, secure_url, alt_text )
VALUES 
-- Photos for userID=4 // tripID= 10, 11, 13, 14, 15
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
(15, 14, 4, 'https://res.cloudinary.com/cfgvicteam5/image/upload/v1723900905/nwikftoiyd8fqudgr22u.png', NULL),
(16, 15, 4, 'https://res.cloudinary.com/cfgvicteam5/image/upload/v1723902764/rzmzljarevcl7xtlo0sz.jpg', NULL),
(17, 15, 4, 'https://res.cloudinary.com/cfgvicteam5/image/upload/v1723902764/sjcgq1ogr1sjtk73fapk.jpg', NULL),
(18, 15, 4, 'https://res.cloudinary.com/cfgvicteam5/image/upload/v1723902764/yedhvmb3houezptoojs8.jpg', NULL);


INSERT INTO Photos (photoID, tripID, userID, secure_url, alt_text)
VALUES 
-- Photos for Ada Lovelace's trips
(19, 1, 1, 'https://res.cloudinary.com/danpcw54r/image/upload/v1723825894/samples/man-on-a-street.jpg', NULL),
(20, 1, 1, 'https://res.cloudinary.com/danpcw54r/image/upload/v1723825887/samples/landscapes/nature-mountains.jpg', NULL),
(21, 2, 1, 'https://res.cloudinary.com/danpcw54r/image/upload/v1723825887/samples/people/bicycle.jpg', NULL),
(22, 2, 1, 'https://res.cloudinary.com/danpcw54r/image/upload/v1723825886/samples/landscapes/architecture-signs.jpg', NULL),
(23, 2, 1, 'https://res.cloudinary.com/danpcw54r/image/upload/v1723825885/samples/sheep.jpg', NULL),
(24, 2, 1, 'https://res.cloudinary.com/danpcw54r/image/upload/v1723825886/samples/landscapes/girl-urban-view.jpg', NULL),
(25, 3, 1, 'https://res.cloudinary.com/danpcw54r/image/upload/v1723910781/pexels-abdel-rahman-abu-baker-958112-1963081_skytxw.jpg', NULL),
(26, 3, 1, 'https://res.cloudinary.com/danpcw54r/image/upload/v1723825895/cld-sample-3.jpg', NULL),
(27, 3, 1, 'https://res.cloudinary.com/danpcw54r/image/upload/v1723910803/pexels-lichtberlin-19166326_wl2ltx.jpg', NULL),
(28, 4, 1, 'https://res.cloudinary.com/danpcw54r/image/upload/v1723825885/samples/people/kitchen-bar.jpg', NULL),
(29, 4, 1, 'https://res.cloudinary.com/danpcw54r/image/upload/v1723825885/samples/people/kitchen-bar.jpg', NULL),
(30, 5, 1, 'https://res.cloudinary.com/danpcw54r/image/upload/v1723825895/cld-sample.jpg', NULL),
(31, 6, 1, 'https://res.cloudinary.com/danpcw54r/image/upload/v1723825895/cld-sample-3.jpg', NULL),
(32, 6, 1, 'https://res.cloudinary.com/danpcw54r/image/upload/v1723910803/pexels-lichtberlin-19166326_wl2ltx.jpg', NULL),

-- Lily's account
(33, 16, 5, 'https://res.cloudinary.com/dskoouoik/image/upload/v1724400182/Screenshot_2024-08-23_at_09.02.58_gerjn5.png', NULL),
(34, 16, 5, 'https://res.cloudinary.com/dskoouoik/image/upload/v1724400195/Screenshot_2024-08-23_at_09.03.11_uytua0.png', NULL),
(35, 17, 5, 'https://res.cloudinary.com/dskoouoik/image/upload/v1724400243/Screenshot_2024-08-23_at_09.03.59_ifrbfo.png', NULL),
(36, 17, 5, 'https://res.cloudinary.com/dskoouoik/image/upload/v1724400278/Screenshot_2024-08-23_at_09.04.34_xlaesg.png', NULL),
(37, 18, 5, '', NULL),
(38, 18, 5, '', NULL),
(39, 19, 5, '', NULL),
(40, 19, 5, '', NULL),
(41, 23, 5, '', NULL),
(42, 23, 5, '', NULL),
(43, 24, 5, '', NULL),
(44, 24, 5, '', NULL),
(45, 25, 5, '', NULL),
(46, 25, 5, '', NULL),
(47, 26, 5, '', NULL),
(48, 26, 5, '', NULL),
(49, 27, 5, '', NULL),
(50, 27, 5, '', NULL),
(51, 28, 5, '', NULL),
(52, 28, 5, '', NULL),
(53, 29, 5, 'https://res.cloudinary.com/dskoouoik/image/upload/v1724397783/Screenshot_2024-08-23_at_08.22.58_zt82rv.png', NULL),
(54, 29, 5, 'https://res.cloudinary.com/dskoouoik/image/upload/v1724400118/Screenshot_2024-08-23_at_09.01.51_ybuxn2.png', NULL),
(55, 30, 5, '', NULL),
(56, 30, 5, '', NULL),
(57, 31, 5, '', NULL),
(58, 31, 5, '', NULL),
(59, 32, 5, '', NULL),
(60, 32, 5, '', NULL),
(61, 33, 5, '', NULL),
(62, 33, 5, '', NULL),
(63, 34, 5, '', NULL),
(64, 34, 5, '', NULL),
(65, 35, 5, '', NULL),
(66, 35, 5, '', NULL),
(67, 36, 5, '', NULL),
(68, 36, 5, '', NULL),
(69, 37, 5, '', NULL),
(70, 37, 5, '', NULL),
(71, 38, 5, '', NULL),
(72, 38, 5, '', NULL),
(73, 39, 5, '', NULL),
(74, 39, 5, '', NULL),
(75, 40, 5, '', NULL),
(76, 40, 5, '', NULL),
(77, 41, 5, '', NULL),
(78, 41, 5, '', NULL),
(79, 42, 5, '', NULL),
(80, 42, 5, '', NULL),
(81, 43, 5, '', NULL),
(82, 43, 5, '', NULL),
(83, 44, 5, '', NULL),
(84, 44, 5, '', NULL),
(85, 45, 5, '', NULL),
(86, 45, 5, '', NULL),
(87, 46, 5, '', NULL),
(88, 46, 5, '', NULL),
(89, 47, 5, '', NULL),
(90, 47, 5, '', NULL),
(91, 48, 5, '', NULL),
(92, 48, 5, '', NULL);
-- SELECT * FROM Photos;
-- DELETE FROM Photos;

SELECT * FROM trips;
-- For testing purposes 
-- select * from Users;
-- SET SQL_SAFE_UPDATES = 0;
-- DELETE FROM Users WHERE username='Jsmith';

-- Adding in latitude and longitude for maps page
INSERT INTO Locations (name, latitude, longitude)
VALUES
('Lisbon', 38.716891, -9.139883),
('Madrid', 40.416775, -3.703790),
('Berlin', 52.520008, 13.404954),
('Rome', 41.902782, 12.496366),
('Cambridge', 52.205337, 0.121817),
('Istanbul', 41.008240, 28.978359),
('New York', 40.712776, -74.005974),
('Zurich', 47.376887, 8.541694),
('Stockholm', 59.329323, 18.068581),
('Vienna', 48.210033, 16.363449),
('Tokyo', 35.689487, 139.691711),
('Reykjavik', 64.135483, -21.895414),
('Sydney', -33.868820, 151.209290),
('Rio de Janeiro', -22.906847, -43.172897),
('Bilbao', 43.263012, -2.934985),
('Vancouver', 49.282729, -123.120738),
('Marrakech', 31.629472, -7.981084),
('Cairo', 30.044420, 31.235712),
('Kyoto', 35.011636, 135.768029),
('Cape Town', -33.924870, 18.424055),
('Queenstown', -45.031162, 168.662643),
('Hanoi', 21.028511, 105.804817),
('Machu Picchu', -13.163068, -72.545128),
('Buenos Aires', -34.603722, -58.381592),
('Petra', 30.328459, 35.444363),
('Banff', 51.178364, -115.570769),
('Barcelona', 41.385064, 2.173404),
('Dubai', 25.276987, 55.296249),
('Moscow', 55.755825, 37.617298),
('Bali', -8.409518, 115.188919),
('Edinburgh', 55.953251, -3.188267),
('Santorini', 36.393156, 25.461509),
('Paris', 48.856613, 2.352222),
('Copenhagen', 55.676098, 12.568337),
('Budapest', 47.497913, 19.040236),
('Oslo', 59.913868, 10.752245),
('Warsaw', 52.229676, 21.012229),
('London', 51.507351, -0.127758),
('Dublin', 53.349805, -6.26031),
('Bruges', 51.209348, 3.224700);

INSERT INTO Trip_Location (tripID, locationID)
VALUES
-- For Ada Lovelace
(1, (SELECT locationID FROM Locations WHERE name = 'Lisbon')),
(2, (SELECT locationID FROM Locations WHERE name = 'Madrid')),
(3, (SELECT locationID FROM Locations WHERE name = 'Berlin')),
(4, (SELECT locationID FROM Locations WHERE name = 'Rome')),
(5, (SELECT locationID FROM Locations WHERE name = 'Cambridge')),
(6, (SELECT locationID FROM Locations WHERE name = 'Istanbul')),

-- For Rosalind Franklin
(20, (SELECT locationID FROM Locations WHERE name = 'New York')),
(21, (SELECT locationID FROM Locations WHERE name = 'Cambridge')),
(22, (SELECT locationID FROM Locations WHERE name = 'Zurich')),

-- For Lise Meitner
(7, (SELECT locationID FROM Locations WHERE name = 'Berlin')),
(8, (SELECT locationID FROM Locations WHERE name = 'Stockholm')),
(9, (SELECT locationID FROM Locations WHERE name = 'Vienna')),


-- For Victoria Test
(10, (SELECT locationID FROM Locations WHERE name = 'Tokyo')),
(11, (SELECT locationID FROM Locations WHERE name = 'Reykjavik')),
(12, (SELECT locationID FROM Locations WHERE name = 'Sydney')),
(13, (SELECT locationID FROM Locations WHERE name = 'Rio de Janeiro')),
(14, (SELECT locationID FROM Locations WHERE name = 'Bilbao')),
(15, (SELECT locationID FROM Locations WHERE name = 'Vancouver')),

-- For Lily's test
(16, (SELECT locationID FROM Locations WHERE name = 'Marrakech')), 
(17, (SELECT locationID FROM Locations WHERE name = 'Cairo')), 
(18, (SELECT locationID FROM Locations WHERE name = 'Kyoto')), 
(19, (SELECT locationID FROM Locations WHERE name = 'Lisbon')), 
(23, (SELECT locationID FROM Locations WHERE name = 'Cape Town')),
(24, (SELECT locationID FROM Locations WHERE name = 'Queenstown')),
(25, (SELECT locationID FROM Locations WHERE name = 'Santorini')), 
(26, (SELECT locationID FROM Locations WHERE name = 'Reykjavik')), 
(27, (SELECT locationID FROM Locations WHERE name = 'Rome')), 
(28, (SELECT locationID FROM Locations WHERE name = 'Hanoi')), 
(29, (SELECT locationID FROM Locations WHERE name = 'Sydney')), 
(30, (SELECT locationID FROM Locations WHERE name = 'Machu Picchu')), 
(31, (SELECT locationID FROM Locations WHERE name = 'Buenos Aires')), 
(32, (SELECT locationID FROM Locations WHERE name = 'Istanbul')), 
(33, (SELECT locationID FROM Locations WHERE name = 'Petra')), 
(34, (SELECT locationID FROM Locations WHERE name = 'Banff')), 
(35, (SELECT locationID FROM Locations WHERE name = 'Barcelona')), 
(36, (SELECT locationID FROM Locations WHERE name = 'Dubai')), 
(37, (SELECT locationID FROM Locations WHERE name = 'Moscow')), 
(38, (SELECT locationID FROM Locations WHERE name = 'Bali')), 
(39, (SELECT locationID FROM Locations WHERE name = 'Edinburgh')),
(40, (SELECT locationID FROM Locations WHERE name = 'Bruges')), 
(41, (SELECT locationID FROM Locations WHERE name = 'Berlin')), 
(42, (SELECT locationID FROM Locations WHERE name = 'Paris')), 
(43, (SELECT locationID FROM Locations WHERE name = 'Copenhagen')), 
(44, (SELECT locationID FROM Locations WHERE name = 'Budapest')), 
(45, (SELECT locationID FROM Locations WHERE name = 'Oslo')), 
(46, (SELECT locationID FROM Locations WHERE name = 'Warsaw')), 
(47, (SELECT locationID FROM Locations WHERE name = 'London')), 
(48, (SELECT locationID FROM Locations WHERE name = 'Dublin'));