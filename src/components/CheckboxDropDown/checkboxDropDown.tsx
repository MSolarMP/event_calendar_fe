import React, { useState } from 'react';

interface Option {
    id: string;
    name: string;
}

interface CheckboxDropdownProps {
    options: Option[];
    selectedOptions: string[];
    onChange: (selected: string[]) => void;
}

const CheckboxDropdown: React.FC<CheckboxDropdownProps> = ({ options, selectedOptions, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        if (checked) {
            onChange([...selectedOptions, value]);
        } else {
            onChange(selectedOptions.filter((option) => option !== value));
        }
    };

    return (
        <div style={{ position: 'relative' }}>
            <select multiple={true} value={selectedOptions} onChange={() => {}} onClick={handleToggle}>
                {options.map((option) => (
                    <option key={option.id} value={option.name}>
                        {option.name}
                    </option>
                ))}
            </select>
            {isOpen && (
                <div style={{ position: 'absolute', top: '100%', left: 0, zIndex: 100, backgroundColor: '#ffffff', boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)', borderRadius: '4px', maxHeight: '200px', overflowY: 'auto' }}>
                    {options.map((option) => (
                        <label key={option.id} style={{ display: 'block', padding: '8px 12px', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                value={option.name}
                                checked={selectedOptions.includes(option.name)}
                                onChange={handleOptionChange}
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
