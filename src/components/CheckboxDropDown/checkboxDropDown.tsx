import React from 'react';

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
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        let updatedOptions = [...selectedOptions];

        if (checked && !updatedOptions.includes(value)) {
            updatedOptions.push(value);
        } else {
            updatedOptions = updatedOptions.filter((option) => option !== value);
        }

        onChange(updatedOptions);
    };

    return (
        <div style={{ position: 'relative' }}>
            <button className="dropdown-btn">Dropdown</button>
            <div className="dropdown-content">
                {options.map((option) => (
                    <label key={option.id}>
                        <input
                            type="checkbox"
                            value={option.name}
                            checked={selectedOptions.includes(option.name)}
                            onChange={handleCheckboxChange}
                        />
                        {option.name}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default CheckboxDropdown;
