package rest;

import java.util.List;
import java.util.stream.Collectors;

import dao.SalleDao;
import domain.Place;
import domain.Salle;
import dto.SalleDtoIn;
import dto.SalleDtoOut;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;

@Path("salle")
@Produces("application/json")
@Consumes("application/json")
public class SalleRessource {

    private final SalleDao salleDao = new SalleDao();

    @GET
    @Path("/{id}")
    public SalleDtoOut getSalleById(@PathParam("id") Long id) {
        Salle salle = salleDao.getSalleById(id);
        return new SalleDtoOut(salle.getId(), salle.getName(), salle.getAdresseSalle());
    }

    @GET
    public List<SalleDtoOut> getAllSalles() {
        return salleDao.getAllSalle().stream()
                .map(s -> new SalleDtoOut(s.getId(), s.getName(), s.getAdresseSalle()))
                .collect(Collectors.toList());
    }

    @POST
    public Response addSalle(SalleDtoIn dto) {
        Salle salle = new Salle();
        salle.setName(dto.getName());
        salle.setAdresseSalle(dto.getAdresseSalle());
        salleDao.save(salle);
        return Response.ok("Salle ajoutée avec succès").build();
    }

    @PUT
    @Path("/{id}")
    public Response updateSalle(@PathParam("id") Long id, SalleDtoIn dto) {
        salleDao.update(id, dto.getName(), dto.getAdresseSalle());
        return Response.ok("Salle mise à jour avec succès").build();
    }

    @DELETE
    @Path("/{id}")
    public Response deleteSalle(@PathParam("id") Long id) {
        salleDao.delete(id);
        return Response.ok("Salle supprimée avec succès").build();
    }

    @GET
    @Path("/{id}/places")
    public List<Place> getPlacesBySalleId(@PathParam("id") Long id) {
        return salleDao.getPlacesBySalleId(id);
    }
}
