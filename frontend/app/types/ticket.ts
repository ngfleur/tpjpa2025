export interface Ticket {
  id: number;
  prixPaye: number;
  utilisateurId: number;
  placeId: number;
  evenementId: number;
}
export interface TicketInput {
  prixPaye: number;
  utilisateurId: number;
  placeId: number;
  evenementId: number;
}