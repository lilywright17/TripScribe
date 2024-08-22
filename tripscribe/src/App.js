
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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



function App() {
  return (
    <Router>
      <Routes>
      <Route 
          path="/" 
          element={<PageWithNavbarExcluded 
          component={<LogIn />} 
          title="Log In" />} 
        />
        <Route 
          path="/register" 
          element={<PageWithNavbarExcluded 
          component={<Register />} 
          title="Register" />} 
        />
        <Route 
          path="/mytrips" 
          element={<PageWithNavbar 
          component={<MyTrips />} 
          title="My Trips" />} 
        />
        <Route 
          path="/tripdetails/:tripID" 
          element={<PageWithNavbar 
          component={<TripDetails />} 
          title="Trip Details" />} 
        />
        <Route 
          path="/addtrip" 
          element={<PageWithNavbar 
          component={<AddTrip />} 
          title="Add Trip" />} 
        />
        <Route 
          path="/edittrip" 
          element={<PageWithNavbar 
          component={<EditTrip />} 
          title="Edit Trip" />} 
        />
        <Route 
          path="/map" 
          element={<PageWithNavbar 
          component={<MapPage />} 
          title="Map View" />} 
        />
        <Route 
          path="/userprofile" 
          element={<PageWithNavbar 
          component={<UserProfile />} 
          title="User Profile" />} 
        />
        <Route 
          path="/aboutus" 
          element={<PageWithNavbar 
          component={<AboutUs />} 
          title="About Us" />} 
        />
      </Routes>
      <ResponsiveFooter />
    </Router>
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
  )
}

export default App;