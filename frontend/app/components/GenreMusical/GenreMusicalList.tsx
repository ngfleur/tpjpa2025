import React from 'react';
import { GenreMusical } from '@app/types/genreMusical';

interface GenreMusicalListProps {
  genres: GenreMusical[];
  onEdit?: (genre: GenreMusical) => void;
  onDelete?: (id: number) => void;
}

export const GenreMusicalList: React.FC<GenreMusicalListProps> = ({ 
  genres, 
  onEdit, 
  onDelete 
}) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {genres.map((genre) => (
        <div 
          key={genre.id} 
          className="bg-white rounded-lg shadow p-4 flex justify-between items-center"
        >
          <span className="text-lg font-medium">{genre.nom}</span>
          
          <div className="flex gap-2">
            {onEdit && (
              <button
                onClick={() => onEdit(genre)}
                className="text-blue-600 hover:text-blue-800 p-2"
              >
                Modifier
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(genre.id)}
                className="text-red-600 hover:text-red-800 p-2"
              >
                Supprimer
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};