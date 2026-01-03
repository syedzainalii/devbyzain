'use client';

export default function Input({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  name,
  required = false,
  className = ''
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      required={required}
      className={`input-field ${className}`}
    />
  );
}

export function TextArea({ 
  placeholder, 
  value, 
  onChange, 
  name,
  required = false,
  rows = 4,
  className = ''
}) {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      required={required}
      rows={rows}
      className={`textarea-field ${className}`}
    />
  );
}
