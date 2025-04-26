import React from 'react';
import { Utilisateur } from '@app/types/utilisateur';

interface UtilisateurProfileProps {
  utilisateur: Utilisateur;
  onEdit?: () => void;
}

export const UtilisateurProfile: React.FC<UtilisateurProfileProps> = ({
  utilisateur,
  onEdit
}) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {utilisateur.firstName} {utilisateur.name}
          </h2>
          <p className="text-gray-600">{utilisateur.email}</p>
        </div>
        {onEdit && (
          <button
            onClick={onEdit}
            className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-200"
          >
            Modifier le profil
          </button>
        )}
      </div>

      <div className="mt-6">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-500">Rôle:</span>
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
            {utilisateur.role}
          </span>
        </div>
      </div>

      {utilisateur.tickets && utilisateur.tickets.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900">Tickets réservés</h3>
          <p className="text-sm text-gray-500">
            {utilisateur.tickets.length} ticket(s)
          </p>
        </div>
      )}

      {utilisateur.notifs && utilisateur.notifs.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
          <p className="text-sm text-gray-500">
            {utilisateur.notifs.length} notification(s)
          </p>
        </div>
      )}
    </div>
  );
};