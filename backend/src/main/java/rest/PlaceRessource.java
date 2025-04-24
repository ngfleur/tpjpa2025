package rest;

import java.util.List;
import java.util.stream.Collectors;

import dao.PlaceDao;
import domain.Place;
import domain.Salle;
import domain.Ticket;
import dto.PlaceDtoIn;
import dto.PlaceDtoOut;
import dto.SalleDtoOut;  // Assurez-vous d'avoir un DTO pour Salle
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;

@Path("place")
@Produces("application/json")
@Consumes("application/json")
public class PlaceRessource {

	private final PlaceDao placeDao = new PlaceDao();

	@GET
	@Path("/{id}")
	public PlaceDtoOut getPlaceById(@PathParam("id") Long id) {
		Place place = placeDao.getPlaceById(id);
		return convertToDtoOut(place);
	}

	@GET
	public List<PlaceDtoOut> getAllPlaces() {
		return placeDao.getAllPlaces().stream()
				.map(this::convertToDtoOut)
				.collect(Collectors.toList());
	}

	@POST
	public Response addPlace(PlaceDtoIn placeDtoIn) {
		Salle salle = placeDao.getSalleById(placeDtoIn.getSalleId());
		Place place = new Place(placeDtoIn.getNumeroEmplacement(), salle);
		placeDao.save(place);
		return Response.status(Response.Status.CREATED).entity("Place ajoutée avec succès").build();
	}

	@PUT
	@Path("/{id}")
	public Response updatePlace(@PathParam("id") Long id, PlaceDtoIn placeDtoIn) {
		Salle salle = placeDao.getSalleById(placeDtoIn.getSalleId());
		placeDao.update(id, placeDtoIn.getNumeroEmplacement(), salle);
		return Response.ok("Mise à jour effectuée avec succès").build();
	}

	@DELETE
	@Path("/{id}")
	public Response deletePlace(@PathParam("id") Long id) {
		placeDao.delete(id);
		return Response.ok("Suppression effectuée avec succès").build();
	}

	@GET
	@Path("/{id}/tickets")
	public List<Ticket> getTicketsByPlace(@PathParam("id") Long id) {
		return placeDao.getTicketsByPlaceId(id);
	}

	@GET
	@Path("/{id}/salle")
	public Salle getSalleByPlace(@PathParam("id") Long id) {
		return placeDao.getSalleByPlaceId(id);
	}

	private PlaceDtoOut convertToDtoOut(Place place) {
		return new PlaceDtoOut(
				place.getId(),
				place.getNumeroEmplacement(),
				place.getSalle() != null ? place.getSalle().getId() : null
		);
	}
}

