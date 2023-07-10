import React, { ChangeEvent } from "react";

interface TextFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextField;
