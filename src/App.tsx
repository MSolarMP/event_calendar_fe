import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/login';
import EventDashboard from "./pages/EventDashboard/event-dashboard";
import Calendar from "./pages/Calendar/calendar";

const App: React.FC = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<EventDashboard />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </Router>
  );
};

export default App;
