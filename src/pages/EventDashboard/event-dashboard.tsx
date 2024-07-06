import React from 'react';
import TopBar from "../../components/Topbar/topbar";
import {Advertisement, Container, ContentContainer, MainContent} from "./event-dashboard.style";
import { useNavigate } from 'react-router-dom';

const EventDashboard: React.FC = () => {
    const navigate = useNavigate(); // Initialize navigate function from useNavigate hook

    const onCalendarClick = () => {
        navigate('/calendar'); // Navigate to '/calendar' route
    };

    return (
        <Container>
            <TopBar />
            <ContentContainer>
                <Advertisement>
                    {/* Advertisement content */}
                    Advertisement Section
                </Advertisement>
                <MainContent>
                    <h2>Event Dashboard</h2>
                    <p>Main content of the dashboard</p>
                    <button onClick={onCalendarClick}>Go To Calendar</button>
                </MainContent>
                <Advertisement>
                    {/* Advertisement content */}
                    Advertisement Section
                </Advertisement>
            </ContentContainer>
        </Container>
    );
};

export default EventDashboard;