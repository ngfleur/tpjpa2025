package rest;

import java.util.List;
import java.util.stream.Collectors;

import dao.*;
import domain.*;
import dto.TicketDtoIn;
import dto.TicketDtoOut;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Application;
import jakarta.ws.rs.core.Response;

@Path("ticket")
@Produces("application/json")
@Consumes("application/json")
public class TicketRessource extends Application {

    private final TicketDao ticketDao = new TicketDao();
    private final UtilisateurDao utilisateurDao = new UtilisateurDao();
    private final PlaceDao placeDao = new PlaceDao();
    private final EvenementDao evenementDao = new EvenementDao();

    @GET
    @Path("/{id}")
    public TicketDtoOut getTicketById(@PathParam("id") Long id) {
        Ticket ticket = ticketDao.getTicketById(id);
        return toDto(ticket);
    }

    @GET
    public List<TicketDtoOut> getAllTickets() {
        return ticketDao.getAllTicket().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @POST
    public Response addTicket(TicketDtoIn dto) {
        Utilisateur utilisateur = utilisateurDao.getUtilisateurById(dto.getUtilisateurId());
        Place place = placeDao.getPlaceById(dto.getPlaceId());
        Evenement evenement = evenementDao.getEvenementById(dto.getEvenementId());

        Ticket ticket = new Ticket(dto.getPrixPaye(), utilisateur, place, evenement);
        ticketDao.save(ticket, utilisateur, place, evenement);

        return Response.ok("Ticket ajouté avec succès").build();
    }

    @PUT
    @Path("/{id}")
    public Response updateTicket(@PathParam("id") Long id, TicketDtoIn dto) {
        Utilisateur utilisateur = utilisateurDao.getUtilisateurById(dto.getUtilisateurId());
        Place place = placeDao.getPlaceById(dto.getPlaceId());
        Evenement evenement = evenementDao.getEvenementById(dto.getEvenementId());

        Ticket ticket = ticketDao.getTicketById(id);
        ticket.setPrixPaye(dto.getPrixPaye());
        ticket.setUtilisateur(utilisateur);
        ticket.setPlace(place);
        ticket.setEvenement(evenement);

        ticketDao.update(ticket, utilisateur, place, evenement);

        return Response.ok(toDto(ticket)).build();
    }

    @DELETE
    @Path("/{id}")
    public Response deleteTicket(@PathParam("id") Long id) {
        ticketDao.delete(id);
        return Response.ok("Ticket supprimé avec succès").build();
    }

    private TicketDtoOut toDto(Ticket ticket) {
        return new TicketDtoOut(
                ticket.getId(),
                ticket.getPrixPaye(),
                ticket.getUtilisateur().getId(),
                ticket.getPlace().getId(),
                ticket.getEvenement().getId()
        );
    }
}
