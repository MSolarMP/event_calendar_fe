import React, { useState } from 'react';

// Dummy data for events
const dummyEvents = [
    { id: 1, name: 'Event 1', date: '2024-06-15', description: 'Description for Event 1', type: ['Type A'], location: ['Location A'], organizer: ['Organizer A'] },
    { id: 2, name: 'Event 2', date: '2024-06-20', description: 'Description for Event 2', type: ['Type B'], location: ['Location B'], organizer: ['Organizer B'] },
    { id: 3, name: 'Event 3', date: '2024-06-25', description: 'Description for Event 3', type: ['Type A'], location: ['Location A'], organizer: ['Organizer A'] },
    { id: 4, name: 'Event 4', date: '2024-06-30', description: 'Description for Event 4', type: ['Type B'], location: ['Location B'], organizer: ['Organizer B'] },
    { id: 5, name: 'Event 5', date: '2024-07-05', description: 'Description for Event 5', type: ['Type A'], location: ['Location A'], organizer: ['Organizer A'] },
    { id: 6, name: 'Event 6', date: '2024-07-10', description: 'Description for Event 6', type: ['Type B'], location: ['Location B'], organizer: ['Organizer B'] },
    { id: 7, name: 'Event 7', date: '2024-07-15', description: 'Description for Event 7', type: ['Type A'], location: ['Location A'], organizer: ['Organizer A'] },
    { id: 8, name: 'Event 8', date: '2024-07-20', description: 'Description for Event 8', type: ['Type B'], location: ['Location B'], organizer: ['Organizer B'] },
    { id: 9, name: 'Event 9', date: '2024-07-25', description: 'Description for Event 9', type: ['Type A'], location: ['Location A'], organizer: ['Organizer A'] },
    { id: 10, name: 'Event 10', date: '2024-07-30', description: 'Description for Event 10', type: ['Type B'], location: ['Location B'], organizer: ['Organizer B'] },
];

const locations = [
    { id: '1', name: 'Location A' },
    { id: '2', name: 'Location B' },
    { id: '3', name: 'Location C' },
];

// Dummy data for organizers
const organizers = [
    { id: '1', name: 'Organizer A' },
    { id: '2', name: 'Organizer B' },
    { id: '3', name: 'Organizer C' },
];

// Dummy data for event types
const types = [
    { id: '1', name: 'Type A' },
    { id: '2', name: 'Type B' },
    { id: '3', name: 'Type C' },
];

// Define filter state with correct types
interface FilterState {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    types: string[];
    locations: string[];
    organizers: string[];
    [key: string]: string | string[];
}

interface Option {
    id: string;
    name: string;
}

interface CheckboxDropdownProps {
    options: Option[];
    selectedOptions: string[];
    onChange: (selected: string[]) => void;
}

const Calendar: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [filter, setFilter] = useState<FilterState>({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        types: [],
        locations: [],
        organizers: [],
    });

    console.log("filters: ",filter)

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];


    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    };

    const daysInMonth = getDaysInMonth(currentDate);
    const startDayOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay(); // 0 (Sunday) to 6 (Saturday)

    const goToPreviousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handleEventClick = (event: any) => {
        console.log('Clicked event:', event);
        // Add logic to open event details or perform other actions
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter({ ...filter, name: event.target.value });
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter({ ...filter, description: event.target.value });
    };

    const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter({ ...filter, startDate: event.target.value });
    };

    const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter({ ...filter, endDate: event.target.value });
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        let updatedFilters = { ...filter };

        if (checked) {
            if (typeof updatedFilters[name] === 'string') {
                updatedFilters[name] = [updatedFilters[name] as string, event.target.value];
            } else if (Array.isArray(updatedFilters[name])) {
                updatedFilters[name] = [...(updatedFilters[name] as string[]), event.target.value];
            } else {
                updatedFilters[name] = event.target.value;
            }
        } else {
            updatedFilters[name] = (updatedFilters[name] as string[]).filter((item: string) => item !== event.target.value);
        }

        setFilter(updatedFilters);
    };

    const renderDayEvents = (day: number) => {
        const dayEvents = dummyEvents.filter(event => {
            const eventDate = new Date(event.date);
            const eventMonth = eventDate.getMonth();
            const eventYear = eventDate.getFullYear();
            const filterMonth = currentDate.getMonth();
            const filterYear = currentDate.getFullYear();

            // Check if event is in the current month and matches filters
            return eventDate.getDate() === day && eventMonth === filterMonth && eventYear === filterYear
                && (event.name.toLowerCase().includes(filter.name.toLowerCase()) || event.description.toLowerCase().includes(filter.description.toLowerCase()))
                && (filter.startDate === '' || new Date(event.date) >= new Date(filter.startDate))
                && (filter.endDate === '' || new Date(event.date) <= new Date(filter.endDate))
                && (filter.types.length === 0 || event.type.some(t => filter.types.includes(t)))
                && (filter.locations.length === 0 || event.location.some(l => filter.locations.includes(l)))
                && (filter.organizers.length === 0 || event.organizer.some(o => filter.organizers.includes(o)));
        });

        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                {dayEvents.map(event => (
                    <div key={event.id} onClick={() => handleEventClick(event)} style={{ cursor: 'pointer', marginBottom: '4px', padding: '4px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
                        {event.name}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif' }}>
            {/* Filters */}
            <div style={{ marginBottom: '10px' }}>
                <input type="text" placeholder="Search by name" value={filter.name} onChange={handleNameChange} />
                <input type="text" placeholder="Search by description" value={filter.description} onChange={handleDescriptionChange} />
                <input type="date" placeholder="Start Date" value={filter.startDate} onChange={handleStartDateChange} />
                <input type="date" placeholder="End Date" value={filter.endDate} onChange={handleEndDateChange} />
                <div>
                    <label>
                        Type:
                        <input type="checkbox" name="types" value="Type A" checked={filter.types.includes('Type A')} onChange={handleCheckboxChange} />
                        Type A
                    </label>
                    <label>
                        <input type="checkbox" name="types" value="Type B" checked={filter.types.includes('Type B')} onChange={handleCheckboxChange} />
                        Type B
                    </label>
                    {/* Add more types as needed */}
                </div>
                <div>
                    <label>
                        Location:
                        <input type="checkbox" name="locations" value="Location A" checked={filter.locations.includes('Location A')} onChange={handleCheckboxChange} />
                        Location A
                    </label>
                    <label>
                        <input type="checkbox" name="locations" value="Location B" checked={filter.locations.includes('Location B')} onChange={handleCheckboxChange} />
                        Location B
                    </label>
                    {/* Add more locations as needed */}
                </div>
                <div>
                    <label>
                        Organizer:
                        <input type="checkbox" name="organizers" value="Organizer A" checked={filter.organizers.includes('Organizer A')} onChange={handleCheckboxChange} />
                        Organizer A
                    </label>
                    <label>
                        <input type="checkbox" name="organizers" value="Organizer B" checked={filter.organizers.includes('Organizer B')} onChange={handleCheckboxChange} />
                        Organizer B
                    </label>
                    {/* Add more organizers as needed */}
                </div>
            </div>

            {/* Month and navigation */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <button onClick={goToPreviousMonth}>&lt;</button>
                <h2>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
                <button onClick={goToNextMonth}>&gt;</button>
            </div>

            {/* Calendar grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
                {/* Weekday headers */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} style={{ textAlign: 'center', backgroundColor: '#ffffff', padding: '10px', fontWeight: 'bold' }}>{day}</div>
                ))}

                {/* Days grid */}
                {Array.from({ length: daysInMonth }, (_, index) => index + 1).map(day => (
                    <div key={day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', border: '1px solid #ccc', minHeight: '120px' }}>
                        <div style={{ flex: '0 0 auto', padding: '5px', textAlign: 'right', fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>{day}</div>
                        <div style={{ flex: '1 1 auto', overflowY: 'auto', padding: '5px' }}>{renderDayEvents(day)}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
