package dto;

public class PlaceDtoIn {

    private String numeroEmplacement;
    private Long salleId;

    public PlaceDtoIn() {
    }

    public PlaceDtoIn(String numeroEmplacement, Long salleId) {
        this.numeroEmplacement = numeroEmplacement;
        this.salleId = salleId;
    }

    public String getNumeroEmplacement() {
        return numeroEmplacement;
    }

    public void setNumeroEmplacement(String numeroEmplacement) {
        this.numeroEmplacement = numeroEmplacement;
    }

    public Long getSalleId() {
        return salleId;
    }

    public void setSalleId(Long salleId) {
        this.salleId = salleId;
    }
}
