import { events, type Event, type EventId } from '../data/events';

export const getEvent = (id: EventId): Event | undefined => {
  return events.find(event => event.id === id);
};

export const getUpcomingEvents = (): Event[] => {
  const now = new Date();
  return events
    .filter(event => new Date(event.date) > now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const getAvailableSeats = (eventId: EventId): number | undefined => {
  const event = getEvent(eventId);
  return event?.availableSeats;
};