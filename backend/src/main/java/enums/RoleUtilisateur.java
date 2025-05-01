package enums;

public enum RoleUtilisateur {
    Admin("Admin"),
    Organisateur("Organisateur"),
    Participant("Participant");

    private String role;

    RoleUtilisateur(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }
}
