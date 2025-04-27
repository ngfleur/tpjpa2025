import { HomeScreen } from '@app/components/HomeScreen/HomeScreen';
import { Evenement, StatutEvenement } from '@app/types/evenement';

export default async function Home() {
  // Données de démonstration

  const evenements = [];
  const evenementsDemo: Evenement[] = [
    {
      id: 1,
      titre: "Concert Rock à Paris",
      dateDebut: new Date('2024-04-15T20:00:00'),
      dateFin: new Date('2024-04-15T23:00:00'),
      capacite: 500,
      inscrits: 250,
      statut: StatutEvenement.OUVERT,
      lieu: "Salle Pleyel",
      prix: 45,
      description: "Une soirée rock inoubliable avec des artistes exceptionnels",
      artistes: [
        { id: 1, nom: "Rock Band" },
        { id: 2, nom: "Guitar Heroes" }
      ],
      genreMusicaux: [
        { id: 1, nom: "Rock" },
        { id: 2, nom: "Metal" }
      ]
    },
    {
      id: 2,
      titre: "Festival Jazz",
      dateDebut: new Date('2024-05-01T18:00:00'),
      dateFin: new Date('2024-05-01T23:00:00'),
      capacite: 300,
      inscrits: 150,
      statut: StatutEvenement.OUVERT,
      lieu: "Le New Morning",
      prix: 35,
      description: "Une soirée jazz avec les meilleurs artistes de la scène",
      artistes: [
        { id: 3, nom: "Jazz Quartet" },
        { id: 4, nom: "Blues Band" }
      ],
      genreMusicaux: [
        { id: 3, nom: "Jazz" },
        { id: 4, nom: "Blues" }
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-zinc-900">
      <HomeScreen evenements={evenementsDemo} />
    </main>
  );
}