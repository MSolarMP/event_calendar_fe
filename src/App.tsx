import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/login';
import EventDashboard from "./pages/EventDashboard/event-dashboard";
import Calendar from "./pages/Calendar/calendar";
import Layout from "./components/Layout/layout";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout><EventDashboard /></Layout>} />
                <Route path="/login" element={<Login />} />
                <Route path="/calendar" element={<Layout><Calendar /></Layout>} />
            </Routes>
        </Router>
    );
};
export default App;
