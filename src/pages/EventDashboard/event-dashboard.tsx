import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {getAllEvents} from "../../api/events.service";
import {getAllLocations} from "../../api/location.service";
import {getAllOrganisers} from "../../api/organiser.service";
import {getAllCategorys} from "../../api/category.service";

interface Event {
    id: number;
    title: string;
    description: string;
    eventTypeID: number;
    date: string;
    organiserID: number;
    locationId: number;
}

interface Location {
    id: number;
    name: string;
}

interface Organiser {
    id: number;
    name: string;
}

interface Category {
    id: number;
    name: string;
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
                // Sort events by date in descending order and pick the top 5
                const sortedEvents = fetchedEvents.sort((a: { date: string | number | Date; }, b: { date: string | number | Date; }) => new Date(b.date).getTime() - new Date(a.date).getTime());
                setEvents(sortedEvents);
                setTopEvents(sortedEvents.slice(0, 5)); // Get the top 5 events
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

            <h3>Top 5 Recent Events</h3>
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