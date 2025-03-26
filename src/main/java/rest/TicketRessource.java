package rest;

import java.util.List;

import dao.TicketDao;
import domain.Ticket;

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
    public Response addTicket(@Parameter(description = "Ticket object", required = true) Ticket ticket) {
    	
        ticketDao.save(ticket, ticket.getUtilisateur(), ticket.getPlace(), ticket.getEvenement());
        return Response.ok().entity("Ticket ajouté avec succès").build();
    }

    @DELETE
    @Path("/{id}")
    public Response deleteTicket(@PathParam("id") Long id) {
        
        ticketDao.delete(id);
        return Response.ok().entity("Ticket supprimé avec succès").build();
    }

    @PUT
    @Path("/{id}")
    public Response updateTicket(@PathParam("id") Long id, Ticket ticket) {

        ticketDao.update( ticket, ticket.getUtilisateur(), ticket.getPlace(), ticket.getEvenement());
        return Response.ok( ticket).build();
    }


}
