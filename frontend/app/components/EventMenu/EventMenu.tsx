'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { EvenementList } from '@app/components/Evenement/EvenementList';
import { EvenementForm } from '@app/components/Evenement/EvenementForm';
import { useUI } from '@app/components/Provider/UIContext';
import Cookies from 'js-cookie';
import {Evenement, EvenementInput, StatutEvenement} from '@app/types/evenement';

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
        statut: StatutEvenement.ANNULE,
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
    },
    {
        id: 3,
        titre: "Festival Pop",
        dateDebut: new Date('2024-05-01T18:00:00'),
        dateFin: new Date('2024-05-01T23:00:00'),
        capacite: 300,
        inscrits: 150,
        statut: StatutEvenement.COMPLET,
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
export function EventMenu({ onClose }: { onClose: () => void }) {
    const [evenements, setEvenements] = useState<Evenement[]>(evenementsDemo);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const { addToast, openModal } = useUI();

    const getAuthToken = useCallback(() => {
        return Cookies.get('auth-token') || localStorage.getItem('authToken') || undefined;
    }, []);

    const isLoggedIn = useCallback(() => {
        return !!getAuthToken();
    }, [getAuthToken]);

    const isOrganisateur = useCallback(() => {
        const token = getAuthToken();
        if (!token) return false;
        return token.includes('ORGANISATEUR');
    }, [getAuthToken]);

    useEffect(() => {
        const fetchEvenements = async () => {
            try {
                const response = await fetch('http://localhost:8080/evenement');
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement des événements');
                }
                const data = await response.json();
                setEvenements(
                    data.map((evt: Evenement) => ({
                        ...evt,
                        dateDebut: new Date(evt.dateDebut),
                        dateFin: new Date(evt.dateFin),
                    }))
                );
            } catch (err: unknown) {
                const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
                setError(errorMessage);
                addToast(errorMessage || 'Erreur lors du chargement des événements', 'error');
            } finally {
                setIsLoading(false);
            }
        };
        fetchEvenements();
    }, [addToast]);

    const handleCreateEvent = async (formData: EvenementInput) => {
        if (!isLoggedIn()) {
            addToast('Vous devez être connecté pour créer un événement', 'error');
            openModal?.('LOGIN');
            return;
        }

        if (!isOrganisateur()) {
            addToast('Seuls les organisateurs peuvent créer des événements', 'error');
            return;
        }

        try {
            const token = getAuthToken();
            const response = await fetch('http://localhost:8080/evenement', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage || "Erreur lors de la création de l'événement");
            }

            const createdEvent = await response.json();
            setEvenements((prev) => [
                ...prev,
                {
                    ...createdEvent,
                    dateDebut: new Date(createdEvent.dateDebut),
                    dateFin: new Date(createdEvent.dateFin),
                },
            ]);

            addToast('Événement créé avec succès !', 'success');
            setShowForm(false);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
            addToast(errorMessage || 'Erreur lors de la création de l\'événement', 'error');
        }
    };

    const handleReservation = useCallback(
        async (evenementId: number, quantity: number) => {
            if (!openModal) {
                addToast('Erreur: Impossible d\'ouvrir la modale de connexion', 'error');
                return;
            }

            if (!isLoggedIn()) {
                try {
                    await new Promise((resolve, reject) => {
                        openModal('LOGIN', {
                            onSuccess: () => resolve(undefined),
                            onClose: () => reject(new Error('Connexion annulée')),
                        });
                    });
                } catch (error: unknown) {
                    const errorMessage = error instanceof Error ? error.message : 'Connexion annulée';
                    addToast('Connexion requise pour réserver', 'error');
                    return;
                }
            }

            if (!isLoggedIn()) {
                addToast('Connexion échouée', 'error');
                return;
            }

            try {
                const token = getAuthToken();
                if (!token) {
                    throw new Error("Jeton d'authentification manquant");
                }

                const utilisateurId = parseInt(token.replace('dummy-token-for-user-', ''));
                if (!utilisateurId || isNaN(utilisateurId)) {
                    throw new Error("Impossible de récupérer l'ID utilisateur");
                }

                const evenement = evenements.find((evt: Evenement) => evt.id === evenementId);
                if (!evenement) {
                    throw new Error('Événement non trouvé');
                }

                for (let i = 0; i < quantity; i++) {
                    const response = await fetch('http://localhost:8080/ticket/achat', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            prixPaye: evenement.prix,
                            utilisateurId: utilisateurId,
                            placeId: 1,
                            evenementId: evenementId,
                        }),
                    });

                    if (!response.ok) {
                        const errorMessage = await response.text();
                        throw new Error(errorMessage || "Échec de l'achat du ticket");
                    }
                }

                const response = await fetch('http://localhost:8080/evenement');
                if (response.ok) {
                    const data = await response.json();
                    setEvenements(
                        data.map((evt: Evenement) => ({
                            ...evt,
                            dateDebut: new Date(evt.dateDebut),
                            dateFin: new Date(evt.dateFin),
                        }))
                    );
                }

                addToast(`Réservation de ${quantity} ticket(s) réussie !`, 'success');
            } catch (error: unknown) {
                const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
                addToast(errorMessage || 'Erreur lors de la réservation', 'error');
            }
        },
        [addToast, openModal, evenements, isLoggedIn, getAuthToken]
    );

    if (isLoading) {
        return <div className="text-white p-4">Chargement...</div>;
    }

    if (error) {
        return <div className="text-white p-4">{error}</div>;
    }

    return (
        <div className="flex flex-col h-full p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">Événements</h2>
                <button
                    onClick={onClose}
                    className="text-white p-2"
                    aria-label="Fermer le menu des événements"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {isOrganisateur() && (
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="mb-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    {showForm ? 'Masquer le formulaire' : 'Créer un événement'}
                </button>
            )}

            {showForm && isOrganisateur() && (
                <div className="mb-8 bg-zinc-800 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-4 text-white">Créer un nouvel événement</h3>
                    <EvenementForm onSubmit={handleCreateEvent} />
                </div>
            )}

            <EvenementList evenements={evenements} onReservation={handleReservation} />
        </div>
    );
}