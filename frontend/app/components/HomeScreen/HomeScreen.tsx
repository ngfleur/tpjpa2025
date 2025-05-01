'use client';
import {Evenement} from '@app/types/evenement';
import React, {useEffect, useState} from 'react';
import {toast} from "sonner";
import {EvenementList} from "@components/Evenement/EvenementList";


export const HomeScreen = () => {
    const [evenements, setEvenements] = useState<Evenement[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getAllEvennements = async () => {
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:8080/evenement', {
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
        getAllEvennements().then();
    }, [])

    return (
        <main className="min-h-[600px]">
            <div className="mx-auto relative">

                {/* Section des événements */}
                <div className="bg-zinc-900 text-site pt-16 sm:p-20">
                    <div
                        className="px-8 sm:px-0 max-w-4xl mx-auto"
                        data-testid="tickets.container"
                    >
                        <h1 className="uppercase text-4xl sm:text-7xl text-center sm:text-left">
                            EVENEMENTS
                        </h1>

                        <EvenementList evenements={evenements}/>
                    </div>
                </div>
            </div>
        </main>
    );
};
