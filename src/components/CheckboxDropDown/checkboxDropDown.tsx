import React, { useState } from 'react';

interface Option {
    id: string;
    name: string;
}

interface Props {
    options: Option[];
    selectedOptions: string[];
    onChange: (selectedOptions: string[]) => void;
}

const CheckboxDropdown: React.FC<Props> = ({ options, selectedOptions, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleCheckboxChange = (optionId: string) => {
        const isSelected = selectedOptions.includes(optionId);
        let updatedOptions: string[];

        if (isSelected) {
            updatedOptions = selectedOptions.filter((id) => id !== optionId);
        } else {
            updatedOptions = [...selectedOptions, optionId];
        }

        onChange(updatedOptions);
    };

    return (
        <div>
            <button onClick={toggleDropdown}>Select Options</button>
            {isOpen && (
                <div style={{ border: '1px solid #ccc', padding: '5px', marginTop: '5px' }}>
                    {options.map((option) => (
                        <div key={option.id}>
                            <input
                                type="checkbox"
                                id={option.id}
                                name={option.name}
                                value={option.id}
                                checked={selectedOptions.includes(option.id)}
                                onChange={() => handleCheckboxChange(option.id)}
                            />
                            <label htmlFor={option.id}>{option.name}</label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CheckboxDropdown;
