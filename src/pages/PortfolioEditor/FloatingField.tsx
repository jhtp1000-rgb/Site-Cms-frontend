import { useState } from 'react';

interface FloatingFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  color: string;
  type?: string;
  multiline?: boolean;
  rows?: number;
  required?: boolean;
}

export function FloatingField({
  label,
  value,
  onChange,
  color,
  type = 'text',
  multiline = false,
  rows = 3,
  required = false,
}: FloatingFieldProps) {
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;

  const sharedStyle: React.CSSProperties = {
    borderColor: focused ? color : '#e2e8f0',
    boxShadow: focused ? `0 0 0 4px ${color}18, 0 2px 8px ${color}0d` : 'none',
  };

  const sharedClassName = `peer w-full border rounded-2xl px-3.5 text-sm outline-none bg-white transition-all duration-200 ${
    multiline ? `pt-6 pb-2.5 resize-y` : 'pt-5 pb-2 h-[52px]'
  }`;

  return (
    <div className="relative">
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          rows={rows}
          className={sharedClassName}
          style={sharedStyle}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          className={sharedClassName}
          style={sharedStyle}
        />
      )}
      <label
        className="absolute left-3.5 pointer-events-none transition-all duration-200 ease-out"
        style={{
          top: floated ? 8 : multiline ? 16 : '50%',
          transform: floated || multiline ? 'translateY(0)' : 'translateY(-50%)',
          fontSize: floated ? 10.5 : 13.5,
          fontWeight: floated ? 700 : 400,
          color: focused ? color : '#94a3b8',
          letterSpacing: floated ? '0.04em' : 'normal',
          textTransform: floated ? 'uppercase' : 'none',
        }}
      >
        {label}
      </label>
    </div>
  );
}
