'use client';
import React, { useState, useCallback } from 'react';
import { Evenement, StatutEvenement } from '@app/types/evenement';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { TicketQuantity } from 'app/components/Quantity/TicketQuantity';

interface EvenementListProps {
  evenements: Evenement[];
  onReservation?: (evenementId: number, quantity: number) => Promise<void>;
}

interface SelectedTickets {
  [key: string]: string; // Changé en string pour correspondre au type attendu
}

interface LoadingState {
  [key: string]: boolean;
}

export const EvenementList: React.FC<EvenementListProps> = ({ 
  evenements,
  onReservation 
}) => {
  const [selectedTickets, setSelectedTickets] = useState<SelectedTickets>({});
  const [isLoading, setIsLoading] = useState<LoadingState>({});

  const handleQuantityChange = useCallback(
    (evenementId: number, quantity: number) => {
      setSelectedTickets((prev) => ({
        ...prev,
        [evenementId]: quantity,
      }));
    },
    []
  );

  const handleReservation = async (evenementId: number) => {
    try {
      setIsLoading((prev) => ({ ...prev, [evenementId]: true }));

      if (onReservation) {
        const quantity = parseInt(selectedTickets[evenementId] || '1'); // Conversion en number
        await onReservation(evenementId, quantity);
      }

      setSelectedTickets((prev) => {
        const { [evenementId]: _, ...rest } = prev;
        return rest;
      });
    } catch (error) {
      console.error('Erreur lors de la réservation:', error);
    } finally {
      setIsLoading((prev) => ({ ...prev, [evenementId]: false }));
    }
  };

  const renderEvenementDetails = (evenement: Evenement) => (
    <div className="text-sm text-gray-600 space-y-2">
      <p>
        <span className="font-semibold">Date : </span>
        {format(new Date(evenement.dateDebut), 'dd MMMM yyyy HH:mm', { locale: fr })}
      </p>
      <p>
        <span className="font-semibold">Lieu : </span>
        {evenement.lieu}
      </p>
      <p>
        <span className="font-semibold">Prix : </span>
        {evenement.prix}€
      </p>
      <p>
        <span className="font-semibold">Places : </span>
        {evenement.inscrits}/{evenement.capacite}
      </p>
      <div className={`inline-block px-3 py-1 rounded-full text-sm ${getStatutColor(evenement.statut)}`}>
        {evenement.statut}
      </div>
    </div>
  );

  const renderReservationSection = (evenement: Evenement, placesDisponibles: number) => {
    const isEventLoading = isLoading[evenement.id] || false;
    const currentValue = parseInt(selectedTickets[evenement.id] || '1'); // Conversion en number pour value

    return (
      <div className="mt-4">
        <TicketQuantity
          value={currentValue}
          onChange={(quantity) => handleQuantityChange(evenement.id, quantity)}
          maxPlaces={5}
          placesDisponibles={placesDisponibles}
          size="md"
        />
        <button
          className="mt-2 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          disabled={isEventLoading || evenement.statut !== StatutEvenement.OUVERT}
          onClick={() => handleReservation(evenement.id)}
        >
          {isEventLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Réservation en cours...
            </span>
          ) : (
            'Réserver'
          )}
        </button>
      </div>
    );
  };

  const renderEvenement = (evenement: Evenement) => {
    const placesDisponibles = evenement.capacite - evenement.inscrits;
    const canReserve = evenement.statut === StatutEvenement.OUVERT && placesDisponibles > 0;

    return (
      <div key={evenement.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col">
        <div className="flex-grow">
          <h3 className="text-xl font-bold mb-2">{evenement.titre}</h3>
          {renderEvenementDetails(evenement)}
        </div>
        {canReserve && renderReservationSection(evenement, placesDisponibles)}
      </div>
    );
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {evenements.map(renderEvenement)}
    </div>
  );
};

const getStatutColor = (statut: StatutEvenement): string => {
  switch (statut) {
    case StatutEvenement.OUVERT:
      return 'bg-green-100 text-green-800';
    case StatutEvenement.COMPLET:
      return 'bg-red-100 text-red-800';
    case StatutEvenement.EN_COURS:
      return 'bg-blue-100 text-blue-800';
    case StatutEvenement.TERMINE:
      return 'bg-gray-100 text-gray-800';
    case StatutEvenement.ANNULE:
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};