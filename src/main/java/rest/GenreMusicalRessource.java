package rest;

import java.util.List;

import dao.GenreMusicalDao;
import domain.GenreMusical;
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

@Path("genreMusical")
@Produces("application/json")
@Consumes("application/json")
public class GenreMusicalRessource {

    private final GenreMusicalDao genreMusicalDao = new GenreMusicalDao(EntityManagerHelper.getEntityManager());

    @GET
    @Path("/{id}")
    public GenreMusical getGenreMusicalById(@PathParam("id") Long id) {
        return genreMusicalDao.getGenreMusicalById(id);
    }

    @GET
    public List<GenreMusical> getAllGenreMusical() {
        return genreMusicalDao.getAllGenreMusical();
    }

    @POST
    public Response addGenreMusical(@Parameter(description = "Genre Musical object", required = true) GenreMusical genreMusical) {
        genreMusicalDao.save(genreMusical.getNom());
        return Response.ok().entity("Genre Musical ajouté avec succès").build();
    }

    @DELETE
    @Path("/{id}")
    public Response deleteGenreMusical(@PathParam("id") Long id) {
        genreMusicalDao.delete(id);
        return Response.ok().entity("Genre Musical supprimé avec succès").build();
    }

    @PUT
    @Path("/{id}")
    public Response updateGenreMusical(@PathParam("id") Long id, GenreMusical genreMusical) {
        genreMusicalDao.update(id, genreMusical.getNom());
        return Response.ok().entity("Genre Musical mis à jour avec succès").build();
    }
}
