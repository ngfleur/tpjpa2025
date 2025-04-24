package dto;

public class TicketDto {
    public Double prixPaye;
    public String typeTicket;  // "STANDARD" ou "PREMIUM"

    public Long utilisateurId;
    public Long placeId;
    public Long evenementId;

    // Champs pour TicketStandard
    public Boolean placeAssise;
    public String zone;

    // Champs pour TicketPremium
    public Boolean accesVip;
    public String cadeau;
}

