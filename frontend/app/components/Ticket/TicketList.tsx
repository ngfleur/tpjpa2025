import React from 'react';
import { Ticket } from '@app/types/ticket';

interface TicketListProps {
  tickets: Ticket[];
  onSelect?: (ticket: Ticket) => void;
  onCancel?: (id: number) => void;
}

export const TicketList: React.FC<TicketListProps> = ({
  tickets,
  onSelect,
  onCancel
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Numéro
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Prix payé
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Place
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {tickets.map((ticket) => (
            <tr 
              key={ticket.id}
              onClick={() => onSelect?.(ticket)}
              className="hover:bg-gray-50 cursor-pointer"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  #{ticket.id}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {ticket.prixPaye.toFixed(2)} €
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  Place #{ticket.placeId}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {onCancel && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onCancel(ticket.id);
                    }}
                    className="text-red-600 hover:text-red-900"
                  >
                    Annuler
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};