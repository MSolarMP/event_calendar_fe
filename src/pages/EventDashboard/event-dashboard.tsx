import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllEvents } from "../../api/events.service";

interface Event {
    id: number;
    title: string;
    description: string;
    eventTypeID: number;
    date: string;
    organiserID: number;
    locationId: number;
    featured: boolean;
    featuredRate?: number;
    createdAt: string;
}

const EventDashboard: React.FC = () => {
    const navigate = useNavigate(); // Initialize navigate function from useNavigate hook

    const [events, setEvents] = useState<Event[]>([]);
    const [topEvents, setTopEvents] = useState<Event[]>([]);

    useEffect(() => {
        async function fetchEvents() {
            try {
                const fetchedEvents = await getAllEvents();

                const featuredEvents = fetchedEvents.filter((event: Event) => event.featured);
                const nonFeaturedEvents = fetchedEvents.filter((event: Event) => !event.featured);

                const sortedFeaturedEvents = featuredEvents
                    .sort((a: { featuredRate: any; }, b: { featuredRate: any; }) => (b.featuredRate ?? 0) - (a.featuredRate ?? 0));

                if (sortedFeaturedEvents.some((event: { featuredRate: any; }) => (event.featuredRate ?? 0) > 0)) {
                    setTopEvents(sortedFeaturedEvents);
                } else {
                    const sortedNewestEvents = featuredEvents
                        .sort((a: Event, b: Event) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                    setTopEvents(sortedNewestEvents);
                }

                setEvents(fetchedEvents);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        }

        fetchEvents();
    }, []);

    return (
        <div>
            <h2>Event Dashboard</h2>
            <p>Main content of the dashboard</p>
            <h3>Featured Events</h3>
            <ul>
                {topEvents.map(event => (
                    <li key={event.id}>
                        <h4>{event.title}</h4>
                        <p>{event.description}</p>
                        <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventDashboard;
