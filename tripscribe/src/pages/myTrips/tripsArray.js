import NewYork from "./images/newyork.jpg"
import Paris from "./images/paris.jpg"
import Lisbon from "./images/Lisbon.jpg"
import Lisbon2 from "./images/Lisbon2.jpg"
import Lisbon3 from "./images/Lisbon3.jpg"
import Lisbon4 from "./images/Lisbon4.jpg"
import Berlin from "./images/Berlin.jpg"

const tripsArray = [
	{
		image: [Paris],
		city: 'Paris',
		country: 'France',
		title: 'Trip to Paris',
		startDate: '2024-06-01',
		endDate: '2024-06-10',
		description: "Sydney, a vibrant city on the Australian coast, is known for its stunning harbor and iconic landmarks. Climb the Sydney Harbour Bridge, relax at Bondi Beach, and enjoy a performance at the Sydney Opera House. The city’s blend of natural beauty, cultural attractions, and outdoor adventures make it an ideal destination."
	},
	{
		image: [NewYork],
		city: 'New York',
		country: 'USA',
		title: 'Trip to New York',
		startDate: '2024-07-15',
		endDate: '2024-07-20',
		description: "Exploring the city that never sleeps is an experience like no other. From the bright lights of Times Square, where the energy is palpable, to the serene beauty of Central Park, offering a peaceful retreat in the heart of Manhattan, NYC has it all. Whether you're admiring the skyline from the top of the Empire State Building, catching a Broadway show, or indulging in diverse culinary delights, New York City promises endless excitement and discovery."
	},
	{
		  image:[Lisbon,Lisbon2,Lisbon3,Lisbon4],
		  city: 'Madrid',
		  country: 'Spain',
		  title: 'Trip to Lisbon',
		  startDate: '2024-07-15',
		  endDate: '2024-07-20',
		  description: "Rome, the Eternal City, is a treasure trove of ancient wonders. Stand in awe of the Colosseum, explore the ruins of the Roman Forum, and toss a coin into the Trevi Fountain. The Vatican City, with its breathtaking St. Peter’s Basilica and the Sistine Chapel, adds to the rich tapestry of Rome’s historical and cultural heritage."
	},
	{
		  image: [Lisbon,Lisbon2,Lisbon3,Lisbon4],
		  city: 'Lisbon',
		  country: 'Spain',
		  title: 'Trip to Lisbon',
		  startDate: '2024-07-15',
		  endDate: '2024-07-20',
		  description: "Los Angeles, the entertainment capital of the world, offers glitz and glamour. Visit Hollywood, relax on Santa Monica Beach, and explore the Getty Center. The city’s diverse neighborhoods, cultural attractions, and year-round sunshine make LA an exciting destination."
	},
	{
		  image: [NewYork],
		  city: 'New York',
		  country: 'USA',
		  title: 'Trip to New York',
		  startDate: '2024-05-15',
		  endDate: '2024-05-20',
		  description: "Bangkok, a city of contrasts, combines bustling street life with serene temples. Explore the Grand Palace, visit the Wat Arun temple, and shop at the floating markets. The city’s vibrant nightlife, delicious street food, and rich cultural sites ensure an exciting and diverse experience."
	},
	{
		  image: [Berlin],
		  city: 'Berlin',
		  country: 'Germany',
		  title: 'Trip to Lisbon',
		  startDate: '2024-07-15',
		  endDate: '2024-07-20',
		  description: "Dubai, a city of superlatives, offers a futuristic skyline and luxurious experiences. Ascend the Burj Khalifa, shop at the opulent Dubai Mall, and relax on the pristine beaches. The blend of modern architecture, desert adventures, and rich cultural heritage provides a unique and unforgettable visit."
	},
	{
		  image: [Paris],
		  city: 'Paris',
		  country: 'France',
		  title: 'Trip to Paris',
		  startDate: '2024-06-01',
		  endDate: '2024-06-10',
		  description: "Barcelona, a city of art and architecture, enchants with its unique character. Admire Gaudí’s masterpieces like the Sagrada Família and Park Güell, stroll along La Rambla, and relax on the beaches. The city’s lively atmosphere, cultural richness, and culinary delights make it a must-visit."
	},
	{
		  image: [NewYork],
		  city: 'New York',
		  country: 'USA',
		  title: 'Trip to New York',
		  startDate: '2024-07-15',
		  endDate: '2024-07-20',
		  description: "Cairo, the gateway to ancient Egypt, is a city of wonders. Explore the Pyramids of Giza, the Sphinx, and the treasures of the Egyptian Museum. The bustling bazaars, historic mosques, and vibrant street life add to the allure of this ancient yet dynamic city."
	},
	{
			image: [Lisbon,Lisbon2,Lisbon3,Lisbon4],
			city: 'Lisbon',
			country: 'Spain',
			title: 'Trip to Lisbon',
			startDate: '2024-07-15',
			endDate: '2024-07-20',
			description: "Istanbul, where East meets West, is a city of stunning contrasts. Visit the majestic Hagia Sophia, the Blue Mosque, and the bustling Grand Bazaar. The Bosphorus Strait, dividing Europe and Asia, and the city’s rich history and vibrant culture make Istanbul a captivating destination."
	},
	{
			image: [Lisbon,Lisbon2,Lisbon3,Lisbon4],
			city: 'Lisbon',
			country: 'Spain',
			title: 'Trip to Lisbon',
			startDate: '2024-07-15',
			endDate: '2024-07-20',
			description: "Rio de Janeiro, known for its breathtaking landscapes and vibrant culture, offers unforgettable experiences. Relax on Copacabana Beach, take in the views from Sugarloaf Mountain, and visit the iconic Christ the Redeemer statue. The city’s lively festivals, samba rhythms, and natural beauty make it a top destination."
	},
	{
			image:[NewYork] ,
			city: 'New York',
			country: 'USA',
			title: 'Trip to New York',
			startDate: '2024-05-15',
			endDate: '2024-05-20',
			description: "Hong Kong, a bustling metropolis with a stunning skyline, offers a blend of East and West. Explore Victoria Peak, visit the bustling markets, and enjoy the nightlife in Lan Kwai Fong. The mix of skyscrapers, traditional temples, and natural landscapes makes Hong Kong a dynamic city."
	},
	{
			image: [Berlin],
			city: 'Berlin',
			country: 'Germany',
			title: 'Trip to Lisbon',
			startDate: '2024-07-15',
			endDate: '2024-07-20',
			description: "Moscow, a city of historical and cultural significance, offers a grand experience. Explore the Red Square, the Kremlin, and the iconic St. Basil’s Cathedral. The rich history, impressive architecture, and vibrant cultural scene make Moscow a fascinating city to explore."
	},
	{
		  image: [Paris],
		  city: 'Paris',
		  country: 'France',
		  title: 'Trip to Paris',
		  startDate: '2024-06-01',
		  endDate: '2024-06-10',
		  description: "Mumbai, India’s bustling financial capital, is a city of contrasts and energy. Visit the Gateway of India, explore the vibrant markets, and enjoy the street food. The blend of colonial architecture, Bollywood glamour, and diverse cultural experiences makes Mumbai an exciting destination."
	},
	{
		  image: [NewYork],
		  city: 'New York',
		  country: 'USA',
		  title: 'Trip to New York',
		  startDate: '2024-07-15',
		  endDate: '2024-07-20',
		  description: "Moscow, a city of historical and cultural significance, offers a grand experience. Explore the Red Square, the Kremlin, and the iconic St. Basil’s Cathedral. The rich history, impressive architecture, and vibrant cultural scene make Moscow a fascinating city to explore."
	},
	{
			image: [Lisbon,Lisbon2,Lisbon3,Lisbon4],
			city: 'Lisbon',
			country: 'Spain',
			title: 'Trip to Lisbon',
			startDate: '2024-07-15',
			endDate: '2024-07-20',
			description: "Toronto, a diverse and dynamic city, offers a range of experiences. Visit the CN Tower, explore the vibrant neighborhoods, and enjoy the waterfront. The city’s multicultural atmosphere, cultural institutions, and culinary scene make Toronto an inviting destination."
	},
	{
			image: [Lisbon,Lisbon2,Lisbon3,Lisbon4],
			city: 'Lisbon',
			country: 'Spain',
			title: 'Trip to Lisbon',
			startDate: '2024-07-15',
			endDate: '2024-07-20',
			description: "Singapore, a city of innovation and green spaces, combines modernity with tradition. Visit Marina Bay Sands, the Gardens by the Bay, and the vibrant Chinatown. The city’s cleanliness, efficient transport, and diverse culinary offerings make Singapore a top destination."
	},
	{
			image: [NewYork],
			city: 'New York',
			country: 'USA',
			title: 'Trip to New York',
			startDate: '2024-05-15',
			endDate: '2024-05-20',
			description: "Cape Town, known for its stunning natural beauty, provides a mix of adventure and relaxation. Ascend Table Mountain, visit the Cape of Good Hope, and explore the vibrant V&A Waterfront. The blend of outdoor activities, rich history, and scenic landscapes make Cape Town a captivating city."
	},
	{
			image: [Berlin],
			city: 'Berlin',
			country: 'Germany',
			title: 'Trip to Lisbon',
			startDate: '2024-07-15',
			endDate: '2024-07-20',
			description: "San Francisco, a city of iconic landmarks and cultural diversity, offers a unique experience. Cross the Golden Gate Bridge, explore Alcatraz Island, and wander through Fisherman’s Wharf. The city’s eclectic neighborhoods, historic sites, and vibrant arts scene make it a must-visit."
	}
];

export default tripsArray;