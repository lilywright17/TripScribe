import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/authContext'; 
import { LogIn } from './pages/logIn/logIn';
import { Register } from './pages/register/register';
import { MyTrips } from './pages/myTrips/myTrips';
import { AddTrip } from './pages/addTrip/addTrip';
import { EditTrip } from './pages/editTrip/editTrip';
import { UserProfile } from './pages/userProfile/userProfile';
import { MapPage } from './pages/map/map';
import { TripDetails } from './pages/tripDetails/tripDetails.jsx';
import { UserProfileEdit } from './pages/userProfile/userProfileEdit';
import { AboutUs } from './pages/aboutUs/aboutUs';
import { ResponsiveFooter } from './components/footer/responsiveFooter';
import { ResponsiveNavbar } from './components/responsiveNavbar/responsiveNavbar';

import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to check authentication state based on token
  const checkAuthentication = () => {
    const token = sessionStorage.getItem('token');
    console.log('Token from sessionStorage:', token);
    setIsAuthenticated(!!token); // Set authenticated state after getting the token
  };

  useEffect(() => {
    checkAuthentication(); // Run this once when the component mounts
  }, []);

  return (
    <Router> {/* Move the Router up */}
      <AuthProvider> {/* Wrap the application in the AuthProvider inside Router */}
        <Routes>
          {/* Home route - Redirect based on authentication status */}
          <Route path="/" element={isAuthenticated ? <Navigate to="/mytrips" replace /> : <LogIn checkAuth={checkAuthentication} />} />
          <Route path="/login" element={<LogIn checkAuth={checkAuthentication} />} />
          {/* Registration route */}
          <Route path="/register" element={isAuthenticated ? <Navigate to="/mytrips" replace /> : <Register />} />
          {/* Authenticated routes */}
          <Route path="/mytrips" element={isAuthenticated ? <PageWithNavbar component={<MyTrips />} /> : <Navigate to="/login" replace />} />
          <Route path="/tripdetails/:tripID" element={isAuthenticated ? <PageWithNavbar component={<TripDetails />} /> : <Navigate to="/login" replace />} />
          <Route path="/addtrip" element={isAuthenticated ? <PageWithNavbar component={<AddTrip />} /> : <Navigate to="/login" replace />} />
          <Route path="/edittrip" element={isAuthenticated ? <PageWithNavbar component={<EditTrip />} /> : <Navigate to="/login" replace />} />
          <Route path="/map" element={isAuthenticated ? <PageWithNavbar component={<MapPage />} /> : <Navigate to="/login" replace />} />
          <Route path="/userprofile" element={isAuthenticated ? <PageWithNavbar component={<UserProfile />} /> : <Navigate to="/login" replace />} />
          <Route path="/userProfileEdit" element={isAuthenticated ? <PageWithNavbar component={<UserProfileEdit />} /> : <Navigate to="/login" replace />} />
          <Route path="/aboutus" element={<PageWithNavbar component={<AboutUs />} />} />
        </Routes>
        <ResponsiveFooter />
      </AuthProvider>
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
