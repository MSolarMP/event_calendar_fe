import React from 'react';
import { useNavigate } from 'react-router-dom';

const EventDashboard: React.FC = () => {
    const navigate = useNavigate(); // Initialize navigate function from useNavigate hook

    const onCalendarClick = () => {
        navigate('/calendar'); // Navigate to '/calendar' route
    };

    return (
        <div>
            <h2>Event Dashboard</h2>
            <p>Main content of the dashboard</p>
            <button onClick={onCalendarClick}>Go To Calendar</button>
        </div>
    );
};

export default EventDashboard;