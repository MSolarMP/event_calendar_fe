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

    const onCalendarClick = () => {
        navigate('/calendar'); // Navigate to '/calendar' route
    };

    const [events, setEvents] = useState<Event[]>([]);
    const [topEvents, setTopEvents] = useState<Event[]>([]);

    useEffect(() => {
        async function fetchEvents() {
            try {
                const fetchedEvents = await getAllEvents();

                // Separate featured events from non-featured ones
                const featuredEvents = fetchedEvents.filter((event: Event) => event.featured);
                const nonFeaturedEvents = fetchedEvents.filter((event: Event) => !event.featured);

                // Sort featured events by featuredRate in descending order
                const sortedFeaturedEvents = featuredEvents
                    .sort((a: { featuredRate: any; }, b: { featuredRate: any; }) => (b.featuredRate ?? 0) - (a.featuredRate ?? 0));

                // If there are featured events with rate above 0, show top 5 of those
                if (sortedFeaturedEvents.some((event: { featuredRate: any; }) => (event.featuredRate ?? 0) > 0)) {
                    setTopEvents(sortedFeaturedEvents.slice(0, 5)); // Get the top 5 featured events
                } else {
                    // If no featured event has rate above 0, sort by date and get the newest 5 events
                    const sortedNewestEvents = featuredEvents
                        .sort((a: Event, b: Event) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                    setTopEvents(sortedNewestEvents.slice(0, 5));
                }

                setEvents(fetchedEvents); // Store all events (optional)
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
            <button onClick={onCalendarClick}>Go To Calendar</button>

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
