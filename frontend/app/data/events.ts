export const events = [
  {
    id: "event123",
    title: "Concert Gala 2024",
    description: "Concert exceptionnel avec les plus grands artistes",
    date: new Date("2024-04-15T20:00:00Z"),
    location: "Zénith de Paris",
    imageUrl: "https://via.placeholder.com/800x400.png?text=Concert+Gala+2024",
    price: [
      { category: "Catégorie 1", amount: 80 },
      { category: "Catégorie 2", amount: 60 }
    ],
    availableSeats: 450,
    totalSeats: 1000
  },
  {
    id: "event124",
    title: "Festival d'Été",
    description: "Le plus grand festival de l'été",
    date: new Date("2024-07-20T18:00:00Z"),
    location: "Parc des Expositions",
    imageUrl: "https://via.placeholder.com/800x400.png?text=Festival+Été",
    price: [
      { category: "Pass 1 jour", amount: 45 },
      { category: "Pass 2 jours", amount: 80 }
    ],
    availableSeats: 2000,
    totalSeats: 5000
  }
] as const;

export type EventId = (typeof events)[number]["id"];
export type Event = (typeof events)[number];