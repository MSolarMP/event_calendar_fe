import React, {useEffect, useRef, useState} from 'react';

interface DrawerProps {
    event: any;
    isOpen: boolean;
    onClose: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ event, isOpen, onClose }) => {
    const drawerRef = useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = useState(isOpen);

    const handleClickOutside = (event: MouseEvent) => {
        if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
            onClose();
        }
    };

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            setIsAnimating(false);
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!event && !isAnimating) return null;

    return (
        <div
            ref={drawerRef}
            style={{
                position: 'fixed',
                top: 0,
                right: 0,
                height: '100%',
                width: '300px',
                backgroundColor: 'white',
                boxShadow: '-2px 0 5px rgba(0,0,0,0.5)',
                transform: isAnimating ? 'translateX(0)' : 'translateX(100%)',
                opacity: isAnimating ? 1 : 0,
                transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
                zIndex: 1000,
                overflowY: 'auto',
            }}
        >
            {event && (
                <div style={{ padding: '20px' }}>
                    <button onClick={onClose} style={{ float: 'right' }}>Close</button>
                    <h2>{event.title}</h2>
                    <p><strong>Description:</strong> {event.description}</p>
                    <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                    <p><strong>Category:</strong> {event.eventType.name}</p>
                    <p><strong>Location:</strong> {event.Location.name}</p>
                    <p><strong>Organizer:</strong> {event.organiser.name}</p>
                </div>
            )}
        </div>
    );
};

export default Drawer;
