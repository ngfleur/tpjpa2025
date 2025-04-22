package rest;

import java.util.List;

import dao.UtilisateurDao;
import domain.Utilisateur;
import dto.LoginDto;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Response;

@Path("utilisateur")
@Produces("application/json")
@Consumes("application/json")

public class UtilisateurRessource {
	
	
	    private final UtilisateurDao utilisateurDao = new UtilisateurDao();

	    @GET
	    @Path("/{id}")
	    public Utilisateur getUtilisateurById(@PathParam("id") Long id) {
	        return utilisateurDao.getUtilisateurById(id);
	    }

	    @GET
	    public List<Utilisateur> getAllUtilisateurs() {
	        return utilisateurDao.getAllUtilisateur();
	    }

	    @POST
	    public Response addUtilisateur(@Parameter(description = "Utilisateur object", required = true) Utilisateur utilisateur) {
	        utilisateurDao.save(utilisateur);
	        return Response.ok().entity("Utilisateur ajouté avec succès").build();
	    }

	    @DELETE
	    @Path("/{id}")
	    public Response deleteUtilisateur(@PathParam("id") Long id) {
	        
	        utilisateurDao.delete( id);
	        return Response.ok().entity("utilisateur supprimé avec succès").build();
	    }

	    @PUT
	    @Path("/{id}")
	    public Response updateUtilisateur(@PathParam("id") Long id, Utilisateur utilisateur) {

	        utilisateurDao.update( utilisateur);
	        return Response.ok( utilisateur).build();
	    }
	    
	    @POST
	    @Path("/login")
	    public Response login(LoginDto loginDto) {
	        Utilisateur u = utilisateurDao.seConnecter(loginDto.email, loginDto.motDePasse);
	        if (u != null) {
	            return Response.ok(u).build();
	        } else {
	            return Response.status(Response.Status.UNAUTHORIZED)
	                           .entity("Email ou mot de passe incorrect").build();
	        }
	    }


}
