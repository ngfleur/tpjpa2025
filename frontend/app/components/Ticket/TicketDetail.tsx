import React from 'react';
import { Ticket } from '@app/types/ticket';

interface TicketDetailProps {
  ticket: Ticket;
  onCancel?: () => void;
  evenementDetails?: { nom: string };
  placeDetails?: { numeroEmplacement: string };
  utilisateurDetails?: { name: string; firstName: string };
}

export const TicketDetail: React.FC<TicketDetailProps> = ({
  ticket,
  onCancel,
  evenementDetails,
  placeDetails,
  utilisateurDetails
}) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Détails du ticket #{ticket.id}
          </h3>
          {evenementDetails && (
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {evenementDetails.nom}
            </p>
          )}
        </div>
        {onCancel && (
          <button
            onClick={onCancel}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200"
          >
            Annuler le ticket
          </button>
        )}
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Prix payé</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {ticket.prixPaye.toFixed(2)} €
            </dd>
          </div>
          {utilisateurDetails && (
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Client</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {utilisateurDetails.firstName} {utilisateurDetails.name}
              </dd>
            </div>
          )}
          {placeDetails && (
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Place</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {placeDetails.numeroEmplacement}
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
};