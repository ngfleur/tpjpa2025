package rest;

import java.util.List;
import java.util.stream.Collectors;

import dao.UtilisateurDao;
import domain.Utilisateur;
import dto.UtilisateurDtoIn;
import dto.UtilisateurDtoOut;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;

@Path("utilisateur")
@Produces("application/json")
@Consumes("application/json")
public class UtilisateurRessource {

	private final UtilisateurDao utilisateurDao = new UtilisateurDao();

	@GET
	@Path("/{id}")
	public Response getUtilisateurById(@PathParam("id") Long id) {
		Utilisateur user = utilisateurDao.getUtilisateurById(id);
		if (user == null) {
			return Response.status(Response.Status.NOT_FOUND).entity("Utilisateur non trouvé").build();
		}
		return Response.ok(new UtilisateurDtoOut(user)).build();
	}

	@GET
	public List<UtilisateurDtoOut> getAllUtilisateurs() {
		return utilisateurDao.getAllUtilisateur().stream()
				.map(UtilisateurDtoOut::new)
				.collect(Collectors.toList());
	}

	@POST
	public Response addUtilisateur(
			@Parameter(description = "Utilisateur à ajouter", required = true) UtilisateurDtoIn dtoIn) {
		Utilisateur user = new Utilisateur();
		user.setName(dtoIn.getName());
		user.setFirstName(dtoIn.getFirstName());
		user.setEmail(dtoIn.getEmail());
		user.setRole(dtoIn.getRole());

		utilisateurDao.save(user);
		return Response.status(Response.Status.CREATED).entity("Utilisateur ajouté avec succès").build();
	}

	@PUT
	@Path("/{id}")
	public Response updateUtilisateur(@PathParam("id") Long id, UtilisateurDtoIn dtoIn) {
		Utilisateur user = utilisateurDao.getUtilisateurById(id);
		if (user == null) {
			return Response.status(Response.Status.NOT_FOUND).entity("Utilisateur non trouvé").build();
		}

		user.setName(dtoIn.getName());
		user.setFirstName(dtoIn.getFirstName());
		user.setEmail(dtoIn.getEmail());
		user.setRole(dtoIn.getRole());

		utilisateurDao.update(user);
		return Response.ok("Utilisateur mis à jour avec succès").build();
	}

	@DELETE
	@Path("/{id}")
	public Response deleteUtilisateur(@PathParam("id") Long id) {
		utilisateurDao.delete(id);
		return Response.ok("Utilisateur supprimé avec succès").build();
	}
}
