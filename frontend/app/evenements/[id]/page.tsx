'use client';

import {useEffect, useState} from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';
import {Evenement} from '@app/types/evenement';
import {useUI} from '@app/components/Provider/UIContext';
import {toast} from "sonner";

export default function EvenementPage({params}: { params: { id: number } }) {
    const [evenement, setEvenement] = useState<Evenement | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const {addToast, openModal} = useUI();


    // Vérifier si l'utilisateur est connecté
    const isLoggedIn = () => {
        return !!Cookies.get('auth-token') || !!localStorage.getItem('authToken');
    };


    const handleAchatTicket = async () => {
        console.log('Tentative d\'achat, connecté ?', isLoggedIn());

        // Si l'utilisateur n'est pas connecté, ouvrir la modale de connexion
        if (!isLoggedIn()) {
            openModal('LOGIN');
            return;
        }

        // Si l'utilisateur est connecté, procéder à l'achat
        setIsLoading(true);
        try {
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
                    utilisateurId: utilisateurId,
                    evenementId: evenement.id,
                    placeId: 1, // Place par défaut (à remplacer par une sélection réelle)
                }),
            });

            switch (response.status) {
                case 200:
                    toast.success('Achat du ticket réussi !')
                    break;
                case 401:
                    toast.error(await response.text());
                    break;
                default:
                    toast.error("Une erreur s'est produite.");
                    break;
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

    const getEvennementById = async (eventId: number) => {
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:8080/evenement/' + eventId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            switch (response.status) {
                case 200:
                    const data = await response.json();
                    console.log("data =", data);
                    setEvenement(data);
                    break;
                default:
                    toast.error("Echec de chargement de l'évènement")
                    break;
            }
        } catch (err) {
            toast.error("Echec de chargement de l'évènement")
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getEvennementById(params.id).then();
    }, [params.id])

    if (!evenement) {
        return (
            <div className="min-h-screen bg-zinc-900 text-white p-8 flex justify-center items-center">
                <h1 className={'text-2xl font-bold'}>Événement non trouvé</h1>
            </div>
        );
    }

    return (
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
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-800 to-transparent"/>
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

                                    {evenement.artistes && (
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
                                    )}

                                    {evenement.genreMusicaux && (
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
                                    )}

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
                                        disabled={isLoading}
                                        className={`w-full py-3 px-4 rounded-lg text-center text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50`}
                                        aria-label={isLoading ? 'Achat en cours' : `Acheter un ticket pour ${evenement.titre}`}
                                    >
                                        {isLoading
                                            ? 'En cours...'
                                            : 'Acheter un ticket'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
