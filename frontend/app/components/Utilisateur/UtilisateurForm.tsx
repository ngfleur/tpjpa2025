import React, { useState, useEffect } from 'react';
import { UtilisateurInput, Utilisateur, RoleUtilisateur } from '@app/types/utilisateur';

interface UtilisateurFormProps {
  onSubmit: (utilisateur: UtilisateurInput) => void;
  initialValues?: Utilisateur;
}

export const UtilisateurForm: React.FC<UtilisateurFormProps> = ({
  onSubmit,
  initialValues
}) => {
  const [formData, setFormData] = useState<UtilisateurInput>({
    name: '',
    firstName: '',
    email: '',
    role: RoleUtilisateur.PARTICIPANT
  });

  useEffect(() => {
    if (initialValues) {
      setFormData({
        name: initialValues.name,
        firstName: initialValues.firstName,
        email: initialValues.email,
        role: initialValues.role
      });
    }
  }, [initialValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    if (!initialValues) {
      setFormData({
        name: '',
        firstName: '',
        email: '',
        role: RoleUtilisateur.PARTICIPANT
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label 
            htmlFor="name" 
            className="block text-sm font-medium text-gray-700"
          >
            Nom
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label 
            htmlFor="firstName" 
            className="block text-sm font-medium text-gray-700"
          >
            Prénom
          </label>
          <input
            type="text"
            id="firstName"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <label 
          htmlFor="email" 
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label 
          htmlFor="role" 
          className="block text-sm font-medium text-gray-700"
        >
          Rôle
        </label>
        <select
          id="role"
          value={formData.role}
          onChange={(e) => setFormData({ 
            ...formData, 
            role: e.target.value as RoleUtilisateur 
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          {Object.values(RoleUtilisateur).map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {initialValues ? 'Modifier' : 'Ajouter'} l'utilisateur
      </button>
    </form>
  );
};