// ScheduleEvent.tsx
import { Evenement } from '@app/types/evenement';
import { formatDate } from '@app/utils/date-formatter';
import { Schedule } from './Schedule';

export function ScheduleEvent({
  evenement,
}: {
  evenement: Evenement;
}) {
  // Utilisez 'Europe/Paris' ou votre fuseau horaire préféré
  const timeZone = 'Europe/Paris';
  
  return (
    <div className="max-w-4xl mx-auto px-8 sm:px-14 pt-4 sm:pt-16">
      <div className="flex flex-col-reverse sm:flex-col">
        <p className="font-helvetica text-xs sm:text-base">
          {`${evenement.titre} | ${formatDate(evenement.dateDebut, timeZone)}, ${evenement.lieu}`}
        </p>
        <h1 className="text-2xl sm:text-5xl mb-4 sm:mb-12 sm:mt-4">Programme</h1>
      </div>
      <div className="flex flex-col-reverse sm:flex-col">
        <a
          className="text-blue-600 border py-2 mt-4 sm:mt-0 px-4 sm:mb-8 border-blue-600 inline-block w-full sm:w-fit text-center"
          href={`/evenements/${evenement.id}`}
        >
          Réserver
        </a>
        <div>
          <h2 className="mt-4 border-b border-black pb-4">
            {formatDate(evenement.dateDebut, timeZone)}
          </h2>
          <Schedule evenement={evenement} isFull={true} />
        </div>
      </div>
    </div>
  );
}