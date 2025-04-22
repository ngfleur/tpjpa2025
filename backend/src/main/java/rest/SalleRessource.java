package rest;

import java.util.List;

import dao.SalleDao;
import domain.Place;
import domain.Salle;
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



@Path("salle")
@Produces("application/json")
@Consumes("application/json")


public class SalleRessource {
	

    private final SalleDao salleDao = new SalleDao();

    @GET
    @Path("/{id}")
    public Salle getSalleById(@PathParam("id") Long id) {
        return salleDao.getSalleById(id);
    }

    @GET
    public List<Salle> getAllSalles() {
        return salleDao.getAllSalle();
    }

    @POST
    public Response addSalle(Salle salle) {
        salleDao.save(salle);
        return Response.ok().entity("Salle ajouté avec succès").build();
    }

    @DELETE
    @Path("/{id}")
    public Response deleteSalle(@PathParam("id") Long id) {
        
        salleDao.delete( id);
        return Response.ok().entity("Salle supprimé avec succès").build();
    }
    
    @PUT
    @Path("/{id}")
    public Response updateSalle(@PathParam("id") Long id, Salle salle) {

        salleDao.update(id, salle.getName(), salle.getAdresseSalle());
        return Response.ok("Salle mise à jour avec succès").build();
    }

    
    // Récupérer toutes les places associées à une salle
    
    @GET
    @Path("/{id}/places")
    public List<Place> getPlacesBySalleId(@PathParam("id") Long id){
    	return salleDao.getPlacesBySalleId(id);
    }

}
