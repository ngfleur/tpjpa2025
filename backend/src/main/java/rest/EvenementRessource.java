package rest;

import dao.EvenementDao;
import domain.Artiste;
import domain.Evenement;
import domain.GenreMusical;
import jakarta.annotation.security.RolesAllowed;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;

import java.util.List;


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
    @Transactional
    @RolesAllowed("ORGANISATEUR")
    public Response addEvenement(Evenement evenement) {
        try {
            // Valider les champs requis
            if (evenement.getTitre() == null || evenement.getDateDebut() == null || evenement.getDateFin() == null) {
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity("Titre, dateDebut et dateFin sont requis")
                        .build();
            }

            // Vérifier que les artistes et genres musicaux existent
            if (evenement.getArtistes() != null) {
                for (Artiste artiste : evenement.getArtistes()) {
                    if (artiste.getId() == null || !evenementDao.artisteExists(artiste.getId())) {
                        return Response.status(Response.Status.BAD_REQUEST)
                                .entity("Artiste avec ID " + artiste.getId() + " n'existe pas")
                                .build();
                    }
                }
            }

            if (evenement.getGenreMusicaux() != null) {
                for (GenreMusical genre : evenement.getGenreMusicaux()) {
                    if (genre.getId() == null || !evenementDao.genreMusicalExists(genre.getId())) {
                        return Response.status(Response.Status.BAD_REQUEST)
                                .entity("Genre musical avec ID " + genre.getId() + " n'existe pas")
                                .build();
                    }
                }
            }

            evenementDao.save(evenement);
            return Response.status(Response.Status.CREATED)
                    //.entity("Événement ajouté avec succès").build();
                    .entity(evenement).build();

        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Erreur lors de la création de l'événement: " + e.getMessage())
                    .build();
        }
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
