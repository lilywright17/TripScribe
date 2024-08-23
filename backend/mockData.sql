USE tripscribeDB;

-- SQL script with mock data for the Users and Trips table
INSERT INTO Users (userID, fullname, username, email, pword_hash)
VALUES 
(1, 'Ada Lovelace', 'adalovelace', 'ada.lovelace@gmail.com', '$2b$10$A/FfTkuxVxuuzobymwpNCOzDLsctzpX3HN0KSmlOFKgjmF5YoLp9W'),
(2, 'Rosalind Franklin', 'rosalindf', 'rosalind.franklin@gmail.com', '$2b$10$6sub3KkksQrBdy2VjpBTF.qK6F8XzsEhpqxXCV4kno.3s0L1To02W'),
(3, 'Lise Meitner', 'lisemeitner', 'lise.meitner@gmail.com', '$2y$10$T9zXnRZb.xS4G6HGi21O6ujm8IaUM5K4/1T/QF2bqW1aUIRbMqTAJ'),
(4,	'Carmen Sandiego', 'carmenJK0101', 'carmen.sandiegoJK@gmail.com', '$2b$10$URSNfNyaCimQwnNssm65MuXDeNbyd74XoG4HW6sqN3SIC9VIeOrQC'),
(5, 'Lily', 'lily93', 'lilywright93@gmail.com', '$2b$10$Qw859hFvbPC0fUCKeYWxFu/giGrgJIItxZAXX.GMzzOAbZgrd5oYq');

INSERT INTO Trips (tripID, userID, city, country, description, date_from, date_to)
VALUES 
-- Trips for Ada Lovelace (userID 1)
(1, 1, 'Lisbon', 'Spain', 'Lisbon was a city that instantly felt like home. I loved getting lost in the narrow, winding streets of Alfama, where every corner revealed a new story. Riding the yellow trams was a delight, offering glimpses of the city’s beautiful hills and the shimmering Tagus River. The Jerónimos Monastery was a highlight, its intricate details leaving me speechless. The city’s viewpoints, or “miradouros,” offered stunning panoramas that made me fall in love with Lisbon all over again.', '2024-01-15 09:00:00', '2024-01-20 17:00:00'),
(2, 1, 'Madrid', 'Spain', 'My trip to Madrid was a whirlwind of culture and excitement. I started at the Royal Palace, where the grandeur of Spanish history unfolded before my eyes. The Prado Museum was next, with its breathtaking art collection that left me in awe. Evenings were spent in bustling plazas, indulging in tapas and soaking up the vibrant atmosphere. Madrid energy is contagious, and I found myself lost in its rhythm, from peaceful moments in Retiro Park to late-night conversations over sangria. Madrid felt like the perfect blend of tradition and modern life.', '2024-03-05 10:00:00', '2024-03-07 17:00:00'),
(3, 1, 'Berlin', 'Germany', 'Berlin was unlike any place I’ve ever been. The city’s history is palpable; standing before the Brandenburg Gate, I could feel the weight of its past. Visiting the Berlin Wall Memorial was deeply moving, reminding me of the city’s resilience and transformation. Yet, Berlin is also a hub of creativity and innovation. I wandered through eclectic neighborhoods, explored contemporary art galleries, and enjoyed the city’s vibrant street art scene. Berlin’s unique blend of old and new, along with its unpretentious charm, made it a place I won’t soon forget.', '2024-06-10 14:00:00', '2024-06-15 12:00:00'),
(4, 1, 'Rome', 'Italy', 'Rome felt like walking through a living museum, every corner revealing a new piece of history. I started my days with a strong espresso before diving into ancient wonders like the Colosseum and the Roman Forum, where I could almost hear the echoes of gladiators. The Vatican left me speechless with its art, especially the Sistine Chapel’s ceiling—a masterpiece beyond words. I spent lazy afternoons in charming piazzas, tossing coins into the Trevi Fountain and indulging in creamy gelato. Rome’s energy is eternal, from the chaotic traffic to the quiet reverence of its many churches. It’s a city that captured my heart with its timeless beauty.', '2024-02-12 08:00:00', '2024-02-16 20:00:00'),
(5, 1, 'Cambridge', 'United Kingdom', 'Cambridge was a step into another world, where history and academia intertwine in the most charming way. I spent hours wandering along the cobbled streets, admiring the grand college buildings that seem straight out of a fairy tale. Punting on the River Cam was a highlight, offering a serene view of the beautiful bridges and college backs. Each college seemed to hold centuries of stories, and I could almost feel the presence of past scholars. Afternoons were spent in cozy tea rooms, where I reflected on the day’s discoveries. Cambridge’s calm and scholarly atmosphere made me feel like I was part of something much bigger—a connection to centuries of learning and tradition.', '2024-04-20 09:30:00', '2024-04-25 18:00:00'),
(6, 1, 'Istanbul', 'Turkey', 'Istanbul was a mesmerizing blend of East and West that left me enchanted. My mornings began with the hauntingly beautiful call to prayer, echoing through the city as I sipped Turkish tea by the Bosphorus. The Blue Mosque’s grandeur took my breath away, and I found peace in its serene courtyard. Crossing the Galata Bridge, I felt the pulse of the city—fishermen casting lines, bustling markets, and the distant hum of traffic. The spice bazaar overwhelmed my senses with its vibrant colors and scents. Istanbul’s history is rich, but it’s the warmth of its people that truly made me feel at home.', '2024-08-01 10:00:00', '2024-08-05 19:00:00'),
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
(28, 4, 'Viena', 'Austria', 'Vienna, exudes charm with its grand palaces, historic squares, and vibrant cultural scene. The majestic Schönbrunn Palace and the opulent Hofburg reflect its royal past, while the Vienna State Opera and Musikverein celebrate its musical heritage. Stroll through the elegant streets of the Ringstrasse, savor coffee and pastries in traditional cafes, and explore the artistic treasures of the Belvedere and Kunsthistorisches Museum.' , '2024-04-01 00:00:00', '2024-10-07 00:00:00'),
(29, 4, 'Yorkshire', 'England', 'Explore Yorkshire, where history and nature converge in stunning harmony. Start in York, with its medieval streets and the majestic York Minster. Wander the picturesque Shambles and ancient city walls. Venture into the Yorkshire Dales for breathtaking landscapes, with rolling hills and waterfalls like Aysgarth Falls. Yorkshire offers a perfect blend of culture, history, and natural beauty.', '2024-07-01 00:00:00', '2024-10-07 00:00:00'),
(30, 4, 'Saint-Tropez', 'France', 'Arriving in Saint-Tropez, the allure of the French Riviera instantly captivates. The vibrant marina, lined with luxurious yachts and pastel-hued buildings, sets the scene for a perfect getaway. Wandering through the cobblestone streets of La Ponche, the historic heart of the town, reveals charming boutiques and cafes. The sun-drenched beaches, particularly Pampelonne, offer a serene escape, while the lively market at Place des Lices brims with local flavors and artisanal treasures', '2024-05-01 00:00:00', '2024-05-07 00:00:00'),
(31, 4, 'Cologne', 'Germany', 'Arriving in Cologne, the majestic spires of the Cologne Cathedral dominate the skyline, welcoming us to this historic city. Strolling along the Rhine River, we take in the blend of medieval charm and modern vibrancy. The Altstadt, with its narrow, cobbled streets and colorful houses, invites exploration. We pause at a local café to enjoy a Kölsch beer, immersing ourselves in the lively atmosphere. The city’s rich history and warm, welcoming vibe make Cologne an unforgettable experience.', '2024-02-01 00:00:00', '2024-05-07 00:00:00'),
(32, 4, 'London', 'England', 'Arriving in London, iconic landmarks greet us at every turn—Big Ben, the Tower Bridge, and the London Eye standing tall against the skyline. Walking through the bustling streets of Covent Garden and along the Thames, the blend of historic grandeur and modern energy is palpable. We explore the charm of Westminster, the art at the Tate Modern, and indulge in afternoon tea. Vibrant culture, rich history, and dynamic atmosphere make it an exhilarating experience', '2024-07-01 00:00:00', '2024-10-07 00:00:00'),
(33, 4, 'Lyon', 'France', 'Arriving in Lyon, Renaissance charm and modern vibrancy is immediately captivating. We wander through the traboules of Vieux Lyon, discovering hidden passageways and historic architecture. The view from Fourvière Hill offers a stunning panorama of the city. We indulge in the culinary delights of the famous bouchons, savoring rich gastronomic heritage. With its beautiful riverfronts, lively markets, and cultural richness, Lyon leaves a lasting impression.', '2024-04-01 00:00:00', '2024-09-07 00:00:00'),
(35, 4, 'Madrid', 'Spain', 'Arriving in Madrid lively energy is instantly felt. We stroll through the grand avenues, where historic architecture meets modern vibrancy. The Plaza Mayor buzzes with life, while the Royal Palace impresses with its opulence. We explore the artistic treasures of the Prado Museum and relax in the serene Retiro Park. As night falls, tapas bars come alive, offering a taste of rich culinary scene.', '2024-07-01 00:00:00', '2024-10-07 00:00:00'),


-- Trips for Lily testing map page
(16, 5, 'Marrakech', 'Morocco', 'Exploring the vibrant souks, tasting exotic spices, and experiencing the rich history of this ancient city.', '2024-09-10 00:00:00', '2024-09-20 00:00:00'),
(17, 5, 'Cairo', 'Egypt', 'Standing in awe of the Pyramids of Giza, cruising the Nile, and discovering ancient Egyptian history.', '2024-10-01 00:00:00', '2024-10-15 00:00:00'),
(18, 5, 'Kyoto', 'Japan', 'Wandering through serene temples, admiring the beauty of cherry blossoms, and soaking in traditional hot springs.', '2024-11-05 00:00:00', '2024-11-20 00:00:00'),
(19, 5, 'Lisbon', 'Portugal', 'Enjoying the picturesque views from Alfama, tasting delicious pastel de nata, and listening to fado music.', '2024-12-01 00:00:00', '2024-12-10 00:00:00'),
(23, 5, 'Cape Town', 'South Africa', 'Experiencing the stunning views from Table Mountain, exploring vibrant neighborhoods, and enjoying local wines.', '2024-11-25 00:00:00', '2024-12-05 00:00:00'),
(24, 5, 'Queenstown', 'New Zealand', 'Thrilling adventure sports in the adventure capital of the world, surrounded by breathtaking landscapes.', '2024-12-15 00:00:00', '2024-12-30 00:00:00');


INSERT INTO Photos (photoID, tripID, userID, secure_url, alt_text )
VALUES 
-- Photos for userID=4 Carmen Sandiego // tripID= 10,11,13,14,15,28,29,30,31,32,33,35
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
(18, 15, 4, 'https://res.cloudinary.com/cfgvicteam5/image/upload/v1723902764/yedhvmb3houezptoojs8.jpg', NULL), 
(43, 28, 4, 'https://res.cloudinary.com/cfgvicteam5/image/upload/v1724358389/kxyf79poyzknqml0bt8r.jpg', NULL),
(44, 28, 4, 'https://res.cloudinary.com/cfgvicteam5/image/upload/v1724358389/hexkmk5rufwodll5hf8a.jpg', NULL),
(45, 28, 4, 'https://res.cloudinary.com/cfgvicteam5/image/upload/v1724358389/idfgm7p5k02yc639exwp.jpg', NULL),
(46, 28, 4, 'https://res.cloudinary.com/cfgvicteam5/image/upload/v1724358389/fogttznokpi1ljg3zqgq.jpg', NULL),
(47, 29, 4, 'https://res.cloudinary.com/cfgvicteam5/image/upload/v1724359147/uw6a3idggbihh9pk3q2m.jpg', NULL),
(48, 29, 4, 'https://res.cloudinary.com/cfgvicteam5/image/upload/v1724359146/svnrecdf2afzyujds9cq.jpg', NULL),
(49, 29, 4, 'https://res.cloudinary.com/cfgvicteam5/image/upload/v1724359146/cecpoeefncppx6lgxdwy.jpg', NULL),
(50, 29, 4, 'https://res.cloudinary.com/cfgvicteam5/image/upload/v1724359146/ouucniqt9nulmtoxonli.jpg', NULL),
(51, 30, 4, 'https://res.cloudinary.com/cfgvicteam5/image/upload/v1724359523/qmtdakcutez0lznkgaa5.jpg', NULL),
(52, 30, 4, 'https://res.cloudinary.com/cfgvicteam5/image/upload/v1724359530/rxdqqjeqi9yjfp45yopp.jpg', NULL),
(53, 30, 4, 'https://res.cloudinary.com/cfgvicteam5/image/upload/v1724359519/ylvjfkkgdrdmxq5vfbyr.jpg', NULL),
(54, 30, 4, 'https://res.cloudinary.com/cfgvicteam5/image/upload/v1724359518/adiarvj51byc3ixs8vxu.jpg', NULL),
(55, 31, 4, 'https://res.cloudinary.com/cfgvicteam5/image/upload/v1724401940/oci9lx9uadjdwv03chzr.jpg', NULL),
(56, 31, 4, 'https://res.cloudinary.com/cfgvicteam5/image/upload/v1724401940/llxyfmy9pcepyeovdwdm.jpg', NULL),
(57, 31, 4, 'https://res.cloudinary.com/cfgvicteam5/image/upload/v1724401940/xy3trwuwob2zhp8nb2cp.jpg', NULL),
(58, 31, 4, 'https://res.cloudinary.com/cfgvicteam5/image/upload/v1724401940/utfspcy1eyu8yeppwyu9.jpg', NULL),
(59, 32, 4, 'https://res.cloudinary.com/cfgvicteam5/image/upload/v1724402296/muejssv6szoez9j4phay.jpg', NULL),
(60, 32, 4, 'https://res.cloudinary.com/cfgvicteam5/image/upload/v1724402296/hjb3c7rakn0ftnjcinpv.jpg', NULL),
(61, 32, 4, 'https://res.cloudinary.com/cfgvicteam5/image/upload/v1724402296/eavwkrbcdyt1zxbdilyt.jpg', NULL),
(62, 32, 4, 'https://res.cloudinary.com/cfgvicteam5/image/upload/v1724402296/kuazjb0jad6dji3yuytf.jpg', NULL),
(63, 33, 4, 'https://res.cloudinary.com/cfgvicteam5/image/upload/v1724403142/qkxwtoimeu4shldtqfnp.jpg', NULL),
(64, 33, 4, 'https://res.cloudinary.com/cfgvicteam5/image/upload/v1724403143/ti3ifjfxqkjthkxnkowq.jpg', NULL),
(65, 33, 4, 'https://res.cloudinary.com/cfgvicteam5/image/upload/v1724403142/efdqyxmvi37wyvlyd6tr.jpg', NULL),
(66, 33, 4, 'https://res.cloudinary.com/cfgvicteam5/image/upload/v1724403142/jigei6skkm5dvqclabdr.jpg', NULL),
(70, 35, 4, 'https://res.cloudinary.com/cfgvicteam5/image/upload/v1724404556/jiisxigq8ovsaagfzcpi.jpg', NULL),
(71, 35, 4, 'https://res.cloudinary.com/cfgvicteam5/image/upload/v1724404556/vicfumjhvb2dzexqbll7.jpg', NULL),
(72, 35, 4, 'https://res.cloudinary.com/cfgvicteam5/image/upload/v1724404556/w5z6jmlanpma5u41bpap.jpg', NULL),
(73, 35, 4, 'https://res.cloudinary.com/cfgvicteam5/image/upload/v1724404556/hbpcz79dpw3lhlqwokbo.jpg', NULL);


INSERT INTO Photos (photoID, tripID, userID, secure_url, alt_text)
VALUES 
-- Photos for Ada Lovelace's trips
(19, 1, 1, 'https://res.cloudinary.com/danpcw54r/image/upload/v1723825894/samples/man-on-a-street.jpg', NULL),
(20, 1, 1, 'https://res.cloudinary.com/danpcw54r/image/upload/v1723825887/samples/landscapes/nature-mountains.jpg', NULL),
(21, 2, 1, 'https://res.cloudinary.com/danpcw54r/image/upload/v1723825887/samples/people/bicycle.jpg', NULL),
(22, 2, 1, 'https://res.cloudinary.com/danpcw54r/image/upload/v1723825886/samples/landscapes/architecture-signs.jpg', NULL),
(23, 2, 1, 'https://res.cloudinary.com/danpcw54r/image/upload/v1723825885/samples/sheep.jpg', NULL),
(24, 2, 1, 'https://res.cloudinary.com/danpcw54r/image/upload/v1723825886/samples/landscapes/girl-urban-view.jpg', NULL),
(25, 2, 1, 'https://res.cloudinary.com/danpcw54r/image/upload/v1723825885/samples/people/kitchen-bar.jpg', NULL),
(26, 3, 1, 'https://res.cloudinary.com/danpcw54r/image/upload/v1723910781/pexels-abdel-rahman-abu-baker-958112-1963081_skytxw.jpg', NULL),
(27, 3, 1, 'https://res.cloudinary.com/danpcw54r/image/upload/v1723825895/cld-sample-3.jpg', NULL),
(28, 3, 1, 'https://res.cloudinary.com/danpcw54r/image/upload/v1723910803/pexels-lichtberlin-19166326_wl2ltx.jpg', NULL),
(29, 4, 1, 'https://res.cloudinary.com/danpcw54r/image/upload/v1723825885/samples/people/kitchen-bar.jpg', NULL),
(30, 5, 1, 'https://res.cloudinary.com/danpcw54r/image/upload/v1723825895/cld-sample.jpg', NULL),
(31, 6, 1, 'https://res.cloudinary.com/danpcw54r/image/upload/v1723825895/cld-sample-3.jpg', NULL),
(32, 6, 1, 'https://res.cloudinary.com/danpcw54r/image/upload/v1723910803/pexels-lichtberlin-19166326_wl2ltx.jpg', NULL);

-- SELECT * FROM Photos;
-- DELETE FROM Photos;

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
('Yorkshire', 53.959965, -1.087297),
('Saint-Tropez', 43.2672, 6.6407),
('Cologne', 50.937531, 6.960279),
('London', 51.507351, -0.127758),
('Lyon', 45.764043, 4.835659);

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


-- For Carmen Sandiego Test
(10, (SELECT locationID FROM Locations WHERE name = 'Tokyo')),
(11, (SELECT locationID FROM Locations WHERE name = 'Reykjavik')),
(12, (SELECT locationID FROM Locations WHERE name = 'Sydney')),
(13, (SELECT locationID FROM Locations WHERE name = 'Rio de Janeiro')),
(14, (SELECT locationID FROM Locations WHERE name = 'Bilbao')),
(15, (SELECT locationID FROM Locations WHERE name = 'Vancouver')),
(28, (SELECT locationID FROM Locations WHERE name = 'Viena')),
(29, (SELECT locationID FROM Locations WHERE name = 'Yorkshire')),
(30, (SELECT locationID FROM Locations WHERE name = 'Saint-Tropez')),
(31, (SELECT locationID FROM Locations WHERE name = 'Cologne')),
(32, (SELECT locationID FROM Locations WHERE name = 'London')),
(33, (SELECT locationID FROM Locations WHERE name = 'Lyon')),
(35, (SELECT locationID FROM Locations WHERE name = 'Madrid')),

-- For Lily's test
(16, (SELECT locationID FROM Locations WHERE name = 'Marrakech')), 
(17, (SELECT locationID FROM Locations WHERE name = 'Cairo')), 
(18, (SELECT locationID FROM Locations WHERE name = 'Kyoto')), 
(19, (SELECT locationID FROM Locations WHERE name = 'Lisbon')), 
(23, (SELECT locationID FROM Locations WHERE name = 'Cape Town')),
(24, (SELECT locationID FROM Locations WHERE name = 'Queenstown'));
    
    
