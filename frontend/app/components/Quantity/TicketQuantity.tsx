import React, { FC } from 'react';

export interface TicketQuantityProps {
  value: number;
  onChange: (quantity: number) => void;
  maxPlaces: number;
  placesDisponibles: number;
  size?: 'sm' | 'md';
}



export const TicketQuantity: FC<TicketQuantityProps> = ({
  value,
  onChange,
  maxPlaces,
  placesDisponibles,
  size = 'md',
}) => {
  const max = Math.min(maxPlaces, placesDisponibles);

  const increase = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const decrease = () => {
    if (value > 1) {
      onChange(value - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue) && newValue >= 1 && newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <div
        className={`${
          size === 'sm' ? 'h-7' : 'h-9'
        } flex flex-row relative w-24 border-gray-300 border rounded-md bg-white`}
      >
        <label className="w-full">
          <input
            className={`${
              size === 'sm' ? 'text-xs' : 'text-sm'
            } px-2 w-full h-full border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md`}
            onChange={handleInputChange}
            pattern="[0-9]*"
            aria-label="Nombre de places"
            value={value}
            type="number"
            max={max}
            min="1"
          />
        </label>
        <div className="absolute right-1 top-[3px]">
          <button
            type="button"
            onClick={increase}
            className="flex p-0.5 items-center justify-center text-black hover:bg-gray-100 rounded disabled:text-gray-300"
            disabled={value >= max}
          >
            <svg
              className={`${size === 'sm' ? 'w-2 h-2' : 'w-3 h-3'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              ></path>
            </svg>
          </button>
          <button
            type="button"
            onClick={decrease}
            className="flex p-0.5 items-center justify-center text-black hover:bg-gray-100 rounded disabled:text-gray-300"
            disabled={value <= 1}
          >
            <svg
              className={`${size === 'sm' ? 'w-2 h-2' : 'w-3 h-3'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        {placesDisponibles} places disponibles
      </p>
    </div>
  );
};