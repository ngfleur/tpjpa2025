// components/Cart/CartItem.tsx
import React from 'react';
import { Ticket } from '@app/types/ticket';
import { Evenement } from '@app/types/evenement';
import { Place } from '@app/types/place';

interface CartItemProps {
  ticket: Ticket;
  evenement: Evenement;
  place: Place;
  onRemove: (id: number) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  ticket,
  evenement,
  place,
  onRemove,
}) => {
  return (
    <div className="flex flex-col p-4 border-b">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{evenement.titre}</h3>
          <p className="text-sm text-gray-600">
            {new Date(evenement.dateDebut).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600">
            Lieu: {evenement.lieu}
          </p>
          <p className="text-sm text-gray-600">
            Place: {place.numeroEmplacement}
          </p>
        </div>
        <div className="text-right">
          <p>{ticket.prixPaye}€</p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-600">
          Statut: {evenement.statut}
        </div>
        <button
          onClick={() => onRemove(ticket.id)}
          className="text-red-600 hover:text-red-800"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
};