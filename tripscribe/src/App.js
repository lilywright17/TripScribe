import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LogIn } from './pages/logIn/logIn';
import { Register } from './pages/register/register';
import { MyTrips } from './pages/myTrips/myTrips';
import { AddTrip } from './pages/addTrip/addTrip';
import { EditTrip } from './pages/editTrip/editTrip';
import { UserProfile } from './pages/userProfile/userProfile';
import {Map} from './pages/map/map';
import { TripDetails } from './pages/tripDetails/tripDetails.jsx';
import { UserProfileEdit } from './pages/userProfile/userProfileEdit';
import { AboutUs } from './pages/aboutUs/aboutUs';
import ResponsiveFooter from './components/footer/responsiveFooter';
import ResponsiveNavbar from './components/responsiveNavbar/responsiveNavbar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageWithNavbarExcluded component={<LogIn />} />} />
        <Route path="/register" element={<PageWithNavbarExcluded component={<Register />} />} />
        <Route path="/mytrips" element={<PageWithNavbar component={<MyTrips />} />} />
        <Route path="/tripdetails" element={<PageWithNavbar component={<TripDetails />} />} />
        <Route path="/addtrip" element={<PageWithNavbar component={<AddTrip />} />} />
        <Route path="/edittrip" element={<PageWithNavbar component={<EditTrip />} />} />
        <Route path="/map" element={<PageWithNavbar component={<Map />} />} />
        <Route path="/userprofile" element={<PageWithNavbar component={<UserProfile />} />} />
        <Route path="/userProfileEdit" element={<PageWithNavbar component={<UserProfileEdit />} />} />
        <Route path="/aboutus" element={<PageWithNavbar component={<AboutUs />} />} />
      </Routes>
      <ResponsiveFooter />
    </Router>
  );
}

function PageWithNavbar({ component }) {
  return (
    <>
      <ResponsiveNavbar />
      {component}
    </>
  );
}

function PageWithNavbarExcluded({ component }) {
  return component;
}

export default App;





/*

<header className="App-header">
          
        <h1>Welcome to our Travel App!</h1>
      </header>
        <h2>Our Favourite Trips</h2>
        <ul>
          <li>
            <h2>Precious</h2>
            <p>I was able to travel quite a lot before uni! I visited various countries in Europe, Asia and America but my most memorable would be a family cruise from US to Mexico where I got my first tattoo.</p>
          </li>
          <li>
            <h2>Krystal</h2>
              <p>FILL IN TRIP DETAILS HERE</p>
            </li>
            <li>
              <h2>Mediha</h2>
              <p>The most memorable trip I had so far was my holiday in Crete, Greece. I still remember the pink sand and blue water in Elafonissi Beach. I enjoyed the food, wine and sunny weather for five days. Definitely, a place I will visit again.</p>
            </li>
            <li>
              <h2>Victoria</h2>
              <p>My most memorable trip was to Cartagena, Colombia, an unforgettable adventure filled with vibrant culture, stunning architecture, and breathtaking coastal views. A highlight was sailing to the Rosario Islands, where I snorkeled in crystal-clear waters and relaxed on pristine beaches.</p>
            </li>
            <li>
              <h2>Marta</h2>
              <p>Travelling is a big part of my life. I love it and travel quite often. One of my favourite trips ever was when I went to Sri Lanka. It was my first time visiting Asia and everyting seemed so exotic and exciting. The wildlife was spectacular. I loved going on safaris and seeing elephants, leopards, wild beasts and even a sloth bear! I got to see baby turtles hatching on a beach below a starry, stormy sky and making their way to the sea. And let's not forget the whale watching. It was a truly memeorable experience. </p>
            </li>
            <li>
              <h2>Katie</h2>
              <p>My favourite trip was my first ever solo trip abroad! I went to Oslo, in Norway, just for 3 days, to celebrate my career change! I developed a taste for Brunost!</p>
            </li>
            <li>
              <h2>Lily</h2>
              <p>My favourite trip was when I backpacked South East Asia solo after uni. I did Thailand, Vietnam, Cambodia, Laos, Bali and the Philippines. It took 5 months and it was so much fun, I met so many amazing people. My favourite country was Vietnam!</p>
            </li>
        </ul>
  
  
      </div>
    );
  }

export default App; */
