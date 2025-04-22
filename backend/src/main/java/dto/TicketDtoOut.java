package dto;

public class TicketDtoOut {
    private Long id;
    private Double prixPaye;
    private Long utilisateurId;
    private Long placeId;
    private Long evenementId;

    public TicketDtoOut() {}

    public TicketDtoOut(Long id, Double prixPaye, Long utilisateurId, Long placeId, Long evenementId) {
        this.id = id;
        this.prixPaye = prixPaye;
        this.utilisateurId = utilisateurId;
        this.placeId = placeId;
        this.evenementId = evenementId;
    }

    public Long getId() {
        return id;
    }

    public Double getPrixPaye() {
        return prixPaye;
    }

    public Long getUtilisateurId() {
        return utilisateurId;
    }

    public Long getPlaceId() {
        return placeId;
    }

    public Long getEvenementId() {
        return evenementId;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setPrixPaye(Double prixPaye) {
        this.prixPaye = prixPaye;
    }

    public void setUtilisateurId(Long utilisateurId) {
        this.utilisateurId = utilisateurId;
    }

    public void setPlaceId(Long placeId) {
        this.placeId = placeId;
    }

    public void setEvenementId(Long evenementId) {
        this.evenementId = evenementId;
    }
}
