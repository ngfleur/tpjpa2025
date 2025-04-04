package rest;

import java.util.List;

import dao.EvenementDao;
import domain.Evenement;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Response;

@Path("evenement")
@Produces("application/json")
@Consumes("application/json")
public class EvenementRessource {
	
	private final EvenementDao evenementDao = new EvenementDao();
	
	@GET
	@Path("/{id}")
	public Evenement getEvenementById(@PathParam("id") Long id) {
		return evenementDao.getEvenementById(id);
		
	}
	
	@GET
	public List <Evenement> getAllEvenements(){
		return evenementDao.getAllEvenement();
	}
	
	@POST
	public Response addEvenement(Evenement event) {
		evenementDao.save(event);
		return Response.ok().entity("Evenement ajoutée avec succès").build();		
		
	}

	@PUT
	@Path("/{id}")
	public Response updateEvenement(@PathParam("id") Long id, Evenement event) {
		
		evenementDao.update(id, event.getNom(), event.getDate(), event.getLieu(), event.getPrix(), event.getDescription());
		return Response.ok().entity("Evenement modifé avec succès").build();
	}
	
	@DELETE
	@Path("/{id}")
	public Response deleteEvenemennt(@PathParam("id") Long id) {
		evenementDao.delete(id);
		return Response.ok().entity("Evenement supprimé avec succès").build();
	}
}
