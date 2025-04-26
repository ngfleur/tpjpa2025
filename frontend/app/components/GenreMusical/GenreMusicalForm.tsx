import React, { useState, useEffect } from 'react';
import { GenreMusicalInput, GenreMusical } from '@app/types/genreMusical';

interface GenreMusicalFormProps {
  onSubmit: (genre: GenreMusicalInput) => void;
  initialValues?: GenreMusical;
  isEditing?: boolean;
}

export const GenreMusicalForm: React.FC<GenreMusicalFormProps> = ({
  onSubmit,
  initialValues,
  isEditing = false
}) => {
  const [nom, setNom] = useState('');

  useEffect(() => {
    if (initialValues) {
      setNom(initialValues.nom);
    }
  }, [initialValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ nom });
    if (!isEditing) {
      setNom(''); // Réinitialiser le formulaire après la soumission si ce n'est pas une édition
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label 
          htmlFor="nom" 
          className="block text-sm font-medium text-gray-700"
        >
          Nom du genre musical
        </label>
        <input
          type="text"
          id="nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Ex: Rock, Jazz, Hip-Hop..."
          required
        />
      </div>

      <button
        type="submit"
        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {isEditing ? 'Modifier' : 'Ajouter'}
      </button>
    </form>
  );
};