import React from 'react';
import { GenreMusical } from '@app/types/genreMusical';

interface GenreMusicalSelectProps {
  genres: GenreMusical[];
  selectedGenres: number[];
  onChange: (selectedIds: number[]) => void;
  multiple?: boolean;
}

export const GenreMusicalSelect: React.FC<GenreMusicalSelectProps> = ({
  genres,
  selectedGenres,
  onChange,
  multiple = true
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const values = multiple 
      ? Array.from(e.target.selectedOptions).map(option => Number(option.value))
      : [Number(e.target.value)];
    onChange(values);
  };

  return (
    <div>
      <label 
        htmlFor="genres" 
        className="block text-sm font-medium text-gray-700"
      >
        Genres musicaux
      </label>
      <select
        id="genres"
        multiple={multiple}
        value={selectedGenres.map(String)}
        onChange={handleChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        {genres.map(genre => (
          <option key={genre.id} value={genre.id}>
            {genre.nom}
          </option>
        ))}
      </select>
    </div>
  );
};