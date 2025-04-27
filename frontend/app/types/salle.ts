import { Place } from '@app/types/place';

export interface Salle {
  id: number;
  name: string;
  adresseSalle: string;
  places?: Place[];
}

export interface SalleInput {
  name: string;
  adresseSalle: string;
}