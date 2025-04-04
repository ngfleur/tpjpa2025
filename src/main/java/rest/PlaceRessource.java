package rest;

import java.util.List;

import dao.PlaceDao;
import domain.Place;
import domain.Salle;
import domain.Ticket;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Response;

@Path("place")
@Produces("application/json")
@Consumes("application/json")
public class PlaceRessource {
	
	private final PlaceDao placeDao = new PlaceDao();
	
	@GET
	@Path("/{id}")
	public Place getPlaceById(@PathParam("id") Long id) {
		
		return placeDao.getPlaceById(id);	
	}
	
	@GET
	public List <Place> getAllPlaces(){
		return placeDao.getAllPlaces();
	}
	
	@POST
	public Response addPlace (Place place) {
		
		placeDao.save(place);
		return Response.ok().entity("Place ajoutée avec succès").build();		
		
	}
	
	@PUT
	@Path("/{id}")
	public Response updatePlace (@PathParam("id") Long id, Place place ) {
		
		//Pour charger la salle existante depuis la base de données
		Salle salle = place.getSalle();
		
		placeDao.update(id, place.getNumeroEmplacement(), salle);
		return Response.ok().entity("Mise à jour effectuée avec succès").build();
		
	}
	
	@DELETE
	@Path("/{id}")
	public Response deletePlace(@PathParam("id") Long id) {
		placeDao.delete(id);
		return Response.ok().entity("Suppression effectuée avec succès").build();
	}

	// Récupérer les tickets associés à une place
	@GET
	@Path("/{id}/tickets")
	public List<Ticket> getTicketsByPlace(@PathParam("id") Long id) {
	    return placeDao.getTicketsByPlaceId(id);
	}

	// Récupérer la salle associée à une place
	@GET
	@Path("/{id}/salle")
	public Salle getSalleByPlace(@PathParam("id") Long id) {
	    return placeDao.getSalleByPlaceId(id);
	}

}
