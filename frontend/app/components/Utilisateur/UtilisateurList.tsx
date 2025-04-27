import React from 'react';
import { Utilisateur, RoleUtilisateur } from '@app/types/utilisateur';

interface UtilisateurListProps {
  utilisateurs: Utilisateur[];
  onEdit?: (utilisateur: Utilisateur) => void;
  onDelete?: (id: number) => void;
  onSelect?: (utilisateur: Utilisateur) => void;
}

export const UtilisateurList: React.FC<UtilisateurListProps> = ({
  utilisateurs,
  onEdit,
  onDelete,
  onSelect
}) => {
  const getRoleBadgeColor = (role: RoleUtilisateur) => {
    switch (role) {
      case RoleUtilisateur.ADMIN:
        return 'bg-red-100 text-red-800';
      case RoleUtilisateur.ORGANISATEUR:
        return 'bg-blue-100 text-blue-800';
      case RoleUtilisateur.PARTICIPANT:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nom
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rôle
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {utilisateurs.map((utilisateur) => (
            <tr 
              key={utilisateur.id}
              onClick={() => onSelect?.(utilisateur)}
              className="hover:bg-gray-50 cursor-pointer"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {utilisateur.name} {utilisateur.firstName}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{utilisateur.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeColor(utilisateur.role)}`}>
                  {utilisateur.role}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {onEdit && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(utilisateur);
                    }}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Modifier
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(utilisateur.id);
                    }}
                    className="text-red-600 hover:text-red-900"
                  >
                    Supprimer
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};