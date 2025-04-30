package jpa;


import domain.Evenement;
import domain.Utilisateur;
import enums.RoleUtilisateur;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityTransaction;
import org.mindrot.jbcrypt.BCrypt;

import java.util.Calendar;
import java.util.Date;

public class JpaTest {


    public static void main(String[] args) {
        EntityManager manager = EntityManagerHelper.getEntityManager();
        EntityTransaction tx = manager.getTransaction();
        tx.begin();

        try {
            // Un utilisateur de test
            String pw = BCrypt.hashpw("test", BCrypt.gensalt());
            Utilisateur user = new Utilisateur("test", "test", "test@test.com", pw, RoleUtilisateur.ORGANISATEUR);
            manager.persist(user);

            // Des évènements de test
            Calendar cal = Calendar.getInstance();
            for (int i = 0; i < 5; i++) {
                cal.add(Calendar.DAY_OF_MONTH, i);
                Date dateDebut = cal.getTime();
                cal.add(Calendar.HOUR, 2);
                Date dateFin = cal.getTime();

                Evenement evt = new Evenement();
                evt.setTitre("Événement test " + (i + 1));
                evt.setDescription("Description de l'événement test " + (i + 1));
                evt.setDateDebut(dateDebut);
                evt.setDateFin(dateFin);
                evt.setLieu("Lieu test " + (i + 1));
                evt.setPrix(10.0 + i);
                evt.setCapacite(100 + i * 10);

                manager.persist(evt);
            }

            tx.commit();
            System.out.println("Données de test ajoutées");
        } catch (Exception e) {
            e.printStackTrace();
        }


        manager.close();
        EntityManagerHelper.closeEntityManagerFactory();
        System.out.println(".. done");
    }


}
