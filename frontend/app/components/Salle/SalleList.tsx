import React from 'react';
import { Salle } from '@app/types/salle';

interface SalleListProps {
  salles: Salle[];
  onSelect?: (salle: Salle) => void;
  onEdit?: (salle: Salle) => void;
  onDelete?: (id: number) => void;
}

export const SalleList: React.FC<SalleListProps> = ({ 
  salles,
  onSelect,
  onEdit,
  onDelete 
}) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {salles.map((salle) => (
        <div 
          key={salle.id}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div 
            className="p-6 cursor-pointer hover:bg-gray-50"
            onClick={() => onSelect?.(salle)}
          >
            <h3 className="text-xl font-semibold mb-2">{salle.name}</h3>
            <p className="text-gray-600 mb-4">
              <span className="font-medium">Adresse :</span> {salle.adresseSalle}
            </p>
            {salle.places && (
              <p className="text-sm text-gray-500">
                {salle.places.length} places disponibles
              </p>
            )}
          </div>

          {(onEdit || onDelete) && (
            <div className="border-t px-6 py-3 bg-gray-50 flex justify-end gap-4">
              {onEdit && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(salle);
                  }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Modifier
                </button>
              )}
              {onDelete && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(salle.id);
                  }}
                  className="text-red-600 hover:text-red-800"
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