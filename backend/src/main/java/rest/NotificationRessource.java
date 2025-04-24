package rest;

import java.util.List;
import java.util.stream.Collectors;

import dao.EvenementDao;
import dao.NotificationDao;
import domain.Evenement;
import domain.Notification;
import dto.NotificationDtoIn;
import dto.NotificationDtoOut;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;
import jpa.EntityManagerHelper;

@Path("notifications")
@Produces("application/json")
@Consumes("application/json")
public class NotificationRessource {

    private final NotificationDao notificationDao = new NotificationDao();
    private final EvenementDao evenementDao = new EvenementDao();

    @GET
    @Path("/{id}")
    public Response getNotificationById(@PathParam("id") Long id) {
        Notification notif = notificationDao.getNotificationById(id);
        if (notif == null) {
            return Response.status(Response.Status.NOT_FOUND).entity("Notification non trouvée").build();
        }
        return Response.ok(new NotificationDtoOut(notif)).build();
    }

    @GET
    public List<NotificationDtoOut> getAllNotifications() {
        return notificationDao.getAllNotification()
                .stream()
                .map(NotificationDtoOut::new)
                .collect(Collectors.toList());
    }

    @POST
    public Response addNotification(@Parameter(description = "Notification à ajouter", required = true) NotificationDtoIn dtoIn) {
        Evenement evenement = evenementDao.getEvenementById(dtoIn.getEvenementId());
        if (evenement == null) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Événement non trouvé").build();
        }
        notificationDao.save(dtoIn.getContenu(), evenement);
        return Response.status(Response.Status.CREATED).entity("Notification ajoutée avec succès").build();
    }

    @PUT
    @Path("/{id}")
    public Response updateNotification(@PathParam("id") Long id, NotificationDtoIn dtoIn) {
        Evenement evenement = evenementDao.getEvenementById(dtoIn.getEvenementId());
        if (evenement == null) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Événement non trouvé").build();
        }
        notificationDao.update(id, dtoIn.getContenu(), evenement);
        return Response.ok().entity("Notification mise à jour avec succès").build();
    }

    @DELETE
    @Path("/{id}")
    public Response deleteNotification(@PathParam("id") Long id) {
        notificationDao.delete(id);
        return Response.ok().entity("Notification supprimée avec succès").build();
    }
}
