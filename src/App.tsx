import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/pages/Login/login';
import EventDashboard from "./components/pages/EventDashboard/event-dashboard";

const App: React.FC = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/event-dashboard" element={<EventDashboard />} />
        </Routes>
      </Router>
  );
};

export default App;
