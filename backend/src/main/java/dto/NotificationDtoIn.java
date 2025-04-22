package dto;

public class NotificationDtoIn {
    private String contenu;
    private Long evenementId; // uniquement l'ID de l'événement

    public String getContenu() {
        return contenu;
    }

    public void setContenu(String contenu) {
        this.contenu = contenu;
    }

    public Long getEvenementId() {
        return evenementId;
    }

    public void setEvenementId(Long evenementId) {
        this.evenementId = evenementId;
    }
}
