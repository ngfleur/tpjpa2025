package dao;

import domain.Notification;
import domain.Ticket;
import domain.Utilisateur;
import jakarta.persistence.*;
import jpa.EntityManagerHelper;

import java.util.List;

public class UtilisateurDao {

    private EntityManager manager;

    public UtilisateurDao() {
        this.manager = EntityManagerHelper.getEntityManager();
    }

    public List<Utilisateur> getAllUtilisateur() {
        String s = "select u from Utilisateur as u";
        return manager.createQuery(s, Utilisateur.class).getResultList();
    }

    public Utilisateur getUtilisateurById(Long id) {
        return manager.find(Utilisateur.class, id);
    }

    public List<Ticket> getTicketsByUtilisateurId(Long id) {
        EntityTransaction tx = manager.getTransaction();
        List<Ticket> tickets;

        try {
            tx.begin();
            TypedQuery<Ticket> query = manager.createQuery(
                    "select t from Ticket t where t.utilisateur.id = :id", Ticket.class);
            query.setParameter("id", id);
            tickets = query.getResultList();
            tx.commit();
        } catch (Exception e) {
            if (tx.isActive()) tx.rollback();
            throw e;
        }
        return tickets;
    }

    public List<Notification> getNotificationsByUtilisateurId(Long id) {
        EntityTransaction tx = manager.getTransaction();
        List<Notification> notifs;

        try {
            tx.begin();
            TypedQuery<Notification> query = manager.createQuery(
                    "select n from Notification n join n.utilisateurs u where u.id = :id", Notification.class);
            query.setParameter("id", id);
            notifs = query.getResultList();
            tx.commit();
        } catch (Exception e) {
            if (tx.isActive()) tx.rollback();
            throw e;
        }
        return notifs;
    }

    public Utilisateur save(Utilisateur utilisateur) {
        EntityTransaction tx = manager.getTransaction();
        try {
            tx.begin();
            manager.persist(utilisateur);
            tx.commit();
        } catch (Exception e) {
            if (tx.isActive()) tx.rollback();
            throw e;
        }
        return utilisateur;
    }

    public Utilisateur getUtilisateurByEmail(String email) {
        try {
            return manager.createQuery("select u from Utilisateur u WHERE u.email = :email", Utilisateur.class)
                    .setParameter("email", email)
                    .getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

    public Utilisateur authentifier(String email, String mdp) {
        EntityTransaction tx = manager.getTransaction();
        Utilisateur utilisateur;
        try {
            tx.begin();
            TypedQuery<Utilisateur> query = manager.createQuery(
                    "select u from Utilisateur u where u.email = :email and u.mdp = :mdp", Utilisateur.class);
            query.setParameter("email", email);
            query.setParameter("mdp", mdp);
            utilisateur = query.getSingleResult();
            tx.commit();
        } catch (Exception e) {
            if (tx.isActive()) tx.rollback();
            throw e;
        }
        return utilisateur;
    }

    public Utilisateur update(Utilisateur utilisateur) {
        EntityTransaction tx = manager.getTransaction();
        try {
            tx.begin();
            Utilisateur old = manager.find(Utilisateur.class, utilisateur.getId());
            if (old == null) {
                throw new EntityNotFoundException("Utilisateur non trouvé pour l'id : " + utilisateur.getId());
            }
            old.setName(utilisateur.getName());
            old.setFirstName(utilisateur.getFirstName());
            old.setEmail(utilisateur.getEmail());
            old.setRole(utilisateur.getRole());
            old.setMdp(utilisateur.getMdp()); // Ajout de la mise à jour du mot de passe
            tx.commit();
        } catch (Exception e) {
            if (tx.isActive()) tx.rollback();
            throw e;
        }
        return utilisateur;
    }

    public Utilisateur read(Long id) {
        EntityTransaction tx = manager.getTransaction();
        Utilisateur utilisateur;
        try {
            tx.begin();
            utilisateur = manager.find(Utilisateur.class, id);
            if (utilisateur == null) {
                throw new EntityNotFoundException("Utilisateur non trouvé pour l'id : " + id);
            }
            tx.commit();
        } catch (Exception e) {
            if (tx.isActive()) tx.rollback();
            throw e;
        }
        return utilisateur;
    }

    public void delete(Long id) {
        EntityTransaction tx = manager.getTransaction();
        try {
            tx.begin();
            Utilisateur utilisateur = manager.find(Utilisateur.class, id);
            if (utilisateur == null) {
                throw new EntityNotFoundException("Utilisateur non trouvé pour l'id : " + id);
            }
            manager.remove(utilisateur);
            tx.commit();
        } catch (Exception e) {
            if (tx.isActive()) tx.rollback();
            throw e;
        }
    }
}