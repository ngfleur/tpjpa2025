package enums;

public enum RoleUtilisateur {
        ADMIN("admin"),
        ORGANISATEUR("organisateur"),
        PARTICIPANT("participant");

        private String role;

        RoleUtilisateur(String role) {
            this.role = role;
        }

        public String getRole() {
            return role;
        }
}
