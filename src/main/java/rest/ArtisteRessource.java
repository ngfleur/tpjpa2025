package rest;

import java.util.List;

import dao.ArtisteDao;
import domain.Artiste;
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
import jpa.EntityManagerHelper;

@Path("artiste")
@Produces("application/json")
@Consumes("application/json")
public class ArtisteRessource {

    private final ArtisteDao artisteDao = new ArtisteDao(EntityManagerHelper.getEntityManager());

    @GET
    @Path("/{id}")
    public Artiste getArtisteById(@PathParam("id") Long id) {
        return artisteDao.getArtisteById(id);
    }

    @GET
    public List<Artiste> getAllArtistes() {
        return artisteDao.getAllArtiste();
    }

    @POST
    public Response addArtiste(@Parameter(description = "Artiste object", required = true) Artiste artiste) {
        artisteDao.save(artiste.getNom());
        return Response.ok().entity("Artiste ajouté avec succès").build();
    }

    @DELETE
    @Path("/{id}")
    public Response deleteArtiste(@PathParam("id") Long id) {
        artisteDao.delete(id);
        return Response.ok().entity("Artiste supprimé avec succès").build();
    }

    @PUT
    @Path("/{id}")
    public Response updateArtiste(@PathParam("id") Long id, Artiste artiste) {
        artisteDao.update(id, artiste.getNom());
        return Response.ok().entity("Artiste mis à jour avec succès").build();
    }
}
