import React from "react";

export default function CitySelector({
  cities,
  selectedCity,
  onChange,
  label,
  disabled,
}) {
  return (
    <div className="city-selector">
      <label>
        {label}:{" "}
        <select
          value={selectedCity || ""}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        >
          <option value="">-- Select --</option>
          {cities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}