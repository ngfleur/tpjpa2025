// app/components/OrderView/OrderView.tsx
import React from 'react';
import { CartItem } from '@app/components/CartItem/CartItem';
import { Evenement } from '@app/types/evenement';
import { Place } from '@app/types/place';
import { Ticket } from '@app/types/ticket';

interface OrderTicket extends Ticket {
  evenement: Evenement;
  place: Place;
}

interface Order {
  id: number;
  dateCommande: Date;
  utilisateur: {
    id: number;
    nom: string;
    prenom: string;
    email: string;
  };
  tickets: OrderTicket[];
  total: number;
}

interface OrderViewProps {
  order: Order | undefined;
}

export function OrderView({ order }: OrderViewProps) {
  if (!order) {
    return null;
  }

  return (
    <div className="mx-auto px-14">
      <h2 className="text-center">
        Merci pour votre achat {order.utilisateur.prenom}{' '}
        {order.utilisateur.nom}
      </h2>
      <div className="flex-1 px-24 py-10 flex flex-col justify-center items-center">
        Vous avez acheté :
        <ul className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-accent-2 border-b w-full">
          {order.tickets.map((ticket) => (
            <CartItem
              key={ticket.id}
              ticket={ticket}
              evenement={ticket.evenement}
              place={ticket.place}
              onRemove={() => {}} // Fonction vide car pas de suppression possible après commande
            />
          ))}
        </ul>
        <div className="mt-6">
          <p className="font-medium">Total : {order.total}€</p>
          <p className="text-sm text-gray-600">
            Date de commande : {new Date(order.dateCommande).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600">
            Email de confirmation envoyé à : {order.utilisateur.email}
          </p>
        </div>
      </div>
    </div>
  );
}