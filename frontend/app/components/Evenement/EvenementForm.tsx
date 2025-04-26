import React, { useState } from 'react';
import { EvenementInput } from '@app/types/evenement';
import { format } from 'date-fns';

interface EvenementFormProps {
  onSubmit: (evenement: EvenementInput) => void;
  initialValues?: Partial<EvenementInput>;
}

export const EvenementForm: React.FC<EvenementFormProps> = ({ onSubmit, initialValues = {} }) => {
  const [formData, setFormData] = useState<EvenementInput>({
    titre: initialValues.titre || '',
    dateDebut: initialValues.dateDebut || new Date(),
    dateFin: initialValues.dateFin || new Date(),
    lieu: initialValues.lieu || '',
    prix: initialValues.prix || 0,
    description: initialValues.description || '',
    capacite: initialValues.capacite || 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="titre" className="block text-sm font-medium">Titre</label>
        <input
          type="text"
          id="titre"
          value={formData.titre}
          onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="dateDebut" className="block text-sm font-medium">Date de début</label>
          <input
            type="datetime-local"
            id="dateDebut"
            value={format(formData.dateDebut, "yyyy-MM-dd'T'HH:mm")}
            onChange={(e) => setFormData({ ...formData, dateDebut: new Date(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="dateFin" className="block text-sm font-medium">Date de fin</label>
          <input
            type="datetime-local"
            id="dateFin"
            value={format(formData.dateFin, "yyyy-MM-dd'T'HH:mm")}
            onChange={(e) => setFormData({ ...formData, dateFin: new Date(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>
      </div>

      {/* Autres champs du formulaire */}
      
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Enregistrer
      </button>
    </form>
  );
};