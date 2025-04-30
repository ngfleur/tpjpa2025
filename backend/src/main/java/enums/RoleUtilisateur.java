package enums;

public enum RoleUtilisateur {
    ADMIN("Admin"),
    ORGANISATEUR("Organisateur"),
    PARTICIPANT("Participant");

    private String role;

    RoleUtilisateur(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }
}
