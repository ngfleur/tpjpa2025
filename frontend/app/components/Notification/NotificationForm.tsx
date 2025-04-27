import React, { useState } from 'react';
import { NotificationInput } from '@app/types/notification';

interface NotificationFormProps {
  onSubmit: (notification: NotificationInput) => void;
  evenementId?: number;
}

export const NotificationForm: React.FC<NotificationFormProps> = ({ 
  onSubmit,
  evenementId 
}) => {
  const [formData, setFormData] = useState<NotificationInput>({
    contenu: '',
    evenementId: evenementId || 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ ...formData, contenu: '' }); // Reset contenu after submit
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label 
          htmlFor="contenu" 
          className="block text-sm font-medium text-gray-700"
        >
          Contenu de la notification
        </label>
        <textarea
          id="contenu"
          value={formData.contenu}
          onChange={(e) => setFormData({ ...formData, contenu: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
          placeholder="Saisissez votre message..."
          required
        />
      </div>

      {!evenementId && (
        <div>
          <label 
            htmlFor="evenementId" 
            className="block text-sm font-medium text-gray-700"
          >
            ID de l'événement
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
        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Envoyer la notification
      </button>
    </form>
  );
};