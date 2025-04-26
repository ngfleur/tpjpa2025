import React, { useState, useEffect } from 'react';
import { SalleInput, Salle } from '@app/types/salle';

interface SalleFormProps {
  onSubmit: (salle: SalleInput) => void;
  initialValues?: Salle;
}

export const SalleForm: React.FC<SalleFormProps> = ({ 
  onSubmit,
  initialValues 
}) => {
  const [formData, setFormData] = useState<SalleInput>({
    name: '',
    adresseSalle: ''
  });

  useEffect(() => {
    if (initialValues) {
      setFormData({
        name: initialValues.name,
        adresseSalle: initialValues.adresseSalle
      });
    }
  }, [initialValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    if (!initialValues) {
      setFormData({ name: '', adresseSalle: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label 
          htmlFor="name" 
          className="block text-sm font-medium text-gray-700"
        >
          Nom de la salle
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label 
          htmlFor="adresseSalle" 
          className="block text-sm font-medium text-gray-700"
        >
          Adresse
        </label>
        <textarea
          id="adresseSalle"
          value={formData.adresseSalle}
          onChange={(e) => setFormData({ 
            ...formData, 
            adresseSalle: e.target.value 
          })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {initialValues ? 'Modifier' : 'Ajouter'} la salle
      </button>
    </form>
  );
};