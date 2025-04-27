import React, { useState } from 'react';
import { TicketInput } from '@app/types/ticket';

interface TicketFormProps {
  onSubmit: (ticket: TicketInput) => void;
  evenementId?: number;
  placeId?: number;
  utilisateurId?: number;
  prixSuggere?: number;
}

export const TicketForm: React.FC<TicketFormProps> = ({
  onSubmit,
  evenementId,
  placeId,
  utilisateurId,
  prixSuggere
}) => {
  const [formData, setFormData] = useState<TicketInput>({
    prixPaye: prixSuggere || 0,
    utilisateurId: utilisateurId || 0,
    placeId: placeId || 0,
    evenementId: evenementId || 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label 
          htmlFor="prixPaye" 
          className="block text-sm font-medium text-gray-700"
        >
          Prix à payer
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            type="number"
            step="0.01"
            id="prixPaye"
            value={formData.prixPaye}
            onChange={(e) => setFormData({ 
              ...formData, 
              prixPaye: parseFloat(e.target.value) 
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
            min="0"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">€</span>
          </div>
        </div>
      </div>

      {!utilisateurId && (
        <div>
          <label 
            htmlFor="utilisateurId" 
            className="block text-sm font-medium text-gray-700"
          >
            ID Utilisateur
          </label>
          <input
            type="number"
            id="utilisateurId"
            value={formData.utilisateurId || ''}
            onChange={(e) => setFormData({ 
              ...formData, 
              utilisateurId: parseInt(e.target.value) 
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      )}

      {!placeId && (
        <div>
          <label 
            htmlFor="placeId" 
            className="block text-sm font-medium text-gray-700"
          >
            ID Place
          </label>
          <input
            type="number"
            id="placeId"
            value={formData.placeId || ''}
            onChange={(e) => setFormData({ 
              ...formData, 
              placeId: parseInt(e.target.value) 
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      )}

      {!evenementId && (
        <div>
          <label 
            htmlFor="evenementId" 
            className="block text-sm font-medium text-gray-700"
          >
            ID Événement
          </label>
          <input
            type="number"
            id="evenementId"
            value={formData.evenementId || ''}
            onChange={(e) => setFormData({ 
              ...formData, 
              evenementId: parseInt(e.target.value) 
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      )}

      <button
        type="submit"
        className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Réserver le ticket
      </button>
    </form>
  );
};