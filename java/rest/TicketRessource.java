package rest;

import java.util.List;

import dao.TicketDao;
import domain.Evenement;
import domain.Place;
import domain.Ticket;
import domain.TicketPremium;
import domain.TicketStandard;
import domain.Utilisateur;
import dto.TicketDto;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Application;
import jakarta.ws.rs.core.Response;

@Path("ticket")
@Produces("application/json")
@Consumes("application/json")

public class TicketRessource extends Application {
	

	
    private final TicketDao ticketDao = new TicketDao();

    @GET
    @Path("/{id}")
    public Ticket getTicketById(@PathParam("id") Long id) {
        return ticketDao.getTicketById(id);
    }

    @GET
    public List<Ticket> getAllTickets() {
        return ticketDao.getAllTicket();
    }

    @POST
//    public Response addTicket(Ticket ticket) {
//    	
//        ticketDao.save(ticket, ticket.getUtilisateur(), ticket.getPlace(), ticket.getEvenement());
//        return Response.ok().entity("Ticket ajouté avec succès").build();
//    }
    
    
    public Response addTicket(dto.TicketDto ticketDto) {
        try {
            Utilisateur utilisateur = ticketDao.getManager().find(Utilisateur.class, ticketDto.utilisateurId);
            Place place = ticketDao.getManager().find(Place.class, ticketDto.placeId);
            Evenement evenement = ticketDao.getManager().find(Evenement.class, ticketDto.evenementId);

            if (utilisateur == null || place == null || evenement == null) {
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity("Utilisateur, Place ou Evenement introuvable.").build();
            }

            Ticket ticket;

            switch (ticketDto.typeTicket.toUpperCase()) {
                case "PREMIUM":
                    TicketPremium premium = new TicketPremium();
                    premium.setAccesVip(Boolean.TRUE.equals(ticketDto.accesVip));
                    premium.setCadeau(ticketDto.cadeau);
                    ticket = premium;
                    break;

                case "STANDARD":
                default:
                    TicketStandard standard = new TicketStandard();
                    standard.setPlaceAssise(Boolean.TRUE.equals(ticketDto.placeAssise));
                    standard.setZone(ticketDto.zone);
                    ticket = standard;
                    break;
            }

            ticket.setPrixPaye(ticketDto.prixPaye);
            ticket.setUtilisateur(utilisateur);
            ticket.setPlace(place);
            ticket.setEvenement(evenement);

            ticketDao.save(ticket, utilisateur, place, evenement);

            return Response.ok().entity("Ticket " + ticketDto.typeTicket + " ajouté avec succès.").build();

        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Erreur lors de la création du ticket.").build();
        }
    }


    @DELETE
    @Path("/{id}")
    public Response deleteTicket(@PathParam("id") Long id) {
        
        ticketDao.delete(id);
        return Response.ok().entity("Ticket supprimé avec succès").build();
    }

    @PUT
    @Path("/{id}")
    public Response updateTicket(@PathParam("id") Long id, TicketDto ticketDto) {
    	try {
	    	// Récupérer l’ancien ticket
	        Ticket ticket = ticketDao.getTicketById(id);
	        if (ticket == null) {
	            return Response.status(Response.Status.NOT_FOUND)
	                    .entity("Ticket avec ID " + id + " introuvable.").build();
	        }
	        
	     // Récupérer les entités liées
	        Utilisateur u = ticketDao.getManager().find(Utilisateur.class, ticketDto.utilisateurId);
	        Place p = ticketDao.getManager().find(Place.class, ticketDto.placeId);
	        Evenement e = ticketDao.getManager().find(Evenement.class, ticketDto.evenementId);
	
	        if (u == null || p == null || e == null) {
	            return Response.status(Response.Status.BAD_REQUEST)
	                    .entity("Utilisateur, Place ou Evenement non trouvé.").build();
	        }
	        
	        // Mettre à jour les champs communs
	        ticket.setPrixPaye(ticketDto.prixPaye);
	        ticket.setUtilisateur(u);
	        ticket.setPlace(p);
	        ticket.setEvenement(e);
	        
	     // 🔄 Mettre à jour les champs spécifiques en fonction de la sous-classe
	        if (ticket instanceof TicketStandard) {
	            TicketStandard t = (TicketStandard) ticket;
	            t.setPlaceAssise(Boolean.TRUE.equals(ticketDto.placeAssise));
	            t.setZone(ticketDto.zone);
	        } else if (ticket instanceof TicketPremium) {
	            TicketPremium t = (TicketPremium) ticket;
	            t.setAccesVip(Boolean.TRUE.equals(ticketDto.accesVip));
	            t.setCadeau(ticketDto.cadeau);
	        }
	
	        // Sauvegarder dans la base
	        ticketDao.getManager().getTransaction().begin();
	        ticketDao.getManager().merge(ticket);
	        ticketDao.getManager().getTransaction().commit();
	        
	        return Response.ok().entity("Ticket mis à jour avec succès.").build();
	        
		    } catch (Exception e) {
		        e.printStackTrace();
		        if (ticketDao.getManager().getTransaction().isActive()) {
		            ticketDao.getManager().getTransaction().rollback();
		        }
		        return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Erreur lors de la mise à jour du ticket.").build();
		        
		    }

    }

//    @PUT
//    @Path("/{id}")
//    public Response updateTicket(@PathParam("id") Long id, Ticket ticket) {
//
//        ticketDao.update( ticket, ticket.getUtilisateur(), ticket.getPlace(), ticket.getEvenement());
//        return Response.ok( ticket).build();
//    }

}
