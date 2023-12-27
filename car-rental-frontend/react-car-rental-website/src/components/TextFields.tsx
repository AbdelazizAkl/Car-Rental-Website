import React from "react";

interface TextFieldProps {
  label: string; // <-- Add type annotation here
  type: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextFields: React.FC<TextFieldProps> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
}) => {
  // <-- Add label here
  return (
    <div className="form-group">
      <label htmlFor={type}>{label}</label>
      <input
        type={type}
        id={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextFields;
