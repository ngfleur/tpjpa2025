'use client';
import {Evenement} from '@app/types/evenement';
import Image from 'next/image';
import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import {toast} from "sonner";

interface EventState {
    [key: number]: boolean;
}

export const HomeScreen = () => {
    const [openEvents, setOpenEvents] = useState<EventState>({});
    const [evenements, setEvenements] = useState<Evenement[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Liste des images disponibles
    const availableImages = ['1.jpg', '2.jpg'];

    const toggleEvent = (id: number) => {
        setOpenEvents((prev: EventState) => ({
            // Ajout du type EventState ici
            ...prev,
            [id]: !prev[id],
        }));
    };


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
        <main className="bg-site min-h-[600px]">
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
                        <div className="py-10">
                            {evenements.map((evenement, index) => {
                                // Boucler sur les images disponibles en utilisant l'index
                                const imageIndex = index % availableImages.length;
                                const imageSrc = `/images/events/${availableImages[imageIndex]}`;

                                return (
                                    <div
                                        key={evenement.id}
                                        data-testid="ticket-item.container"
                                        className="group/event flex border-b last:border-0 hover:border-purple-500 gap-4 sm:gap-8 flex-col sm:flex-row py-4 sm:py-0 transition-colors duration-300"
                                    >
                                        <div
                                            className="flex flex-1 sm:items-center gap-4 sm:gap-4 md:gap-8 flex-col sm:flex-row sm:py-3">
                                            <div
                                                className="sm:group-hover/event:overflow-hidden transition-all duration-300 ease-out w-full max-w-fit sm:group-hover/event:w-0">
                                                <div
                                                    className="flex flex-col min-w-fit sm:flex-row overflow-hidden sm:gap-4 md:gap-8 relative">
                                                    <div
                                                        className="w-[310px] h-[171px] sm:w-[80px] sm:h-[80px] overflow-hidden sm:group-hover/event:opacity-0 transition-opacity duration-300">
                                                        <div className="flex items-center justify-center h-full">
                                                            <div
                                                                className="overflow-hidden relative group w-full h-full">
                                                                <Image
                                                                    src={imageSrc}
                                                                    alt={evenement.titre}
                                                                    width={300}
                                                                    height={300}
                                                                    className="object-cover w-full group-hover:scale-110 transition duration-300 ease-in-out"
                                                                    onError={(e) => {
                                                                        e.currentTarget.src = '/images/events/default.jpg'; // Image par défaut
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="flex gap-4 items-center absolute bottom-2 left-2 sm:bottom-auto sm:left-auto sm:relative">
                          <span className="text-4xl">
                            {new Date(evenement.dateDebut)
                                .getDate()
                                .toString()
                                .padStart(2, '0')}
                          </span>
                                                        <div className="flex flex-col text-xs">
                            <span className="text-white sm:text-gray-600">
                              {new Date(evenement.dateDebut).toLocaleDateString(
                                  'fr-FR',
                                  {weekday: 'short'}
                              )}
                            </span>
                                                            <span>
                              {new Date(evenement.dateDebut).toLocaleDateString(
                                  'fr-FR',
                                  {month: 'short'}
                              )}
                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grow flex flex-col hover:text-purple-500">
                                                <button
                                                    onClick={() => toggleEvent(evenement.id)}
                                                    className="text-left w-full h-full group/button text-2xl text-left"
                                                >
                                                    {evenement.titre}
                                                    <svg
                                                        fill="none"
                                                        className="w-4 h-4 inline ml-3 opacity-0 group-hover/button:opacity-100"
                                                        stroke="currentColor"
                                                        strokeWidth="1.5"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                                        ></path>
                                                    </svg>
                                                </button>
                                                <div
                                                    className={`text-sm text-gray-600 transition-all ease-in ${
                                                        openEvents[evenement.id]
                                                            ? 'pointer-events-auto opacity-100 h-auto py-3'
                                                            : 'pointer-events-none opacity-0 h-0'
                                                    }`}
                                                >
                                                    <p>
                                                        {evenement.dateDebut.toLocaleString('fr-FR', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        })}{' '}
                                                        –{' '}
                                                        {evenement.dateFin.toLocaleString('fr-FR', {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        })}
                                                    </p>
                                                    <p>{evenement.lieu}</p>
                                                    <p className="mt-3">{evenement.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <Link
                                            href={`/evenements/${evenement.id}`}
                                            data-testid="ticket-item.select.cta"
                                            className="btn-main my-2 sm:my-10 rounded-2xl w-full text-center sm:w-auto h-fit min-w-fit"
                                        >
                                            Plus d'infos
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};
