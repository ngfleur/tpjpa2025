package rest;

import java.util.List;
import java.util.stream.Collectors;

import dao.GenreMusicalDao;
import domain.GenreMusical;
import dto.GenreMusicalDtoIn;
import dto.GenreMusicalDtoOut;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;
import jpa.EntityManagerHelper;

@Path("genreMusical")
@Produces("application/json")
@Consumes("application/json")
public class GenreMusicalRessource {

    private final GenreMusicalDao genreMusicalDao = new GenreMusicalDao(EntityManagerHelper.getEntityManager());

    @GET
    @Path("/{id}")
    public Response getGenreMusicalById(@PathParam("id") Long id) {
        GenreMusical genre = genreMusicalDao.getGenreMusicalById(id);
        if (genre == null) {
            return Response.status(Response.Status.NOT_FOUND).entity("Genre Musical non trouvé").build();
        }
        return Response.ok(new GenreMusicalDtoOut(genre)).build();
    }

    @GET
    public List<GenreMusicalDtoOut> getAllGenreMusical() {
        return genreMusicalDao.getAllGenreMusical()
                .stream()
                .map(GenreMusicalDtoOut::new)
                .collect(Collectors.toList());
    }

    @POST
    public Response addGenreMusical(@Parameter(description = "Genre Musical à ajouter", required = true) GenreMusicalDtoIn dtoIn) {
        GenreMusical genre = new GenreMusical();
        genre.setNom(dtoIn.getNom());
        genreMusicalDao.save(genre.getNom());
        return Response.status(Response.Status.CREATED).entity("Genre Musical ajouté avec succès").build();
    }

    @PUT
    @Path("/{id}")
    public Response updateGenreMusical(@PathParam("id") Long id, GenreMusicalDtoIn dtoIn) {
        genreMusicalDao.update(id, dtoIn.getNom());
        return Response.ok().entity("Genre Musical mis à jour avec succès").build();
    }

    @DELETE
    @Path("/{id}")
    public Response deleteGenreMusical(@PathParam("id") Long id) {
        genreMusicalDao.delete(id);
        return Response.ok().entity("Genre Musical supprimé avec succès").build();
    }
}
