package dto;

public class TicketDtoIn {
    private Double prixPaye;
    private Long utilisateurId;
    private Long placeId;
    private Long evenementId;

    public TicketDtoIn() {}

    public TicketDtoIn(Double prixPaye, Long utilisateurId, Long placeId, Long evenementId) {
        this.prixPaye = prixPaye;
        this.utilisateurId = utilisateurId;
        this.placeId = placeId;
        this.evenementId = evenementId;
    }

    public Double getPrixPaye() {
        return prixPaye;
    }

    public void setPrixPaye(Double prixPaye) {
        this.prixPaye = prixPaye;
    }

    public Long getUtilisateurId() {
        return utilisateurId;
    }

    public void setUtilisateurId(Long utilisateurId) {
        this.utilisateurId = utilisateurId;
    }

    public Long getPlaceId() {
        return placeId;
    }

    public void setPlaceId(Long placeId) {
        this.placeId = placeId;
    }

    public Long getEvenementId() {
        return evenementId;
    }

    public void setEvenementId(Long evenementId) {
        this.evenementId = evenementId;
    }
}
