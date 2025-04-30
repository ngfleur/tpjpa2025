'use client';

import { useState } from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { StatutEvenement } from '@app/types/evenement';
import { useUI } from '@app/components/Provider/UIContext';
import Header from '@components/Layout/Header';
import Footer from '@components/Layout/Footer';

export default function EvenementPage({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(false);
  const { addToast, openModal } = useUI();

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
    {
      id: 2,
      titre: 'Concert Rock à Paris',
      dateDebut: new Date('2024-04-15T20:00:00'),
      dateFin: new Date('2024-04-15T23:00:00'),
      capacite: 500,
      inscrits: 250,
      statut: StatutEvenement.OUVERT,
      lieu: 'Salle Pleyel',
      prix: 45,
      description:
          'Une soirée pop inoubliable avec des artistes exceptionnels',
      artistes: [
        { id: 1, nom: 'Rock Band' },
        { id: 2, nom: 'Guitar Heroes' },
      ],
      genreMusicaux: [
        { id: 1, nom: 'Rock' },
        { id: 2, nom: 'Metal' },
      ],
    },
    {
      id: 3,
      titre: 'Concert Pop à Rennes',
      dateDebut: new Date('2024-04-15T20:00:00'),
      dateFin: new Date('2024-04-15T23:00:00'),
      capacite: 500,
      inscrits: 250,
      statut: StatutEvenement.OUVERT,
      lieu: 'Salle Pleyel',
      prix: 45,
      description:
          'Une soirée pop inoubliable avec des artistes exceptionnels',
      artistes: [
        { id: 1, nom: 'Rock Band' },
        { id: 2, nom: 'Guitar Heroes' },
      ],
      genreMusicaux: [
        { id: 1, nom: 'Rock' },
        { id: 2, nom: 'Metal' },
      ],
    },


  ];

  const evenement = evenementsDemo.find((e) => e.id === parseInt(params.id));

  // Vérifier si l'utilisateur est connecté
  const isLoggedIn = () => {
    return !!Cookies.get('auth-token') || !!localStorage.getItem('authToken');
  };


  const handleAchatTicket = async () => {
    console.log('Tentative d\'achat, connecté ?', isLoggedIn());

    // Vérifier si openModal est défini
    if (!openModal) {
      console.error('openModal n\'est pas défini dans useUI');
      addToast('Erreur: Impossible d\'ouvrir la modale de connexion', 'error');
      return;
    }

    // Si l'utilisateur n'est pas connecté, ouvrir la modale de connexion
    if (!isLoggedIn()) {
      try{
        openModal('LOGIN');
        //return;
        console.log('Modale de connexion ouverte');
      }catch(error){
        console.error('Erreur lors de l\'ouverture de la modale:', error);
        addToast('Erreur lors de l\'ouverture de la modale de connexion', 'error');
      }

      return;

    }

    // Si l'utilisateur est connecté, procéder à l'achat
    setIsLoading(true);
    try {

      // Vérifier evenement
      if (!evenement) {
        throw new Error('Événement non trouvé');
      }

      // Vérifier le prix
      if (evenement.prix === undefined || evenement.prix === null) {
        throw new Error('Prix de l\'événement non défini');
      }

      // Extraire l'ID utilisateur du jeton
      let token: string | undefined | null = Cookies.get('auth-token');
      if (!token) {
        token = localStorage.getItem('authToken');
      }
      if (!token) {
        throw new Error('Impossible de récupérer l\'ID utilisateur');
      }

      const utilisateurId = parseInt(token.replace('dummy-token-for-user-', ''));
      if (!utilisateurId || isNaN(utilisateurId)) {
        throw new Error('Impossible de récupérer l\'ID utilisateur');
      }

      const response = await fetch('http://localhost:8080/ticket/achat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          prixPaye: evenement.prix,
          utilisateurId: utilisateurId,
          placeId: 1, // Place par défaut (à remplacer par une sélection réelle)
          evenementId: evenement.id,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Échec de l\'achat du ticket');
      }

      const ticket = await response.json();
      addToast(`Ticket acheté avec succès (ID: ${ticket.id}) !`, 'success');
    } catch (error: any) {
      console.error('Erreur lors de l\'achat:', error);
      addToast(error.message || 'Erreur lors de l\'achat du ticket', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  if (!evenement) {
    return (
        <div className="min-h-screen bg-zinc-900 text-white p-8">
          Événement non trouvé
        </div>
    );
  }

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
                          aria-label={isLoading ? 'Achat en cours' : `Acheter un ticket pour ${evenement.titre}`}
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
