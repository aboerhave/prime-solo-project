
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
create table "user" (
    "id" serial primary key,
    "username" varchar (80) unique not null,
    "password" varchar (255) not null
);


select * from "users";

create table parks (
	id serial primary key,
	name varchar (255) not null,
	city varchar (255),
	state varchar (255)
	);
	
create table attractions (
	id serial primary key,
	name varchar (255), 
	park_id int references parks
);

create table favorites (
	id serial primary key,
	user_id int references users,
	attraction_id int references attractions,
	favorite_status boolean
);
	
create table park_visits (	
	id serial primary key,
	user_id int references users,
	date date,
	notes text default '',
	visit_complete boolean default false,
    park_id int references parks
);

create table visits_attractions (
	id serial primary key,
	park_visit_id int references park_visits,
	attractions_id int references attractions,
	times_ridden int default 1
);


insert into parks (name, city, state)
values ('Cedar Point', 'Sandusky', 'Ohio'),
('Disney''s Animal Kingdom', 'Orlando', 'Florida'),
('Disney''s Hollywood Studios', 'Orlando', 'Florida'),
('Epcot', 'Orlando', 'Florida'),
('Magic Kingdom', 'Orlando', 'Florida'),
('Universal''s Islands of Adventure', 'Orlando', 'Florida'),
('Universal Studios Florida', 'Orlando', 'Florida'),
('Valleyfair', 'Shakopee', 'Minnesota')
;

insert into attractions (name, park_id)
values ('Wild Thing', 8),
('Corkscrew', 8),
('Xtreme Swing', 8),
('Steel Venom', 8),
('Renegade', 8),
('High Roller', 8),
('North Star', 8),
('Power Tower', 8),
('Delirious', 8),
('Northern Lights', 8),
('Excalibur', 8),
('Doctor Doom''s Fearfall®', 6),
('Hagrid''s Magical Creatures Motorbike Adventure™', 6),
('Harry Potter and the Forbidden Journey™', 6),
('Hollywood Rip Ride Rockit™', 7),
('MEN IN BLACK™ Alien Attack!™', 7),
('Revenge of the Mummy™', 7),
('The Incredible Hulk Coaster®', 6),
('The Simpsons Ride™', 7),
('Harry Potter and the Excape from Gringotts™', 7),
('Race Through New York Starring Jimmy Fallon™', 7),
('Shrek 4-D', 7),
('Skull Island: Reign of Kong™', 6),
('The Amazing Adventures of Spider-Man®', 6),
('Transformers™: The Ride-3D', 7),
('Dudley Do-Right''s Ripsaw Falls®', 6),
('Jurassic Park River Adventure™', 6),
('Popeye & Bluto''s Bilge-Rat Barges®', 6),
('Caro-Seuss-el™', 6),
('Despicable Me Minion Mayhem™', 7),
('E.T. Adventure™', 7),
('Flight of the Hippogriff™', 6),
('Hogwarts™ Express - Hogsmeade™ Station', 6),
('Hogwarts™ Express - King''s Cross Station', 7),
('Kong & Kodos'' Twirl ''n'' Hurl', 7),
('One Fish, Two Fish, Red Fish, Blue Fish™', 6),
('Pteranodon Flyers™', 6),
('The Cat in The Hat™', 6),
('The High in the Sky Suess Trolley Train Ride™', 6),
('Woody Woodpecker''s Nuthouse Coaster™', 7),
('Blue Streak', 1),
('Cedar Creek Mine Ride', 1),
('Corkscrew', 1),
('GateKeeper', 1),
('Gemini', 1),
('Iron Dragon', 1),
('Magnum XL-200', 1),
('Maverick', 1),
('Millennium Force', 1),
('Pipe Scream', 1),
('Raptor', 1),
('Rougarou', 1),
('Steel Vengeance', 1),
('Top Thrill Dragster', 1),
('Valravn', 1),
('Wicked Twister', 1),
('Wilderness Run', 1),
('Woodstock Express', 1),
('TriceraTop Spin', 2),
('DINOSAUR', 2),
('Expedition Everest - Legend of the Forbidden Mountain', 2),
('It''s Tough to be a Bug!', 2),
('Kali River Rapids', 2),
('Kilimanjaro Safaris', 2),
('Avatar Flight of Passage', 2),
('Na''vi River Journey', 2),
('Astro Orbiter', 5),
('The Barnstormer', 5),
('Big Thunder Mountain Railroad', 5),
('Buzz Lightyear''s Space Ranger Spin', 5),
('Dumbo the Flying Elephant', 5),
('Haunted Mansion', 5),
('"it''s a small world"', 5),
('Jungle Cruise', 5),
('Mad Tea Party', 5),
('The Magic Carpets of Aladdin', 5),
('The Many Adventures of Winnie the Pooh', 5),
('Mickey''s Philharmagic', 5),
('Peter Pan''s Flight', 5),
('Pirates of the Caribbean', 5),
('Prince Charming Regal Carrousel', 5),
('Seven Dwarfs Mine Train', 5),
('Space Mountain', 5),
('Splash Mountain', 5),
('Tomorrowland Speedway', 5),
('Tomorrowland Transit Authority PeopleMover', 5),
('Under the Sea ~ Journey of the Little Mermaid', 5),
('Walt Disney World Railroad - Fantasyland', 5),
('Walt Disney World Railroad - Frontierland', 5),
('Walt Disney World Railroad - Main Street, U.S.A.', 5),
('Walt Disney''s Carousel of Progress', 5),
('Walt Disney''s Enchanted Tiki Room', 5),
('Monsters, Inc. Laugh Floor', 5),
('The American Adventure', 4),
('Beauty and the Beast Sing-Along', 4),
('Canada Far and Wide in Circle-Vision 360', 4),
('Disney and Pixar Short Film Festival', 4),
('Frozen Ever After', 4),
('Gran Fiesta Tour Starring The Three Caballeros', 4),
('Impressions de France', 4),
('Journey Into Imagination With Figment', 4),
('Living with the Land', 4),
('Mission: SPACE', 4),
('Reflections of China', 4),
('The Seas with Nemo & Friends', 4),
('Soarin'' Around the World', 4),
('Spaceship Earth', 4),
('Test Track', 4),
('Alien Swirling Saucers', 3),
('Lightning McQueen''s Racing Academy', 3),
('Mickey & Minnie''s Runaway Railway', 3),
('Millennium Falcon: Smugglers Run', 3),
('Muppet*Vision 3D', 3),
('Rock ''n'' Roller Coaster Starring Aerosmith', 3),
('Slinky Dog Dash', 3),
('Star Tours - The Adventures Continue', 3),
('Star Wars: Rise of the Resistance', 3),
('Toy Story Mania!', 3),
('The Twilight Zone Tower of Terror™', 3),
('Walt Disney Presents', 3)
;

insert into parks (name, city, state)
values ('Disneyland Park', 'Anaheim', 'California'),
('Disney California Adventure Park', 'Anaheim', 'California');

insert into attractions (name, park_id)
values ('Alice in Wonderland', 9),
('Astro Orbiter', 9),
('Autopia', 9),
('Big Thunder Mountain Railroad', 9),
('Buzz Lightyear Astro Blasters', 9),
('Casey Jr. Circus Train', 9),
('Chip ''n Dale Treehouse', 9),
('Davy Crockett''s Explorer Canoes', 9),
('Disneyland Monorail', 9),
('Disneyland Railroad - Main Street, U.S.A.', 9),
('Disneyland Railroad - New Orleans Square', 9),
('Disneyland Railroad - Mickey''s Toontown', 9),
('Disneyland Railroad - Tomorrowland', 9),
('The Disneyland Story presenting Great Moments with Mr. Lincoln', 9),
('Donald''s Boat', 9),
('Dumbo the Flying Elephant', 9),
('Finding Nemo Submarine Voyage', 9),
('Frontierland Shootin'' Exposition', 9),
('Gadget''s Go Coaster', 9),
('Goofy''s Playhouse', 9),
('Haunted Mansion', 9),
('Indiana Jones™ Adventure', 9),
('"it''s a small world"', 9),
('Jungle Cruise', 9),
('King Arthur Carrousel', 9),
('Mad Tea Party', 9),
('Main Street Cinema', 9),
('Main Street Vehicles', 9),
('The Many Adventures of Winnie the Pooh', 9),
('Mark Twain Riverboat', 9),
('Matterhorn Bobsleds', 9),
('Mickey''s House and Meet Mickey', 9),
('Millenium Falscon: Smugglers Run', 9),
('Minnie''s House', 9),
('Mr. Toad''s Wild Ride', 9),
('Peter Pan''s Flight', 9),
('Pinocchio''s Daring Journey', 9),
('Pirate''s Lair on Tom Sawyer Island', 9),
('Pirates of the Caribbean', 9),
('Roger Rabbit''s Car Toon Spin', 9),
('Sailing Ship Columbia', 9),
('Sleeping Beauty Castle Walkthrough', 9),
('Snow White''s Scary Adventures', 9),
('Space Mountain', 9),
('Splash Mountain', 9),
('Star Tours - The Adventures Continue', 9),
('Star Wars Launch Bay', 9),
('Star Wars: Rise of the Resistance', 9),
('Storybook Land Canal Boats', 9),
('Tarzan''s Treehouse™', 9),
('Walt Disney''s Enchanted Tiki Room', 9),
('Animation Academy', 10),
('The Bakery Tour', 10),
('Golden Zephyr', 10),
('Goofy''s Sky School', 10),
('Grizzly River Run', 10),
('Guardians of the Galaxy - Mission: BREAKOUT!', 10),
('Incredicoaster', 10),
('Inside Out Emothional Whirlwind', 10),
('Jessie''s Critter Carousel', 10),
('Jumpin'' Jellyfish', 10),
('The Little Mermaid ~ Ariel''s Undersea Adventure', 10),
('Luigi''s Rollickin'' Roadsters', 10),
('Mater''s Junkyard Jamboree', 10),
('Mickey''s Philharmagic', 10),
('Monster''s Inc. Mike & Sulley to the Rescue!', 10),
('Pixar Pal-A-Round - Non-Swinging', 10),
('Pixar Pal-A-Round - Swinging', 10),
('Radiator Springs Racers', 10),
('Red Car Trolley', 10),
('Redwood Creek Challenge Trail', 10),
('Silly Symphony Swings', 10),
('Soarin'' Around the World', 10),
('Toy Story Midway Mania!', 10),
('Turtle Talk with Crush', 10),
('Walt Disney Imagineering Blue Sky Cellar', 10);

insert into parks (name, city, state)
values ('Six Flags Magic Mountain', 'Valencia', 'California');

insert into attractions (name, park_id)
values ('Apocalypse', 11),
('BATMAN™ The Ride', 11),
('Buccaneer', 11),
('Canyon Blaster', 11),
('Crazanity', 11),
('Daffy''s Adventure Tours', 11),
('Elmer''s Weather Balloons', 11),
('Full Throttle', 11),
('Gold Rusher', 11),
('Goliath', 11),
('Grand American Carousel', 11),
('Jammin'' Bumpers', 11),
('Jet Stream', 11),
('JUSTICE LEAGUE™: Battle for Metropolis', 11),
('LEX LUTHOR™: Drop of Doom', 11),
('Magic Flyer', 11),
('Merrie Melodies Carousel', 11),
('Ninja', 11),
('Pacific Speedway', 11),
('Pepe Le Pew''s Tea Party', 11),
('Road Runner Express', 11),
('Roaring Rapids', 11),
('Scrambler', 11),
('Scream', 11),
('Speedy Gonzales Hot Rod Racers', 11),
('SUPERMAN™: Escape from Krypton', 11),
('Swashbuckler', 11),
('Sylvester''s Pounce and Bounce', 11),
('Tatsu', 11),
('Taz''s Trucking Co.', 11),
('THE FLASH™ Speed Force', 11),
('The Looney Tunes Lodge', 11),
('The New Revolution - Classic', 11),
('THE RIDDLER''S™ Revenge', 11),
('Tidal Wave', 11),
('Tweety''s Escape', 11),
('Twisted Colossus', 11);

insert into parks (name, city, state)
values ('Knott''s Berry Farm', 'Buena Park', 'California');

insert into attractions (name, park_id)
values ('Coast Rider', 12),
('GhostRider', 12),
('HangTime', 12),
('Jaguar!', 12),
('La Revolucion', 12),
('Montezooma''s Revenge', 12),
('Pony Express', 12),
('Supreme Scream', 12),
('Wipeout', 12),
('Xcelerator The Ride®', 12),
('Balloon Race', 12),
('Butterfield Stagecoach', 12),
('Calico Mine Ride', 12),
('Calico Railroad', 12),
('Calico River Rapids', 12),
('Camp Bus', 12),
('Charlie Brown''s Kite Flyer', 12),
('Dragon Swing', 12),
('Flying Ace', 12),
('Grand Sierra Railroad', 12),
('Hat Dance', 12),
('High Sierra Ferris Wheel', 12),
('Huff and Puff', 12),
('Knott''s Bear-y Tales: Return to the Fair', 12),
('Linus Launcher', 12),
('Merry Go Round', 12),
('{Pacific Scrambler', 12),
('Pig Pen''s Mud Buggies', 12),
('Rapid River Run', 12),
('Rocky Mountain Trucking Company', 12),
('Sierra Sidewinder', 12),
('Silver Bullet', 12),
('Sky Cabin', 12),
('Sol Spin', 12),
('Surfside Gliders', 12),
('Timber Mountain Log Ride', 12),
('Woodstock''s Airmail', 12),
('Timberline Twister', 12),
('WaveSwinger', 12);
