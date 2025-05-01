'use client';

import {useCallback, useEffect, useState} from 'react';
import {EvenementList} from 'app/components/Evenement/EvenementList';
import {EvenementForm} from 'app/components/Evenement/EvenementForm';
import {useUI} from '@app/components/Provider/UIContext';
import Cookies from 'js-cookie';
import Header from '@components/Layout/Header';
import Footer from '@components/Layout/Footer';
import {Evenement, EvenementInput} from "@app/types/evenement";

export default function Evenements() {
    const [evenements, setEvenements] = useState<Evenement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false); // Contrôle l'affichage du formulaire
    const {addToast, openModal} = useUI();

    const getAuthToken = useCallback(() => {
        const token = Cookies.get('auth-token') || localStorage.getItem('authToken') || undefined;
        console.log('Token récupéré:', token);
        return token;
    }, []);


    // Vérifier si l'utilisateur est connecté
    const isLoggedIn = useCallback(() => {
        const loggedIn = !!getAuthToken();
        console.log('Utilisateur connecté:', loggedIn);
        return loggedIn;
    }, [getAuthToken]);

    // Vérifier si l'utilisateur a le rôle ORGANISATEUR
    const isOrganisateur = useCallback(() => {
        const token = getAuthToken();
        if (!token) return false;
        // Supposons que le token contient des informations sur les rôles
        // vérifier une chaîne dans le token
        return token.includes('ORGANISATEUR');
    }, [getAuthToken]);

    // Charger les événements via API
    useEffect(() => {
        let isMounted = true;
        let hasErrored = false;

        const fetchEvenements = async () => {
            try {
                console.log('Récupération des événements...');
                const response = await fetch('http://localhost:8080/evenement');
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement des événements');
                }
                const data = await response.json();
                console.log('Événements reçus:', data);

                // Convertir les dates en objets Date
                if (isMounted) {
                    setEvenements(
                        data.map((evt: Evenement) => ({
                            ...evt,
                            dateDebut: new Date(evt.dateDebut),
                            dateFin: new Date(evt.dateFin),
                        }))
                    );
                }
            } catch (err: unknown) {
                if (isMounted && !hasErrored) {
                    // Vérifies que err est une instance de Error
                    const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
                    setError(errorMessage);
                    addToast(errorMessage || 'Erreur lors du chargement des événements', 'error');
                    hasErrored = true;
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };
        fetchEvenements();
    }, [addToast]);

    // Créer un événement
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

            /*   if (!response.ok) {
                   const errorMessage = await response.text();
                   throw new Error(errorMessage || 'Erreur lors de la création de l\'événement');
               } */


            // Puisque le backend ne retourne pas l'événement créé, recharger la liste
            /*  const fetchResponse = await fetch('http://localhost:8080/evenements');
               if (!fetchResponse.ok) {
                   throw new Error('Erreur lors du rechargement des événements');
               }
               const data = await fetchResponse.json();
               setEvenements(
                   data.map((evt: Evenement) => ({
                       ...evt,
                       dateDebut: new Date(evt.dateDebut),
                       dateFin: new Date(evt.dateFin),
                   }))
               ); */

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

    // Gérer la réservation
    const handleReservation = useCallback(async (evenementId: number, quantity: number) => {
            if (!openModal) {
                console.error('openModal non défini');
                addToast('Erreur: Impossible d\'ouvrir la modale de connexion', 'error');
                return;
            }

            if (!isLoggedIn()) {
                console.log('Ouverture de la modale LOGIN');
                try {
                    // Ouvre la modale de connexion et relance la réservation après succès
                    await new Promise((resolve, reject) => {
                        openModal('LOGIN', {
                            onSuccess: () => {
                                console.log('Connexion réussie via modale');
                                resolve(undefined)
                            },
                            onClose: () => {
                                console.log('Modale de connexion fermée');
                                reject(new Error('Connexion annulée'));
                            },
                        });
                    });
                } catch (error: unknown) {
                    const errorMessage = error instanceof Error ? error.message : 'Connexion annulée';
                    addToast('Connexion requise pour réserver', 'error');
                    return;
                }
            }

            // Vérifier à nouveau après connexion
            if (!isLoggedIn()) {
                console.log('Échec de la connexion après modale');
                addToast('Connexion échouée', 'error');
                return;
            }

            try {
                const token = getAuthToken();
                if (!token) {
                    throw new Error('Jeton d\'authentification manquant');
                }

                const utilisateurId = parseInt(token.replace('dummy-token-for-user-', ''));
                if (!utilisateurId || isNaN(utilisateurId)) {
                    throw new Error('Impossible de récupérer l\'ID utilisateur');
                }

                const evenement = evenements.find((evt: Evenement) => evt.id === evenementId);
                if (!evenement) {
                    throw new Error('Événement non trouvé');
                }

                // Envoyer une requête pour chaque ticket
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
                            placeId: 1, // À remplacer par une sélection réelle
                            evenementId: evenementId,
                        }),
                    });

                    if (!response.ok) {
                        const errorMessage = await response.text();
                        throw new Error(errorMessage || 'Échec de l\'achat du ticket');
                    }
                }

                // Recharger les événements pour mettre à jour inscrits
                const response = await fetch('http://localhost:8080/evenements');
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
                console.error('Erreur lors de la réservation:', error);
                addToast(errorMessage || 'Erreur lors de la réservation', 'error');
            }
        }, [addToast, openModal, evenements, isLoggedIn, getAuthToken]
    );

    if (isLoading) {
        return (
            <div className="min-h-screen bg-zinc-900 text-white p-8">
                Chargement...
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-zinc-900 text-white p-8">
                {error}
            </div>
        );
    }

    return (
        <html>
        <body>
        <div className="min-h-screen flex flex-col pt-16">
            <Header/>
            <div className="min-h-screen bg-zinc-900 text-white">
                <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
                    <h1 className="text-4xl font-bold mb-8">Événements</h1>
                    {/* Bouton pour afficher/masquer le formulaire (uniquement pour organisateurs) */}
                    {isOrganisateur() && (
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="mb-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            {showForm ? 'Masquer le formulaire' : 'Créer un événement'}
                        </button>
                    )}

                    {/* Formulaire de création */}
                    {showForm && isOrganisateur() && (
                        <div className="mb-8 bg-zinc-800 p-6 rounded-lg">
                            <h2 className="text-2xl font-bold mb-4">Créer un nouvel événement</h2>
                            <EvenementForm onSubmit={handleCreateEvent}/>
                        </div>
                    )}

                    <EvenementList evenements={evenements} onReservation={handleReservation}/>
                </div>
            </div>
            <Footer/>
        </div>
        </body>
        </html>
    );
}