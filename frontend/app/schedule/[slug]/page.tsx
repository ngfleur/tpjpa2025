import { Evenement } from '@app/types/evenement';
import { Place } from '@app/types/place';

interface PageProps {
  params: {
    slug: string;
  };
}

async function getEvenement(slug: string): Promise<Evenement | null> {
  try {
    // Remplacez ceci par votre appel API réel
    const response = await fetch(`/api/evenements/${slug}`);
    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'événement:', error);
    return null;
  }
}

async function getPlaces(evenementId: number): Promise<Place[]> {
  try {
    // Remplacez ceci par votre appel API réel
    const response = await fetch(`/api/evenements/${evenementId}/places`);
    if (!response.ok) return [];
    return response.json();
  } catch (error) {
    console.error('Erreur lors de la récupération des places:', error);
    return [];
  }
}

export default async function EventPage({ params }: PageProps) {
  const evenement = await getEvenement(params.slug);
  
  if (!evenement) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-500">
          Événement non trouvé
        </h1>
      </div>
    );
  }

  const places = await getPlaces(evenement.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{evenement.titre}</h1>
        <p className="text-gray-600">
          {new Date(evenement.dateDebut).toLocaleDateString('fr-FR')} - 
          {new Date(evenement.dateFin).toLocaleDateString('fr-FR')}
        </p>
        <p className="mt-2">{evenement.description}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Informations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium">Lieu</h3>
            <p>{evenement.lieu}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium">Prix</h3>
            <p>{evenement.prix}€</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium">Places disponibles</h3>
            <p>{evenement.capacite - evenement.inscrits} / {evenement.capacite}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium">Statut</h3>
            <p>{evenement.statut}</p>
          </div>
        </div>
      </div>

      {evenement.artistes && evenement.artistes.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Artistes</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {evenement.artistes.map((artiste) => (
              <div key={artiste.id} className="p-4 bg-gray-50 rounded-lg">
                {artiste.nom}
              </div>
            ))}
          </div>
        </div>
      )}

      {places.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Réserver des places</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {places.map((place) => (
              <div key={place.id} className="p-4 border rounded-lg">
                <p>Place n°{place.numeroEmplacement}</p>
                {/* Ici, vous pouvez ajouter votre composant de sélection de place */}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}