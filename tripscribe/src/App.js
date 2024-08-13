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
import {Footer} from './components/footer/footer';
import { UserProfileEdit } from './pages/userProfile/userProfileEdit';
import { AboutUs } from './pages/aboutUs/aboutUs';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LogIn/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/mytrips" element={<MyTrips/>}/>
          <Route path="/tripdetails" element={<TripDetails />} />
          <Route path="/addtrip" element={<AddTrip/>}/>
          <Route path="/edittrip" element={<EditTrip/>}/>
          <Route path="/map" element={<Map/>}/>
          <Route path="/userprofile" element={<UserProfile/>}/>
          <Route path="/userProfileEdit" element={<UserProfileEdit />}/>
          <Route path="/aboutus" element={<AboutUs/>}/>
        </Routes>
          <Footer/>
      </Router>
  
    </div>
    );
  }

export default App;