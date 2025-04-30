package rest;

import dao.EvenementDao;
import dao.PlaceDao;
import dao.TicketDao;
import dao.UtilisateurDao;
import domain.Evenement;
import domain.Place;
import domain.Ticket;
import domain.Utilisateur;
import dto.TicketDtoIn;
import dto.TicketDtoOut;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.persistence.EntityTransaction;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Application;
import jakarta.ws.rs.core.Response;

import java.util.List;
import java.util.stream.Collectors;

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

    @POST
    @Path("/achat")
    public Response acheterTicket(
            @Parameter(description = "Détails de l'achat", required = true) TicketDtoIn dto,
            @HeaderParam("Authorization") String authHeader) {
        EntityTransaction tx = ticketDao.getManager().getTransaction();
        try {
            tx.begin();

            // Vérifier le jeton d'authentification
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return Response.status(Response.Status.UNAUTHORIZED).entity("Jeton manquant ou invalide").build();
            }

            String token = authHeader.substring(7); // Supprimer "Bearer "
            // Validation fictive du jeton (remplacez par JWT plus tard)
            if (!token.startsWith("dummy-token-for-user-")) {
                return Response.status(Response.Status.UNAUTHORIZED).entity("Jeton invalide").build();
            }

            // Extraire l'ID utilisateur du jeton
            Long utilisateurId = Long.parseLong(token.replace("dummy-token-for-user-", ""));
            Utilisateur utilisateur = utilisateurDao.getUtilisateurById(utilisateurId);
            if (utilisateur == null) {
                return Response.status(Response.Status.UNAUTHORIZED).entity("Utilisateur non trouvé").build();
            }

            // Vérifier l'événement
            Evenement evenement = evenementDao.getEvenementById(dto.getEvenementId());
            if (evenement == null) {
                return Response.status(Response.Status.NOT_FOUND).entity("Événement non trouvé").build();
            }

            // Vérifier la disponibilité et le statut
            if (evenement.getInscrits() >= evenement.getCapacite()) {
                return Response.status(Response.Status.BAD_REQUEST).entity("Événement complet").build();
            }

            // Vérifier la place
            Place place = placeDao.getPlaceById(dto.getPlaceId());
            if (place == null) {
                return Response.status(Response.Status.NOT_FOUND).entity("Place non trouvée").build();
            }

            // Créer un ticket standard (par défaut)
            Ticket ticket = new Ticket(dto.getPrixPaye(), utilisateur, place, evenement);

            // Enregistrer le ticket
            ticketDao.save(ticket, utilisateur, place, evenement);

            // Incrémenter le nombre d'inscrits
            evenement.incrementerInscrits();
            evenementDao.update(evenement);

            tx.commit();

            return Response.ok(toDto(ticket)).build();
        } catch (Exception e) {
            if (tx.isActive()) {
                tx.rollback();
            }
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Erreur lors de l'achat du ticket").build();
        }
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
