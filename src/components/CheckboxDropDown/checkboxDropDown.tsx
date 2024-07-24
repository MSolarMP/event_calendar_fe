import React, { useState, useEffect, useRef } from 'react';

interface CheckboxDropdownProps {
    options: { id: number; name: string }[];
    selectedOptions: number[];
    onChange: (id: number, checked: boolean) => void;
    placeholder: string;
}

const CheckboxDropdown: React.FC<CheckboxDropdownProps> = ({ options, selectedOptions, onChange, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleChange = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(id, event.target.checked);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} style={{ position: 'relative', marginBottom: '10px' }}>
            <button onClick={handleToggle} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', background: '#fff' }}>
                {selectedOptions.length > 0 ? (
                    options
                        .filter(option => selectedOptions.includes(option.id))
                        .map(option => option.name)
                        .join(', ')
                ) : (
                    placeholder
                )}
            </button>
            {isOpen && (
                <div style={{ position: 'absolute', zIndex: 1, background: '#fff', border: '1px solid #ccc', padding: '10px', width: 'max-content' }}>
                    {options.map(option => (
                        <label key={option.id} style={{ display: 'block' }}>
                            <input
                                type="checkbox"
                                checked={selectedOptions.includes(option.id)}
                                onChange={(e) => handleChange(option.id, e)}
                            />
                            {option.name}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CheckboxDropdown;
