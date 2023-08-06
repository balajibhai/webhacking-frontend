import React, { ChangeEvent } from "react";

interface TextFieldProps {
  value: string;
  onChange: (value?: string, name?: string) => void;
  placeholder?: string;
  name?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  value,
  onChange,
  placeholder,
  name,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name) onChange(value, name);
    else onChange(value);
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextField;
