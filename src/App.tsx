import React, { useState } from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import './App.css'
import ForgotPassword from "./components/ForgotPassword";
import Login from './components/Login'
import Register from "./components/Register";
import Confirm from "./components/Confirm";
import ForgotPasswordSubmit from "./components/ForgotPasswordSubmit";

import Home from "./components/Home";
import Timesheet from './components/Timesheet';
import Calendar from './components/Calendar';
import TimeTracker from './components/TimeTracker';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/forgot-password-submit" element={<ForgotPasswordSubmit />} />
          <Route path="/confirm" element={<Confirm />} />
          <Route path="/home" element={<Home />} >
            <Route path="timesheet" element={<Timesheet />} />
            <Route path="time-tracker" element={<TimeTracker />} />
            <Route path="calendar" element={<Calendar />} />
          </Route>
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
