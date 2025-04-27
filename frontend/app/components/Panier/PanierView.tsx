'use client';
import React from 'react';
import { useUI } from '@app/components/Provider/UIContext';
import { useState } from 'react';
import { Evenement } from 'app/types/evenement';
import { Ticket } from 'app/types/ticket';
import { Place } from 'app/types/place';

interface PanierItem {
  id: number;
  evenement: Evenement;
  place: Place;
  ticket: Ticket;
}

export const PanierView = () => {
  const { closeSidebar } = useUI();
  const [items, setItems] = useState<PanierItem[]>([]); 
  
  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.ticket.prixPaye, 0);
  };

  const handleRemoveItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    // Logique de paiement ici
    console.log('Procéder au paiement', items);
  };

  const CartItem: React.FC<{
    item: PanierItem;
    onRemove: (id: number) => void;
  }> = ({ item, onRemove }) => (
    <div className="p-4 flex items-start space-x-4">
      <div className="flex-grow">
        <h3 className="font-semibold">{item.evenement.titre}</h3>
        <p className="text-sm text-gray-500">
          {new Date(item.evenement.dateDebut).toLocaleDateString('fr-FR')}
        </p>
        <p className="text-sm">Place: {item.place.numeroEmplacement}</p>
        <p className="font-medium mt-1">{item.ticket.prixPaye}€</p>
      </div>
      <button
        onClick={() => onRemove(item.id)}
        className="text-red-500 hover:text-red-700"
      >
        Supprimer
      </button>
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        {items.length === 0 ? (
          <div className="p-4 text-center">
            <p className="text-gray-500">Votre panier est vide</p>
            <button
              onClick={closeSidebar}
              className="mt-4 text-primary hover:underline"
            >
              Continuer mes achats
            </button>
          </div>
        ) : (
          <div className="divide-y">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={handleRemoveItem}
              />
            ))}
          </div>
        )}
      </div>
      
      {items.length > 0 && (
        <div className="border-t p-4 bg-white">
          <div className="flex justify-between mb-4">
            <span>Total</span>
            <span className="font-semibold">{calculateTotal().toFixed(2)}€</span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary-dark transition-colors"
          >
            Procéder au paiement
          </button>
        </div>
      )}
    </div>
  );
};