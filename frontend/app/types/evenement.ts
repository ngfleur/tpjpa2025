export enum StatutEvenement {
  OUVERT = "OUVERT",
  COMPLET = "COMPLET",
  EN_COURS = "EN_COURS",
  TERMINE = "TERMINE",
  ANNULE = "ANNULE"
}

export interface Evenement {
  id: number;
  titre: string;
  dateDebut: Date;
  dateFin: Date;
  capacite: number;
  inscrits: number;
  statut: StatutEvenement;
  lieu: string;
  prix: number;
  description: string;
  artistes: Array<{ id: number; nom: string }>;
  genreMusicaux: Array<{ id: number; nom: string }>;
}

export interface EvenementInput {
  titre: string;
  dateDebut: Date;
  dateFin: Date;
  lieu: string;
  prix: number;
  description: string;
  capacite: number;
}