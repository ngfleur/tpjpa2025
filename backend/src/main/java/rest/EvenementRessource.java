package rest;

import dao.EvenementDao;
import dao.UtilisateurDao;
import domain.Artiste;
import domain.Evenement;
import domain.GenreMusical;
import domain.Utilisateur;
import dto.EvenementDtoOut;
import enums.RoleUtilisateur;
import jakarta.annotation.security.RolesAllowed;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;

import java.util.List;
import java.util.stream.Collectors;


@Path("evenement")
@Produces("application/json")
@Consumes("application/json")
public class EvenementRessource {

    private final EvenementDao evenementDao = new EvenementDao();
    private final UtilisateurDao utilisateurDao = new UtilisateurDao();

    @GET
    public List<EvenementDtoOut> getAllEvenements() {
        return evenementDao.getAllEvenement().stream()
                .map(EvenementDtoOut::new)
                .collect(Collectors.toList());
    }

    @GET
    @Path("/{id}")
    public Response getEvenementById(@PathParam("id") Long id) {
        Evenement evt = evenementDao.getEvenementById(id);
        if (evt != null) {
            return Response.ok(new EvenementDtoOut(evt)).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("Événement non trouvé").build();
        }
    }

    @GET
    @Path("/by-organisateur/{organisateurId}")
    public Response getEvenementsByOrganisateurId(@PathParam("organisateurId") Long organisateurId) {
        Utilisateur user = utilisateurDao.getUtilisateurById(organisateurId);
        if (user == null) {
            return Response.status(Response.Status.NOT_FOUND).entity("Utilisateur non trouvé").build();
        }
        if (!user.getRole().equals(RoleUtilisateur.Organisateur)) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("Cet utilisateur n'est pas un organisateur").build();
        }

        List<EvenementDtoOut> evts = user.getEvenements().stream()
                .map(EvenementDtoOut::new)
                .collect(Collectors.toList());

        return Response.ok(evts).build();
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
