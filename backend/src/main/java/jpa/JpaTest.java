package jpa;


import domain.Utilisateur;
import enums.RoleUtilisateur;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityTransaction;
import org.mindrot.jbcrypt.BCrypt;

public class JpaTest {


    public static void main(String[] args) {
        EntityManager manager = EntityManagerHelper.getEntityManager();
        EntityTransaction tx = manager.getTransaction();
        tx.begin();

        try {
            String pw = BCrypt.hashpw("test", BCrypt.gensalt());
            Utilisateur user = new Utilisateur("test", "test", "test@test.com", pw, RoleUtilisateur.ORGANISATEUR);
            manager.persist(user);
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
