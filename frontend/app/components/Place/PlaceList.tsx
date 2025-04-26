import React from 'react';
import { Place } from '@app/types/place';

interface PlaceListProps {
  places: Place[];
  onEdit?: (place: Place) => void;
  onDelete?: (id: number) => void;
}

export const PlaceList: React.FC<PlaceListProps> = ({ 
  places,
  onEdit,
  onDelete
}) => {
  return (
    <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-6">
      {places.map((place) => (
        <div 
          key={place.id}
          className="bg-white rounded-lg shadow p-4 flex flex-col"
        >
          <div className="text-center mb-2">
            <span className="text-xl font-bold">
              {place.numeroEmplacement}
            </span>
            <p className="text-sm text-gray-500">
              Salle: {place.salleId}
            </p>
          </div>

          {(onEdit || onDelete) && (
            <div className="flex justify-center gap-2 mt-2">
              {onEdit && (
                <button
                  onClick={() => onEdit(place)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Modifier
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(place.id)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Supprimer
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};