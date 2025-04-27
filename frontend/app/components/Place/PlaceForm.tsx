import React, { useState, useEffect } from 'react';
import { PlaceInput, Place } from '@app/types/place';

interface PlaceFormProps {
  onSubmit: (place: PlaceInput) => void;
  initialValues?: Place;
  salles?: Array<{ id: number; nom: string }>;
}

export const PlaceForm: React.FC<PlaceFormProps> = ({ 
  onSubmit,
  initialValues,
  salles = []
}) => {
  const [formData, setFormData] = useState<PlaceInput>({
    numeroEmplacement: '',
    salleId: 0
  });

  useEffect(() => {
    if (initialValues) {
      setFormData({
        numeroEmplacement: initialValues.numeroEmplacement,
        salleId: initialValues.salleId
      });
    }
  }, [initialValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    if (!initialValues) {
      setFormData({
        numeroEmplacement: '',
        salleId: 0
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label 
          htmlFor="numeroEmplacement" 
          className="block text-sm font-medium text-gray-700"
        >
          Numéro d'emplacement
        </label>
        <input
          type="text"
          id="numeroEmplacement"
          value={formData.numeroEmplacement}
          onChange={(e) => setFormData({ 
            ...formData, 
            numeroEmplacement: e.target.value 
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label 
          htmlFor="salleId" 
          className="block text-sm font-medium text-gray-700"
        >
          Salle
        </label>
        <select
          id="salleId"
          value={formData.salleId}
          onChange={(e) => setFormData({ 
            ...formData, 
            salleId: Number(e.target.value) 
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">Sélectionnez une salle</option>
          {salles.map(salle => (
            <option key={salle.id} value={salle.id}>
              {salle.nom}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {initialValues ? 'Modifier' : 'Ajouter'} la place
      </button>
    </form>
  );
};