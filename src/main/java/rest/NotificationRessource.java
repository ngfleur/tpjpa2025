package rest;

import java.util.List;

import dao.NotificationDao;
import domain.Notification;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;
import jpa.EntityManagerHelper;

@Path("notifications")
@Produces("application/json")
@Consumes("application/json")
public class NotificationRessource {

    private final NotificationDao notificationDao = new NotificationDao(EntityManagerHelper.getEntityManager());

    @GET
    @Path("/{id}")
    public Notification getNotificationById(@PathParam("id") Long id) {
        return notificationDao.getNotificationById(id);
    }

    @GET
    public List<Notification> getAllNotifications() {
        return notificationDao.getAllNotification();
    }

    @POST
    public Response addNotification(@Parameter(description = "Notification object", required = true) Notification notification) {
        notificationDao.save(notification.getContenu(), notification.getEvenement());
        return Response.status(Response.Status.CREATED).entity("Notification ajoutée avec succès").build();
    }

    @DELETE
    @Path("/{id}")
    public Response deleteNotification(@PathParam("id") Long id) {
        notificationDao.delete(id);
        return Response.ok().entity("Notification supprimée avec succès").build();
    }

    @PUT
    @Path("/{id}")
    public Response updateNotification(@PathParam("id") Long id, Notification notification) {
        notificationDao.update(id, notification.getContenu(), notification.getEvenement());
        return Response.ok().entity("Notification mise à jour avec succès").build();
    }
}
