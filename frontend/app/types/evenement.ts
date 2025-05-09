export interface Evenement {
    id: number;
    titre: string;
    dateDebut: Date | string;
    dateFin: Date | string;
    capacite: number;
    inscrits: number;
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
    artistes?: { id: number }[];
    genreMusicaux?: { id: number }[];
}