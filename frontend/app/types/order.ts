// types/order.ts
import { Ticket } from './ticket';
import { Evenement } from './evenement';
import { Place } from './place';

export interface OrderTicket extends Ticket {
  evenement: Evenement;
  place: Place;
}

export interface Order {
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