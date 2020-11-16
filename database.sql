
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
create table "users" (
    "id" serial primary key,
    "username" varchar (80) unique not null,
    "full_name" varchar (255),
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
	notes text,
	visit_complete boolean
);

create table visits_attractions (
	id serial primary key,
	park_visit_id int references park_visits,
	attractions_id int references attractions,
	times_ridden int
);


insert into parks (name, city, state)
values ('Cedar Point', 'Sandusky', 'Ohio'),
('Disney''Animal Kingdom', 'Orlando', 'Florida'),
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
('Under the Sea - Journey of the Little Mermaid', 5),
('Walt Disney World Railroad - Fantasyland', 5),
('Walt Disney World Railroad - Frontierland', 5),
('Walt Disney World Railroad - Main Street, U.S.A.', 5),
('Walt Disney''s Carousel of Progress', 5),
('Walt Disney''s Enchanted Tiki Room', 5),
('Monsters, Inc. Laugh Floor', 1),
('The American Adventuer', 4),
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
('Millennium Falcon: Smuggler''s Run', 3),
('Nuppet*Vision 3D', 3),
('Rock ''n'' Roller Coaster Starring Aerosmith', 3),
('Slinky Dog Dash', 3),
('Star Tours - The Adventures Continue', 3),
('Star Wars: Rise of the Resistance', 3),
('Toy Story Mania!', 3),
('The Twilight Zone Tower of Terror™', 3),
('Walt Disney Presents', 3)
;