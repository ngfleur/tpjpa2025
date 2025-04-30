package rest;

import dao.UtilisateurDao;
import domain.Utilisateur;
import dto.ConnexionDto;
import dto.UtilisateurDtoIn;
import dto.UtilisateurDtoOut;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;
import org.mindrot.jbcrypt.BCrypt;

import java.util.List;
import java.util.stream.Collectors;

@Path("utilisateur")
@Produces("application/json")
@Consumes("application/json")
public class UtilisateurRessource {

    private final UtilisateurDao utilisateurDao = new UtilisateurDao();

    @POST
    @Path("/login")
    public Response login(ConnexionDto connexionDto) {

        System.out.println("Email reçu: " + connexionDto.getEmail());
        System.out.println("Mot de passe reçu: " + connexionDto.getMdp());

        try {
            Utilisateur utilisateur = utilisateurDao.getUtilisateurByEmail(connexionDto.getEmail());

            if (utilisateur == null) {
                System.out.println("Utilisateur non trouvé");
                return Response.status(Response.Status.UNAUTHORIZED).entity("Email incorrect").build();
            }

            // Vérification du mot de passe
            boolean motDePasseValide = BCrypt.checkpw(connexionDto.getMdp(), utilisateur.getMdp());
            System.out.println("Mot de passe valide: " + motDePasseValide);
            if (!motDePasseValide) {
                return Response.status(Response.Status.UNAUTHORIZED).entity("Mot de passe incorrect").build();
            }

            // --- Génération d'un faux token (plus tard tu peux mettre JWT) ---
            String token = "dummy-token-for-user-" + utilisateur.getId();

            // --- Retour d'un JSON avec le token ---
            String responseJson = "{\"token\": \"" + token + "\"}";

            return Response.ok(responseJson).build();

            // Authentification réussie
            /*UtilisateurDtoOut utilisateurDtoOut = new UtilisateurDtoOut(utilisateur);
            return Response.ok(utilisateurDtoOut).build();*/
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Erreur serveur").build();
        }
    }


    @POST
    @Path("/register")
    public Response register(ConnexionDto connexionDto) {

        System.out.println("nom reçu: " + connexionDto.getEmail());
        System.out.println("prenom reçu: " + connexionDto.getMdp());
        System.out.println("Email reçu: " + connexionDto.getEmail());
        System.out.println("Mot de passe reçu: " + connexionDto.getMdp());
        System.out.println("role: " + connexionDto.getEmail());

        try {
            Utilisateur utilisateur = utilisateurDao.getUtilisateurByEmail(connexionDto.getEmail());

            if (utilisateur == null) {
                System.out.println("Utilisateur non trouvé");
                return Response.status(Response.Status.UNAUTHORIZED).entity("Email incorrect").build();
            }

            // Vérification du mot de passe
            boolean motDePasseValide = BCrypt.checkpw(connexionDto.getMdp(), utilisateur.getMdp());
            System.out.println("Mot de passe valide: " + motDePasseValide);
            if (!motDePasseValide) {
                return Response.status(Response.Status.UNAUTHORIZED).entity("Mot de passe incorrect").build();
            }

            // --- Génération d'un faux token (plus tard tu peux mettre JWT) ---
            String token = "dummy-token-for-user-" + utilisateur.getId();

            // --- Retour d'un JSON avec le token ---
            String responseJson = "{\"token\": \"" + token + "\"}";

            return Response.ok(responseJson).build();

            // Authentification réussie
            /*UtilisateurDtoOut utilisateurDtoOut = new UtilisateurDtoOut(utilisateur);
            return Response.ok(utilisateurDtoOut).build();*/
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Erreur serveur").build();
        }
    }


    @POST
    @Path("/verify-token")
    public Response verifyToken(@HeaderParam("Authorization") String authHeader) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return Response.status(Response.Status.UNAUTHORIZED).entity("Jeton invalide").build();
            }

            String token = authHeader.substring(7); // Supprimer le préfixe "Bearer "
            // Validation fictive du jeton (remplacez par une validation JWT plus tard)
            if (token.startsWith("dummy-token-for-user-")) {
                return Response.ok().build();
            }

            return Response.status(Response.Status.UNAUTHORIZED).entity("Jeton invalide").build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Erreur serveur").build();
        }
    }

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
        user.setMdp(BCrypt.hashpw(dtoIn.getMdp(), BCrypt.gensalt()));

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
        user.setMdp(dtoIn.getMdp());

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