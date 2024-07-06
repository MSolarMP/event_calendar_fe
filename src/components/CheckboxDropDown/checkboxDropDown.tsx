import React from 'react';

interface Option {
    id: string;
    name: string;
}

interface CheckboxDropdownProps {
    options: Option[];
    selectedOptions: string[];
    onChange: (selected: string, checked: boolean) => void;
}

const CheckboxDropdown: React.FC<CheckboxDropdownProps> = ({ options, selectedOptions, onChange }) => {
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        onChange(value, checked);
    };

    return (
        <div style={{ marginBottom: '10px' }}>
            {options.map(option => (
                <div key={option.id}>
                    <input
                        type="checkbox"
                        value={option.name}
                        checked={selectedOptions.includes(option.name)}
                        onChange={handleCheckboxChange}
                    />
                    {option.name}
                </div>
            ))}
        </div>
    );
};

export default CheckboxDropdown;
