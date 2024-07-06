import React from 'react';
import {Container, Logo, Navigation} from "./topbar.style";

const TopBar: React.FC = () => {
    return (
        <Container>
            <Logo>Event Calendar</Logo>
            <Navigation>
                <ul>
                    <li><a href="/">Dashboard</a></li>
                    <li><a href="/login">Logout</a></li>
                    {/* Add more navigation links */}
                </ul>
            </Navigation>
        </Container>
    );
};

export default TopBar;
