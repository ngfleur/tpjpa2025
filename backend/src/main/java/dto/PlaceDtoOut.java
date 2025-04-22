package dto;

import java.util.List;

public class PlaceDtoOut {

    private Long id;
    private String numeroEmplacement;
    private Long salleId;

    public PlaceDtoOut() {
    }

    public PlaceDtoOut(Long id, String numeroEmplacement, Long salleId) {
        this.id = id;
        this.numeroEmplacement = numeroEmplacement;
        this.salleId = salleId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
