'use client';
import { Badge } from 'flowbite-react';
import { useCallback, useEffect, useState } from 'react';
import { Evenement, StatutEvenement } from '@app/types/evenement';
import { Place } from '@app/types/place';

interface TicketTableProps {
  evenement: Evenement;
  places: Place[];
}

interface SelectedTicket {
  placeId: number;
  prix: number;
}

export function TicketsTable({ evenement, places }: TicketTableProps) {
  const [selectedTickets, setSelectedTickets] = useState<Record<number, SelectedTicket>>({});
  const [subTotal, setSubTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Calcul du sous-total
  useEffect(() => {
    const total = Object.values(selectedTickets).reduce(
      (acc, ticket) => acc + ticket.prix,
      0
    );
    setSubTotal(total);
  }, [selectedTickets]);

  // Sélection/Désélection d'une place
  const togglePlace = (place: Place) => {
    setSelectedTickets((prev) => {
      const newSelection = { ...prev };
      if (newSelection[place.id]) {
        delete newSelection[place.id];
      } else {
        newSelection[place.id] = {
          placeId: place.id,
          prix: evenement.prix
        };
      }
      return newSelection;
    });
    setError(null);
  };

  // Création de la réservation
  const createReservation = async () => {
    if (Object.keys(selectedTickets).length === 0) {
      setError('Veuillez sélectionner au moins une place');
      return;
    }

    setLoading(true);
    try {
      // Ici, ajoutez votre logique de création de réservation
      // Par exemple :
      /*
      const tickets = Object.values(selectedTickets).map(ticket => ({
        prixPaye: ticket.prix,
        placeId: ticket.placeId,
        evenementId: evenement.id,
        utilisateurId: currentUser.id // À obtenir depuis votre contexte d'authentification
      }));

      await createTickets(tickets);
      */
      
      // Redirection vers la page de succès
      window.location.href = '/reservation-success';
    } catch (e) {
      setError('Une erreur est survenue lors de la réservation');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const isPlaceAvailable = (place: Place) => {
    // Logique pour vérifier si la place est disponible
    return true; // À modifier selon votre logique
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {places.map((place) => (
          <div
            key={place.id}
            className={`p-4 border rounded-lg ${
              selectedTickets[place.id] ? 'border-primary bg-primary/10' : ''
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">Place {place.numeroEmplacement}</h3>
                <p className="text-sm text-gray-600">{evenement.prix}€</p>
              </div>
              {isPlaceAvailable(place) ? (
                <button
                  onClick={() => togglePlace(place)}
                  className={`px-4 py-2 rounded ${
                    selectedTickets[place.id]
                      ? 'bg-red-500 text-white'
                      : 'bg-primary text-white'
                  }`}
                >
                  {selectedTickets[place.id] ? 'Retirer' : 'Sélectionner'}
                </button>
              ) : (
                <Badge color="gray">Indisponible</Badge>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 md:relative md:mt-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-lg">{subTotal}€</span>
          </div>
          
          <button
            onClick={createReservation}
            disabled={loading || Object.keys(selectedTickets).length === 0}
            className="w-full bg-primary text-white py-3 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {loading ? 'Traitement...' : 'Réserver'}
          </button>
          
          {error && (
            <p className="mt-2 text-red-500 text-center">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}