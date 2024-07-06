import React, { useState } from 'react';

// Dummy data for events
const dummyEvents = [
    { id: 1, name: 'Event 1', date: '2024-06-15', description: 'Description for Event 1', type: 'Type A', location: 'Location A', organizer: 'Organizer A' },
    { id: 2, name: 'Event 2', date: '2024-06-20', description: 'Description for Event 2', type: 'Type B', location: 'Location B', organizer: 'Organizer B' },
    { id: 3, name: 'Event 3', date: '2024-06-25', description: 'Description for Event 3', type: 'Type A', location: 'Location A', organizer: 'Organizer A' },
    { id: 4, name: 'Event 4', date: '2024-06-30', description: 'Description for Event 4', type: 'Type B', location: 'Location B', organizer: 'Organizer B' },
    { id: 5, name: 'Event 5', date: '2024-07-05', description: 'Description for Event 5', type: 'Type A', location: 'Location A', organizer: 'Organizer A' },
    { id: 6, name: 'Event 6', date: '2024-07-10', description: 'Description for Event 6', type: 'Type B', location: 'Location B', organizer: 'Organizer B' },
    { id: 7, name: 'Event 7', date: '2024-07-15', description: 'Description for Event 7', type: 'Type A', location: 'Location A', organizer: 'Organizer A' },
    { id: 8, name: 'Event 8', date: '2024-07-20', description: 'Description for Event 8', type: 'Type B', location: 'Location B', organizer: 'Organizer B' },
    { id: 9, name: 'Event 9', date: '2024-07-25', description: 'Description for Event 9', type: 'Type A', location: 'Location A', organizer: 'Organizer A' },
    { id: 10, name: 'Event 10', date: '2024-07-30', description: 'Description for Event 10', type: 'Type B', location: 'Location B', organizer: 'Organizer B' },
];

const Calendar: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [filteredEvents, setFilteredEvents] = useState(dummyEvents);

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const getMonthName = (date: Date) => {
        return monthNames[date.getMonth()];
    };

    const goToPreviousMonth = () => {
        const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        setCurrentDate(previousMonth);
        filterEvents(previousMonth);
    };

    const goToNextMonth = () => {
        const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        setCurrentDate(nextMonth);
        filterEvents(nextMonth);
    };

    const filterEvents = (targetDate: Date) => {
        const filtered = dummyEvents.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.getMonth() === targetDate.getMonth() && eventDate.getFullYear() === targetDate.getFullYear();
        });
        setFilteredEvents(filtered);
    };

    const handleEventClick = (event: any) => {
        console.log('Clicked event:', event);
        // Add logic to open event details or perform other actions
    };

    return (
        <div>
            {/* Month and navigation */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <button onClick={goToPreviousMonth}>&lt;</button>
                <h3>{getMonthName(currentDate)} {currentDate.getFullYear()}</h3>
                <button onClick={goToNextMonth}>&gt;</button>
            </div>

            {/* Calendar view */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {/* Loop through filtered events */}
                {filteredEvents.map(event => (
                    <div key={event.id} style={{ backgroundColor: '#f0f0f0', padding: '10px', cursor: 'pointer' }} onClick={() => handleEventClick(event)}>
                        {event.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
