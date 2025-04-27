'use client';

import { useState } from 'react';
import Image from 'next/image';
import { StatutEvenement } from '@app/types/evenement';
import { useUI } from '@app/components/Provider/UIContext';
import Header from '@components/Layout/Header';
import Footer from '@components/Layout/Footer';

export default function EvenementPage({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useUI();

  // Pour la démo, on utilise les mêmes données que dans la page d'accueil
  // Dans un cas réel, vous feriez un appel API pour récupérer les détails de l'événement
  const evenementsDemo = [
    {
      id: 1,
      titre: 'Concert Rock à Paris',
      dateDebut: new Date('2024-04-15T20:00:00'),
      dateFin: new Date('2024-04-15T23:00:00'),
      capacite: 500,
      inscrits: 250,
      statut: StatutEvenement.OUVERT,
      lieu: 'Salle Pleyel',
      prix: 45,
      description:
        'Une soirée rock inoubliable avec des artistes exceptionnels',
      artistes: [
        { id: 1, nom: 'Rock Band' },
        { id: 2, nom: 'Guitar Heroes' },
      ],
      genreMusicaux: [
        { id: 1, nom: 'Rock' },
        { id: 2, nom: 'Metal' },
      ],
    },
    // ... autres événements
  ];

  const evenement = evenementsDemo.find((e) => e.id === parseInt(params.id));

  if (!evenement) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white p-8">
        Événement non trouvé
      </div>
    );
  }

  const handleAchatTicket = async () => {
    setIsLoading(true);
    try {
      // Ici, implémentez la logique d'achat du ticket
      await new Promise((resolve) => setTimeout(resolve, 1000));
      addToast('Ticket acheté avec succès !', 'success');
    } catch (error) {
      addToast("Erreur lors de l'achat du ticket", 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <html>
      <body>
        <div className="min-h-screen flex flex-col pt-16">
          <Header />

          <div className="min-h-screen bg-zinc-900 text-white">
            <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
              <div className="bg-zinc-800 rounded-xl overflow-hidden">
                <div className="relative h-[300px] sm:h-[400px]">
                  <Image
                    src={`/images/events/${evenement.id}.jpg`}
                    alt={evenement.titre}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-800 to-transparent" />
                </div>

                {/* Contenu principal */}
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Informations principales */}
                    <div className="lg:col-span-2">
                      <h1 className="text-4xl font-bold mb-4">
                        {evenement.titre}
                      </h1>
                      <div className="space-y-4">
                        <p className="text-xl">{evenement.description}</p>

                        <div className="flex flex-wrap gap-4">
                          {evenement.artistes.map((artiste) => (
                            <span
                              key={artiste.id}
                              className="bg-zinc-700 px-3 py-1 rounded-full"
                            >
                              {artiste.nom}
                            </span>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {evenement.genreMusicaux.map((genre) => (
                            <span
                              key={genre.id}
                              className="text-sm text-zinc-400"
                            >
                              #{genre.nom}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Section achat */}
                    <div className="bg-zinc-700 p-6 rounded-xl h-fit">
                      <div className="space-y-4">
                        <div className="text-2xl font-bold">
                          {evenement.prix}€
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Date</span>
                            <span>
                              {new Date(evenement.dateDebut).toLocaleDateString(
                                'fr-FR',
                                {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                }
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Heure</span>
                            <span>
                              {new Date(evenement.dateDebut).toLocaleTimeString(
                                'fr-FR',
                                {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                }
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Lieu</span>
                            <span>{evenement.lieu}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Places restantes</span>
                            <span>
                              {evenement.capacite - evenement.inscrits}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={handleAchatTicket}
                          disabled={
                            isLoading ||
                            evenement.statut !== StatutEvenement.OUVERT
                          }
                          className={`w-full py-3 px-4 rounded-lg text-center text-white
                      ${
                        evenement.statut === StatutEvenement.OUVERT
                          ? 'bg-purple-600 hover:bg-purple-700'
                          : 'bg-gray-600 cursor-not-allowed'
                      } disabled:opacity-50`}
                        >
                          {isLoading
                            ? 'En cours...'
                            : evenement.statut === StatutEvenement.COMPLET
                            ? 'Complet'
                            : evenement.statut === StatutEvenement.ANNULE
                            ? 'Annulé'
                            : 'Acheter un ticket'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
