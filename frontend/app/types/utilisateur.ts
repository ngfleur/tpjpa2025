export enum RoleUtilisateur {
  ADMIN = 'ADMIN',
  ORGANISATEUR = 'ORGANISATEUR',
  PARTICIPANT = 'PARTICIPANT'
}

export interface Utilisateur {
  id: number;
  name: string;
  firstName: string;
  email: string;
  role: RoleUtilisateur;
  tickets?: number[];
  notifs?: number[];
}

export interface UtilisateurInput {
  name: string;
  firstName: string;
  email: string;
  role: RoleUtilisateur;
}