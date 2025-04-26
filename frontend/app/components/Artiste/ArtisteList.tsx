// app/components/Artiste/ArtisteList.tsx
import React from 'react';
import { Artiste } from '@app/types/artistes';

interface ArtisteListProps {
  artistes: Artiste[];
}

export const ArtisteList: React.FC<ArtisteListProps> = ({ artistes }) => {
  return (
    <div className="grid gap-4">
      {artistes.map((artiste) => (
        <div key={artiste.id} className="p-4 border rounded shadow">
          <h3 className="text-lg font-semibold">{artiste.nom}</h3>
        </div>
      ))}
    </div>
  );
};