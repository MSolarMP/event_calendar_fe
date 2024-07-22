import React, {useEffect, useState} from 'react';
import CheckboxDropdown from "../../components/CheckboxDropDown/checkboxDropDown"; // Import your CheckboxDropdown component here
import { getAllEvents, createEvent } from '../../api/events.service';
import {getAllLocations} from "../../api/location.service";
import {getAllOrganisers} from "../../api/organiser.service";
import {getAllCategorys} from "../../api/category.service";

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

interface Event {
    id: number;
    title: string;
    description: string;
    eventTypeID: number;
    date: string;
    organiserID: number;
    locationId: number;
}

const Calendar: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [locations, setLocations] = useState([]);
    const [organisers, setOrganisers] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function fetchEvents() {
            try {
                const fetchedEvents = await getAllEvents();
                const fetchedLocations = await getAllLocations();
                const fetchedOrganisers = await getAllOrganisers();
                const fetchedCategorys = await getAllCategorys();

                setEvents(fetchedEvents);
                setLocations(fetchedLocations);
                setOrganisers(fetchedOrganisers);
                setCategories(fetchedCategorys);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        }

        fetchEvents();
    }, []);

    console.log("events: ",events)
    console.log("locations: ",locations)
    console.log("organisers: ",organisers)
    console.log("categories: ",categories)

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

    const handleCheckboxChange = (value: string, category: string, checked: boolean) => {
        let updatedFilters = { ...filter };

        if (checked) {
            updatedFilters[category] = [...(updatedFilters[category] as string[]), value];
        } else {
            updatedFilters[category] = (updatedFilters[category] as string[]).filter(item => item !== value);
        }

        setFilter(updatedFilters);
    };


    const renderDayEvents = (day: number) => {
        const dayEvents = events.filter(event => {
            const eventDate = new Date(event.date);
            const eventMonth = eventDate.getMonth();
            const eventYear = eventDate.getFullYear();
            const filterMonth = currentDate.getMonth();
            const filterYear = currentDate.getFullYear();

            // Check if event is in the current month and matches filters
            return eventDate.getDate() === day && eventMonth === filterMonth && eventYear === filterYear
                && (event.title.toLowerCase().includes(filter.name.toLowerCase()) || event.description.toLowerCase().includes(filter.description.toLowerCase()))
                && (filter.startDate === '' || new Date(event.date) >= new Date(filter.startDate))
                && (filter.endDate === '' || new Date(event.date) <= new Date(filter.endDate))
                && (filter.types.length === 0 || filter.types.includes(event.eventTypeID.toString()))
                && (filter.locations.length === 0 || filter.locations.includes(event.locationId.toString()))
                && (filter.organizers.length === 0 || filter.organizers.includes(event.organiserID.toString()));
        });

        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', overflowY: 'auto', height: 'fit-content' }}>
                {dayEvents.map(event => (
                    <div key={event.id} onClick={() => handleEventClick(event)} style={{ cursor: 'pointer', marginBottom: '4px', padding: '4px', backgroundColor: '#f0f0f0' }}>
                        {event.title}
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
                <CheckboxDropdown options={categories} selectedOptions={filter.types} onChange={(selected, checked) => handleCheckboxChange(selected, 'types', checked)} />
                <CheckboxDropdown options={locations} selectedOptions={filter.locations} onChange={(selected, checked) => handleCheckboxChange(selected, 'locations', checked)} />
                <CheckboxDropdown options={organisers} selectedOptions={filter.organizers} onChange={(selected, checked) => handleCheckboxChange(selected, 'organizers', checked)} />
            </div>

            {/* Month and navigation */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <button onClick={goToPreviousMonth}>&lt;</button>
                <h2>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
                <button onClick={goToNextMonth}>&gt;</button>
            </div>

            {/* Calendar grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
                {/* Weekday headers */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} style={{ textAlign: 'center', backgroundColor: '#ffffff', padding: '10px', fontWeight: 'bold' }}>
                        {day}
                    </div>
                ))}

                {/* Days of the month */}
                {Array.from({ length: startDayOfWeek > 0 ? daysInMonth + startDayOfWeek : daysInMonth + 6 - startDayOfWeek }).map((_, index) => {
                    const day = index + 1 - startDayOfWeek;
                    const isCurrentMonth = day > 0 && day <= daysInMonth;
                    const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                    const isToday = isCurrentMonth && dayDate.toDateString() === new Date().toDateString();

                    return (
                        <div
                            key={index}
                            style={{
                                textAlign: 'center',
                                backgroundColor: isToday ? '#f0f0f0' : '#ffffff',
                                padding: '10px',
                                border: '1px solid #ccc',
                                opacity: !isCurrentMonth ? 0.5 : 1,
                                overflowY: 'auto',
                            }}
                        >
                            {isCurrentMonth && (
                                <>
                                    <div>{day}</div>
                                    {renderDayEvents(day)}
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Calendar;
