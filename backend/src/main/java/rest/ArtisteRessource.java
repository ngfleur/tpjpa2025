package rest;

import java.util.List;
import java.util.stream.Collectors;

import dao.ArtisteDao;
import domain.Artiste;
import dto.ArtisteDtoIn;
import dto.ArtisteDtoOut;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;
import jpa.EntityManagerHelper;

@Path("artiste")
@Produces("application/json")
@Consumes("application/json")
public class ArtisteRessource {

    private final ArtisteDao artisteDao = new ArtisteDao(EntityManagerHelper.getEntityManager());

    @GET
    @Path("/{id}")
    public Response getArtisteById(@PathParam("id") Long id) {
        Artiste artiste = artisteDao.getArtisteById(id);
        if (artiste == null) {
            return Response.status(Response.Status.NOT_FOUND).entity("Artiste non trouvé").build();
        }
        return Response.ok(new ArtisteDtoOut(artiste)).build();
    }

    @GET
    public List<ArtisteDtoOut> getAllArtistes() {
        return artisteDao.getAllArtiste()
                .stream()
                .map(ArtisteDtoOut::new)
                .collect(Collectors.toList());
    }

    @POST
    public Response addArtiste(@Parameter(description = "Artiste à ajouter", required = true) ArtisteDtoIn dtoIn) {
        Artiste artiste = new Artiste();
        artiste.setNom(dtoIn.getNom());
        artisteDao.save(artiste.getNom());
        return Response.status(Response.Status.CREATED).entity("Artiste ajouté avec succès").build();
    }

    @PUT
    @Path("/{id}")
    public Response updateArtiste(@PathParam("id") Long id, ArtisteDtoIn dtoIn) {
        artisteDao.update(id, dtoIn.getNom());
        return Response.ok().entity("Artiste mis à jour avec succès").build();
    }

    @DELETE
    @Path("/{id}")
    public Response deleteArtiste(@PathParam("id") Long id) {
        artisteDao.delete(id);
        return Response.ok().entity("Artiste supprimé avec succès").build();
    }
}
