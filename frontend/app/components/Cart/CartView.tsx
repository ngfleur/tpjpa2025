'use client';
import React, { useState, useEffect } from 'react';
import { Spinner } from 'flowbite-react';
import { useUI } from '@app/components/Provider/UIContext';

// Définition des types
interface Evenement {
  id: number;
  titre: string;
  dateDebut: Date;
  dateFin: Date;
  lieu: string;
  prix: number;
  capacite: number;
  inscrits: number;
  statut: 'OUVERT' | 'COMPLET' | 'EN_COURS' | 'TERMINE' | 'ANNULE';
}

interface Place {
  id: number;
  numero: string;
}

interface Ticket {
  id: number;
  prixPaye: number;
  evenement: Evenement;
  place: Place;
  quantity: number;
}

// Interface pour l'événement personnalisé
interface CustomEventMap {
  'updateCartCount': CustomEvent<{ count: number }>;
}

declare global {
  interface WindowEventMap extends CustomEventMap {}
}

export const CartView = ({ layout = 'mini' }: { layout?: 'full' | 'mini' }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [redirecting, setRedirecting] = useState<boolean>(false);
  const { closeSidebar } = useUI();

  useEffect(() => {
    fetchCartTickets();
  }, []);

  const fetchCartTickets = async () => {
    try {
      const response = await fetch('/api/panier/tickets');
      if (!response.ok) throw new Error('Erreur lors du chargement du panier');
      const data = await response.json();
      setTickets(data);
    } catch (err) {
      setError('Impossible de charger le panier');
    } finally {
      setIsLoading(false);
    }
  };

  const updateTicketCount = (newCount: number) => {
    const event = new CustomEvent('updateCartCount', { 
      detail: { count: newCount } 
    });
    window.dispatchEvent(event);
  };

  const updateQuantity = async (ticketId: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    try {
      const response = await fetch(`/api/panier/tickets/${ticketId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (!response.ok) throw new Error('Erreur de mise à jour');

      const updatedTickets = tickets.map(t => 
        t.id === ticketId ? { ...t, quantity: newQuantity } : t
      );
      setTickets(updatedTickets);
      
      const totalCount = updatedTickets.reduce((sum, t) => sum + t.quantity, 0);
      updateTicketCount(totalCount);
    } catch (err) {
      setError('Impossible de mettre à jour la quantité');
    }
  };

  const removeTicket = async (ticketId: number) => {
    try {
      const response = await fetch(`/api/panier/tickets/${ticketId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Erreur de suppression');

      const updatedTickets = tickets.filter(t => t.id !== ticketId);
      setTickets(updatedTickets);
      
      const totalCount = updatedTickets.reduce((sum, t) => sum + t.quantity, 0);
      updateTicketCount(totalCount);
    } catch (err) {
      setError('Impossible de supprimer le ticket');
    }
  };

  const handleCheckout = async () => {
    setRedirecting(true);
    try {
      const response = await fetch('/api/checkout/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tickets }),
      });

      if (!response.ok) throw new Error('Erreur lors du paiement');

      const { redirectUrl } = await response.json();
      window.location.href = redirectUrl;
    } catch (err) {
      setError('Erreur lors de la finalisation de la commande');
      setRedirecting(false);
    }
  };

  const calculateTotal = () => {
    return tickets.reduce((sum, ticket) => sum + (ticket.prixPaye * ticket.quantity), 0);
  };

  const isMini = layout === 'mini';

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner aria-label="Chargement du panier" />
      </div>
    );
  }

  return (
    <div className={`${!isMini ? 'max-w-6xl mx-auto' : ''}`}>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="relative">
        {isMini && (
          <button
            onClick={closeSidebar}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
        <h1 className="text-2xl font-bold text-center py-6">
          Mon Panier ({tickets.reduce((sum, t) => sum + t.quantity, 0)} tickets)
        </h1>
      </div>

      {tickets.length > 0 ? (
        <>
          <div className="space-y-4 px-4">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="border rounded-lg p-4 bg-white shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{ticket.evenement.titre}</h3>
                    <p className="text-gray-600">
                      {new Date(ticket.evenement.dateDebut).toLocaleDateString()} à {ticket.evenement.lieu}
                    </p>
                    <p className="text-gray-600">
                      Place: {ticket.place.numero}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{ticket.prixPaye}€ / billet</p>
                    <p className="text-sm text-gray-500">
                      Total: {ticket.prixPaye * ticket.quantity}€
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(ticket.id, ticket.quantity - 1)}
                      className="px-2 py-1 border rounded hover:bg-gray-100"
                      disabled={ticket.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{ticket.quantity}</span>
                    <button
                      onClick={() => updateQuantity(ticket.id, ticket.quantity + 1)}
                      className="px-2 py-1 border rounded hover:bg-gray-100"
                      disabled={ticket.evenement.capacite - ticket.evenement.inscrits <= 0}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeTicket(ticket.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-4 px-4">
            <div className="flex justify-between text-lg font-semibold mb-4">
              <span>Total</span>
              <span>{calculateTotal()}€</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={redirecting}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            >
              {redirecting ? 'Traitement en cours...' : 'Procéder au paiement'}
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <div className="mb-4">
            <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">Votre panier est vide</h2>
          <p className="text-gray-600">
            Découvrez nos événements disponibles{' '}
            <a href="/evenements" className="text-blue-600 hover:underline">
              ici
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export const CartBag = () => {
  const { setSidebarView, toggleSidebar } = useUI();
  const [ticketCount, setTicketCount] = useState(0);

  useEffect(() => {
    const fetchTicketCount = async () => {
      try {
        const response = await fetch('/api/panier/count');
        const { count } = await response.json();
        setTicketCount(count);
      } catch (error) {
        console.error('Erreur lors du chargement du nombre de tickets');
      }
    };

    fetchTicketCount();

    const handleUpdateCount = (event: CustomEvent<{ count: number }>) => {
      setTicketCount(event.detail.count);
    };

    window.addEventListener('updateCartCount', handleUpdateCount);
    return () => {
      window.removeEventListener('updateCartCount', handleUpdateCount);
    };
  }, []);

  return (
    <button
      onClick={() => {
        setSidebarView('PANIER');
        toggleSidebar();
      }}
      className="flex relative"
      aria-label={`Tickets dans le panier: ${ticketCount}`}
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
      {ticketCount > 0 && (
        <span className="font-bold text-xs absolute top-[13px] right-[15px]">
          {ticketCount}
        </span>
      )}
    </button>
  );
};