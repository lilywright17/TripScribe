import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/authContext'; 
import { LogIn } from './pages/logIn/logIn';
import { Register } from './pages/register/register';
import { MyTrips } from './pages/myTrips/myTrips';
import { AddTrip } from './pages/addTrip/addTrip';
import { EditTrip } from './pages/editTrip/editTrip';
import { UserProfile } from './pages/userProfile/userProfile';
import { MapPage } from './pages/map/map';
import { TripDetails } from './pages/tripDetails/tripDetails.jsx';
import { AboutUs } from './pages/aboutUs/aboutUs';
import { ResponsiveFooter } from './components/footer/responsiveFooter';
import { ResponsiveNavbar } from './components/responsiveNavbar/responsiveNavbar';
import { HelmetTitle } from './hoc/withTitle.jsx';

import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider> 
        <AppContent />
        <ResponsiveFooter />
      </AuthProvider>
    </Router>
  );
}

function AppContent() {
  const { isAuthenticated } = useContext(AuthContext); // Use AuthContext to track authentication state

  return (
    <Routes>
      <Route 
        path="/" 
        element={isAuthenticated ? <Navigate to="/mytrips" replace /> : <PageWithNavbarExcluded 
          component={<LogIn />} 
          title="Login" />}  
      />
      <Route 
        path="/register" 
        element={<PageWithNavbarExcluded
          component={<Register />} 
          title="Register" />}  
      />
      <Route 
        path="/mytrips" 
        element={isAuthenticated ? <PageWithNavbar 
          component={<MyTrips />} 
          title="My Trips" /> : <Navigate to="/" replace />} 
      />
      <Route 
        path="/tripdetails/:tripID" 
        element={isAuthenticated ? <PageWithNavbar 
          component={<TripDetails />} 
          title="Trip Details" /> : <Navigate to="/" replace />}   
      />  
      <Route 
        path="/addtrip" 
        element={isAuthenticated ? <PageWithNavbar 
          component={<AddTrip />} 
          title="Add Trip" /> : <Navigate to="/" replace />}   
      /> 
      <Route 
        path="/edittrip/:tripID" 
        element={isAuthenticated ? <PageWithNavbar 
          component={<EditTrip />} 
          title="Edit Trip" /> : <Navigate to="/" replace />}   
      />
      <Route 
        path="/map" 
        element={isAuthenticated ? <PageWithNavbar 
          component={<MapPage />} 
          title="Map View" /> : <Navigate to="/" replace />}   
      />
      <Route 
        path="/userprofile" 
        element={isAuthenticated ? <PageWithNavbar 
          component={<UserProfile />} 
          title="User Profile" /> : <Navigate to="/" replace />}   
      />
      <Route 
        path="/aboutus" 
        element={<PageWithNavbar 
          component={<AboutUs />}
          title="About Us" />} 
      />
    </Routes>
  );
}


function PageWithNavbar({ component, title }) {
  const componentName = title || component.type.displayName || component.type.name || 'Page';

  return (
    <>
      <HelmetTitle title={componentName} />
      <ResponsiveNavbar />
      {component}
    </>
  );
}

function PageWithNavbarExcluded({ component, title }) {
  const componentName = title || component.type.displayName || component.type.name || 'Page';
  return (
    <>
      <HelmetTitle title={componentName} />
      {component} 
    </>
  );
}

export default App;