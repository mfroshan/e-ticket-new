import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-time-picker/dist/TimePicker.css';
// import 'react-clock/dist/Clock.css';
//AuthPtovider
import {AuthProvider} from './hooks/useAuth'


// import Login from './pagesUser/login';
// import Register from './pagesUser/register';
// import VerifyTicket from './pagesUser/verifyticket';
// import ContactUs from './pagesUser/contactus';
// import HomeUser from './pagesUser/home-user';
// import VerifyTicketUser from './pagesUser/verifyticket-user';
// import ContactUsUser from './pagesUser/contactus-user';
// import DashboardUser from './pagesUser/dashboard-user';
// import AdminLogin from './pagesAdmin/admin-login';
// import HomeAdmin from './pagesAdmin/stations';
// import TrainList from './pagesUser/trainlist';
// import TrainListUser from './pagesUser/trainlist-user';
// import TrainCoach from './pagesUser/traincoach';
// import Clerks from './pagesAdmin/clerks';
// import ClerkLogin from './pagesClerk/clerk-login';
// import HomeClerk from './pagesClerk/clerk-home';
// import TrainListClerk from './pagesClerk/trainlist-clerk';
// import { TrainCoachClerk } from './pagesClerk/traincoach-clerk';
// import Trains from './pagesAdmin/trains';
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/user/HomePage";
import Login from "./pages/user/logn";
import Register from "./pages/user/register";
import VerifyTicket from "./pages/user/verifyticket";
import ContactUs from "./pages/user/contactus";
import TrainList from "./pages/user/trainlist";
import Clerks from "./pages/admin/clerk";
import ListClerk from "./pages/admin/listClerk";
import Station from "./pages/admin/stations";
import ListUser from "./pages/admin/user-list";
import Trains from "./pages/admin/trains";
import TrainView from "./pages/admin/train-list";
import ListCoach from "./pages/admin/view-coach";

function App() {
  const [state, setState] = useState(
    JSON.parse(window.localStorage.getItem("state")) || {}
  );

  const setSelectedTrainIDFromPositionToPosition = (data) => {
    setState({
      ...state,
      selectedTrainIDFromPositionToPosition: data,
    });
  };

  return (
    <BrowserRouter>
      <AuthProvider>
          <Routes>
            {/* user Routes */}
            <Route path='/' element={<HomePage />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/verify-ticket' element={<VerifyTicket />} />
            <Route path='/contact-us' element={<ContactUs />} />
            <Route path='/trainlist' element={<TrainList />} />


            {/* {Admin Routes} */}
            <Route path='/add-clerk' element={<Clerks />} />            
            <Route path='/clerk-list' element={<ListClerk />} />
            <Route path="/stations" element={<Station />} />
            <Route path="/users-list" element={<ListUser />} />
            <Route path="/trains" element={<Trains />} />
            <Route path="/trains-list" element={<TrainView />} />
            <Route path="/view-coachs/:id" element={<ListCoach />} />


          </Routes>
      </AuthProvider>
   </BrowserRouter>

  );
}

export default App;
