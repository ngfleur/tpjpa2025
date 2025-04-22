package enums;

public enum StatutEvenement {
        OUVERT("ouvert"),
        COMPLET("complet"),
        EN_COURS("encours"),
        TERMINE("termine"),
        ANNULE("annule");

        private String statut;

        StatutEvenement(String statut) {
            this.statut = statut;
        }

        public String getStatut() {
            return statut;
        }
}
