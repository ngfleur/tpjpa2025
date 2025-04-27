'use client';
import { useState, useEffect } from 'react';
import { useUI } from '@app/components/Provider/UIContext';

export const CartBag = () => {
  const { setSidebarView, toggleSidebar } = useUI();
  const [ticketCount, setTicketCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Exemple de mise à jour du panier
  // À adapter selon votre logique de gestion d'état
  useEffect(() => {
    // Logique pour récupérer l'état du panier
    // setTicketCount(nombreDeTickets);
    // setTotalPrice(prixTotal);
  }, []);

  return (
    <button
      onClick={() => {
        setSidebarView('PANIER');
        toggleSidebar();
      }}
      className="flex relative items-center gap-2"
      aria-label={`Panier : ${ticketCount} billet${ticketCount > 1 ? 's' : ''}`}
    >
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        ></path>
      </svg>
      {!isLoading && ticketCount > 0 && (
        <>
          <span className="font-bold text-xs absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
            {ticketCount}
          </span>
          <span className="hidden sm:inline-block text-sm">
            {totalPrice.toFixed(2)}€
          </span>
        </>
      )}
    </button>
  );
};