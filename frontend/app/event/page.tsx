'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { HomeScreen } from '@app/components/HomeScreen/HomeScreen';
import { EvenementForm } from '@app/components/Evenement/EvenementForm';
import { useUI } from '@app/components/Provider/UIContext';
import Cookies from 'js-cookie';
import { Evenement, EvenementInput, StatutEvenement } from '@app/types/evenement';
import Header from '@components/Layout/Header';
import Footer from '@components/Layout/Footer';

export default function EventPage() {
    const [evenements, setEvenements] = useState<Evenement[]>([]);
    const [showForm, setShowForm] = useState(false);
    const { addToast, openModal, closeModal } = useUI();

    // Fonction pour charger les événements_since l'API
    const fetchEvenements = async () => {
        try {
            const response = await fetch('http://localhost:8080/evenement');
            if (!response.ok) {
                throw new Error('Erreur lors du chargement des événements');
            }
            const data: Evenement[] = await response.json();
            // Convertir les dates de string ISO en objets Date
            const convertedData = data.map((event) => ({
                ...event,
                dateDebut: new Date(event.dateDebut),
                dateFin: new Date(event.dateFin),
            }));
            setEvenements(convertedData);
        } catch (error: any) {
            addToast(error.message || 'Erreur lors du chargement des événements', 'error');
        }
    };

    // Charger les événements au montage du composant
    useEffect(() => {
        fetchEvenements();
    }, [addToast]);

    const getAuthToken = useCallback(() => {
        return Cookies.get('auth-token') || localStorage.getItem('authToken') || undefined;
    }, []);

    const isLoggedIn = useCallback(() => {
        return !!getAuthToken();
    }, [getAuthToken]);

    const isOrganisateur = useCallback(() => {
        const token = getAuthToken();
        if (!token) {
            return false;
        }
        return token.includes('ORGANISATEUR');
    }, [getAuthToken]);

    const handleCreateEvent = (formData: EvenementInput) => {
        if (!isLoggedIn()) {
            addToast('Vous devez être connecté pour créer un événement', 'error');
            openModal?.('LOGIN');
            return;
        }

        if (!isOrganisateur()) {
            addToast('Seuls les organisateurs peuvent créer des événements', 'error');
            return;
        }

        // Recharger la liste complète des événements depuis l'API après la création
        fetchEvenements();
        //setShowForm(false);
        closeModal();
    };

    const openEventFormModal = () => {
        openModal('NONE', <EvenementForm onSubmit={handleCreateEvent} />, 'Créer un nouvel événement');
    };

    return (
        <div className="min-h-screen flex flex-col pt-16">
            <Header />
            <div className="min-h-screen bg-zinc-900">
                <div className="max-w-7xl mx-auto p-6">
                    {isOrganisateur() && (
                        <div className="mb-8 flex justify-end">
                            <button
                                onClick={(openEventFormModal)} //=> setShowForm(!showForm)}
                                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                            >
                                {showForm ? 'Masquer le formulaire' : 'Créer un événement'}
                            </button>
                        </div>
                    )}

                    {/*  {showForm && isOrganisateur() && (
                        <div className="mb-8 bg-zinc-800 p-6 rounded-lg">
                            <h2 className="text-2xl font-bold mb-4 text-white">Créer un nouvel événement</h2>
                            <EvenementForm onSubmit={handleCreateEvent} />
                        </div>
                    )} */}

                    <h1 className="text-3xl font-bold text-white mb-8">Événements</h1>
                    <HomeScreen evenements={evenements} />
                </div>
            </div>
        </div>
    );
}