package rest;

import java.util.List;

import dao.EvenementDao;
import domain.Evenement;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;

@Path("evenement")
@Produces("application/json")
@Consumes("application/json")
public class EvenementRessource {

	private final EvenementDao evenementDao = new EvenementDao();

	@GET
	@Path("/{id}")
	public Response getEvenementById(@PathParam("id") Long id) {
		Evenement evt = evenementDao.getEvenementById(id);
		if (evt != null) {
			return Response.ok(evt).build();
		} else {
			return Response.status(Response.Status.NOT_FOUND)
					.entity("Événement non trouvé").build();
		}
	}

	@GET
	public List<Evenement> getAllEvenements() {
		return evenementDao.getAllEvenement();
	}

	@POST
	public Response addEvenement(Evenement event) {
		evenementDao.save(event);
		return Response.status(Response.Status.CREATED)
				.entity("Événement ajouté avec succès").build();
	}

	@PUT
	@Path("/{id}")
	public Response updateEvenement(@PathParam("id") Long id, Evenement updatedEvent) {
		Evenement existing = evenementDao.getEvenementById(id);
		if (existing == null) {
			return Response.status(Response.Status.NOT_FOUND)
					.entity("Événement à modifier non trouvé").build();
		}

		existing.setTitre(updatedEvent.getTitre());
		existing.setDateDebut(updatedEvent.getDateDebut());
		existing.setDateFin(updatedEvent.getDateFin());
		existing.setLieu(updatedEvent.getLieu());
		existing.setPrix(updatedEvent.getPrix());
		existing.setDescription(updatedEvent.getDescription());
		existing.setCapacite(updatedEvent.getCapacite());

		evenementDao.update(existing);

		return Response.ok().entity("Événement modifié avec succès").build();
	}

	@DELETE
	@Path("/{id}")
	public Response deleteEvenement(@PathParam("id") Long id) {
		Evenement existing = evenementDao.getEvenementById(id);
		if (existing == null) {
			return Response.status(Response.Status.NOT_FOUND)
					.entity("Événement à supprimer non trouvé").build();
		}

		evenementDao.delete(id);
		return Response.ok().entity("Événement supprimé avec succès").build();
	}
}
