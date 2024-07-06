import React from 'react';
import {Container, Logo, Navigation} from "./topbar.style";

const TopBar: React.FC = () => {
    return (
        <Container>
            <Logo>Event Calendar</Logo>
            <Navigation>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/dashboard">Dashboard</a></li>
                    {/* Add more navigation links */}
                </ul>
            </Navigation>
        </Container>
    );
};

export default TopBar;
