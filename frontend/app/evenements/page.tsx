'use client';
import React, {useEffect, useState} from 'react';
import {Evenement} from '@types/evenement';
import {EvenementList} from "@components/Evenement/EvenementList";
import Link from "next/link";
import {toast} from "sonner";
import {Utilisateur} from "@types/utilisateur";

export default function Page() {
    const [evenements, setEvenements] = useState<Evenement[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [authUtilisateur, setAuthUtilisateur] = useState<Utilisateur | null>(null);

    const getEvennementsByOrganisateurId = async (organisateurId: number) => {
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:8080/evenement/by-organisateur/' + organisateurId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            switch (response.status) {
                case 200:
                    const data = await response.json();
                    console.log("data =", data);
                    setEvenements(data);
                    break;
                default:
                    toast.error('Echec de chargement des évènements')
                    break;
            }
        } catch (err) {
            toast.error('Echec de chargement des évènements')
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const utilisateurJson = localStorage.getItem('authUtilisateur');
        if (utilisateurJson) {
            const utilisateur: Utilisateur = JSON.parse(utilisateurJson);
            setAuthUtilisateur(utilisateur);
            getEvennementsByOrganisateurId(utilisateur.id).then();
        }
    }, [])

    return (
        <div className="min-h-screen bg-zinc-900">
            <div className="max-w-7xl mx-auto p-6">
                <div className="flex flex-row justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-white">Mes événements</h1>

                    <Link
                        href={`/evenements/create`}
                        data-testid="ticket-item.select.cta"
                        className="btn-main rounded-2xl w-full text-center sm:w-auto h-fit min-w-fit"
                    >
                        Créer
                    </Link>
                </div>
                <EvenementList evenements={evenements}/>
            </div>
        </div>
    );
}