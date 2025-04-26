// Schedule.tsx
import { Evenement } from '@app/types/evenement';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface ScheduleItem {
  id: number;
  titre: string;
  debut: Date;
  fin: Date;
  salle: string;
}

export const Schedule = ({
  evenement,
  isFull = false,
}: {
  evenement: Evenement;
  isFull?: boolean;
}) => {
  // Simulation des items du programme
  const items: ScheduleItem[] = [
    {
      id: 1,
      titre: "Ouverture des portes",
      debut: evenement.dateDebut, // Maintenant compatible car les deux sont de type Date
      fin: evenement.dateFin,
      salle: evenement.lieu
    }
  ];

  const itemsWithDuration = items.map((item) => {
    const dateStart = item.debut; // Plus besoin de new Date()
    const dateEnd = item.fin;
    const msDifference = Number(dateEnd) - Number(dateStart);
    const minutes = Math.floor(msDifference / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    return { ...item, duration: { diffHrs: hours, diffMins: minutes } };
  });

  const formatDuration = ({ diffHrs, diffMins }: { diffHrs: number; diffMins: number }) => {
    if (diffHrs > 0) {
      return `${diffHrs}h${diffMins % 60 > 0 ? ` ${diffMins % 60}min` : ''}`;
    }
    return `${diffMins}min`;
  };

  return (
    <div className="text-sm">
      {itemsWithDuration.slice(0, isFull ? 100 : 2).map((item) => (
        <div
          className="flex gap-3 sm:gap-8 items-left sm:items-center border-b py-5 sm:py-8 border-black flex-col sm:flex-row"
          key={item.id}
        >
          <div className="basis-1/4">
            <span className="block">
              {`${format(new Date(item.debut), 'HH:mm')} - ${format(new Date(item.fin), 'HH:mm')}`}
            </span>
            <span className="text-gray-400 text-sm">
              {formatDuration({
                diffHrs: item.duration.diffHrs,
                diffMins: item.duration.diffMins,
              })}
            </span>
          </div>
          <div>
            <span className="block mb-2">{item.titre}</span>
            <div className="text-xs flex gap-1 items-center">
              <svg
                className="h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                ></path>
              </svg>
              {item.salle}
            </div>
          </div>
        </div>
      ))}
      {items.length > 2 && !isFull && (
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 items-center py-4">
          <span className="text-xs">
            {items.length - 2} éléments supplémentaires
          </span>
          <a
            href={`/programme/${evenement.id}`}
            className="text-blue-600 border py-2 px-4 border-blue-600 w-full sm:w-auto text-center"
          >
            Voir tout
          </a>
        </div>
      )}
    </div>
  );
};