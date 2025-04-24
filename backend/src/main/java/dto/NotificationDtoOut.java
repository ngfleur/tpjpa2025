package dto;

import domain.Notification;

public class NotificationDtoOut {
    private Long id;
    private String contenu;
    private Long evenementId;

    public NotificationDtoOut(Notification notification) {
        this.id = notification.getId();
        this.contenu = notification.getContenu();
        this.evenementId = notification.getEvenement() != null ? notification.getEvenement().getId() : null;
    }

    public Long getId() {
        return id;
    }

    public String getContenu() {
        return contenu;
    }

    public Long getEvenementId() {
        return evenementId;
    }
}
