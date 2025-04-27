// app/components/Artiste/ArtisteForm.tsx
import React, { useState } from 'react';
import { ArtisteInput } from '@app/types/artistes';

interface ArtisteFormProps {
  onSubmit: (artiste: ArtisteInput) => void;
  initialValues?: ArtisteInput;
}

export const ArtisteForm: React.FC<ArtisteFormProps> = ({ onSubmit, initialValues = { nom: '' } }) => {
  const [nom, setNom] = useState(initialValues.nom);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ nom });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="nom" className="block text-sm font-medium">
          Nom de l'artiste
        </label>
        <input
          type="text"
          id="nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Enregistrer
      </button>
    </form>
  );
};