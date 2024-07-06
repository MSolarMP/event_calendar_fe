import React from 'react';
import {Advertisement, Container, ContentContainer} from "./layout.style";
import TopBar from "../Topbar/topbar";

type LayoutProps = {
    children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <Container>
            <TopBar />
            <ContentContainer>
                <Advertisement>
                    {/* Advertisement content */}
                    Advertisement Section
                </Advertisement>
                <main>
                    {children} {/* Render child components */}
                </main>
                <Advertisement>
                    {/* Advertisement content */}
                    Advertisement Section
                </Advertisement>
            </ContentContainer>
        </Container>
    );
};

export default Layout;