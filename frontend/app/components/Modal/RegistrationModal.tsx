'use client';

import React, {useState} from 'react';
import {useUI} from '@app/components/Provider/UIContext';
import {RoleUtilisateur} from "@app/utils/enums";
import {toast} from "sonner";

type RegistrationFormData = {
    name: string;
    firstName: string;
    email: string;
    password: string;
    role: string;

};

export const RegistrationModal = () => {
    const {openModal, closeModal, isModalOpen, modalView} = useUI();
    const [formData, setFormData] = useState<RegistrationFormData>({
        name: 'test',
        firstName: 'test',
        email: 'test@test.com',
        password: 'test',
        role: RoleUtilisateur.PARTICIPANT,
    });
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            // Step 1: Exécution de la requête
            const response = await fetch('http://localhost:8080/utilisateur/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    name: formData.name,
                    email: formData.email,
                    mdp: formData.password,
                }),
            });

            // Step 2: Post-traitement en fct du code de status
            switch (response.status) {
                case 201:
                    toast.success('Inscription réussie !')
                    const data = await response.json();
                    localStorage.setItem('authToken', data.token);
                    // window.location.reload();
                    break;
                case 409:
                    setError("Un compte avec cette adresse mail existe déjà.");
                    break;
                default:
                    setError("Une erreur s'est produite.");
                    break;
            }
        } catch (err) {
            console.error("Erreur catch =", err);
            setError("Une erreur s'est produite.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    if (!isModalOpen || modalView !== 'REGISTRATION') return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-96 max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Inscription</h2>
                    <button
                        onClick={closeModal}
                        className="text-gray-500 hover:text-gray-700"
                        aria-label="Fermer"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error != null && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
                            {error}
                        </div>
                    )}

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Nom
                        </label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                            Prenom
                        </label>
                        <input
                            id="firstName"
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                            Rôle
                        </label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            {Object.values(RoleUtilisateur).map((role) => (
                                <option key={role} value={role}>
                                    {role}
                                </option>
                            ))}
                        </select>
                    </div>


                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Mot de passe
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            className="text-sm text-blue-600 hover:text-blue-800"
                            onClick={() => {
                                closeModal();
                                openModal('LOGIN');
                            }}
                        >
                            Connexion
                        </button>
                    </div>

                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            disabled={isLoading}
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                isLoading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg"
                       fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                            strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Chargement...
                </span>
                            ) : (
                                "S'inscrire"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};