import React from 'react';
import { Salle } from '@app/types/salle';
import { PlaceGrid } from '../Place/PlaceGrid';

interface SalleDetailProps {
  salle: Salle;
  onPlaceSelect?: (placeId: number) => void;
  selectedPlaceId?: number;
}

export const SalleDetail: React.FC<SalleDetailProps> = ({ 
  salle,
  onPlaceSelect,
  selectedPlaceId 
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">{salle.name}</h2>
        <p className="text-gray-600 mb-6">
          <span className="font-medium">Adresse :</span> {salle.adresseSalle}
        </p>
        
        {salle.places && salle.places.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Plan de la salle</h3>
            <PlaceGrid
              places={salle.places}
              onSelect={place => onPlaceSelect?.(place.id)}
              selectedPlaceId={selectedPlaceId}
            />
          </div>
        )}
      </div>
    </div>
  );
};