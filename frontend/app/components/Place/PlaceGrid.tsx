import React from 'react';
import { Place } from '@app/types/place';

interface PlaceGridProps {
  places: Place[];
  onSelect?: (place: Place) => void;
  selectedPlaceId?: number;
}

export const PlaceGrid: React.FC<PlaceGridProps> = ({ 
  places,
  onSelect,
  selectedPlaceId
}) => {
  // Grouper les places par rangées (en supposant que le numéro d'emplacement commence par une lettre pour la rangée)
  const placesByRow = places.reduce((acc, place) => {
    const row = place.numeroEmplacement.charAt(0);
    if (!acc[row]) {
      acc[row] = [];
    }
    acc[row].push(place);
    return acc;
  }, {} as Record<string, Place[]>);

  return (
    <div className="space-y-4">
      {Object.entries(placesByRow).map(([row, rowPlaces]) => (
        <div key={row} className="flex gap-2 justify-center">
          <span className="w-8 text-center font-bold">{row}</span>
          <div className="flex gap-2">
            {rowPlaces.map((place) => (
              <button
                key={place.id}
                onClick={() => onSelect?.(place)}
                className={`
                  w-10 h-10 rounded-md flex items-center justify-center
                  ${selectedPlaceId === place.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200'
                  }
                `}
              >
                {place.numeroEmplacement.slice(1)}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};