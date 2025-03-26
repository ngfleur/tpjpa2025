package jpa;

import domain.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.EntityTransaction;
import jakarta.persistence.Persistence;

import java.util.List;

public class JpaTest {

	private EntityManager manager;

	public JpaTest(EntityManager manager) {
		this.manager = manager;
	}

	public static void main(String[] args) {
		// Créez l'EntityManager et la factory
		EntityManagerFactory factory = Persistence.createEntityManagerFactory("example");
		EntityManager manager = factory.createEntityManager();
		JpaTest test = new JpaTest(manager);

		// Début de la transaction
		EntityTransaction tx = manager.getTransaction();
		tx.begin();
		try {
			test.createTestData();  // Crée les données de test
		} catch (Exception e) {
			e.printStackTrace();
		}
		tx.commit();

		// Affiche les événements
		test.listEvenements();

		manager.close();
		System.out.println(".. done");
	}

	private void createTestData() {
		// Création des genres musicaux
		GenreMusical rock = new GenreMusical();
		rock.setNom("Rock");
		GenreMusical pop = new GenreMusical();
		pop.setNom("Pop");

		manager.persist(rock);
		manager.persist(pop);

		// Création des artistes
		Artiste artiste1 = new Artiste();
		artiste1.setNom("John Doe");
		artiste1.setBiographie("Artiste de rock célèbre");
		Artiste artiste2 = new Artiste();
		artiste2.setNom("Jane Doe");
		artiste2.setBiographie("Artiste de pop très populaire");

		manager.persist(artiste1);
		manager.persist(artiste2);

		// Création de la salle et des places
		Salle salle = new Salle();
		salle.setNom("Madison Square Garden");
		salle.setCapacite(20000);

		// Création des places dans la salle
		Place place1 = new Place();
		place1.setNumeroPlace("A1");
		place1.setSalle(salle);  // Liaison de la place à la salle

		Place place2 = new Place();
		place2.setNumeroPlace("A2");
		place2.setSalle(salle);  // Liaison de la place à la salle

		manager.persist(salle);
		manager.persist(place1);
		manager.persist(place2);

		// Création d'un événement
		Evenement evenement = new Evenement();
		evenement.setNom("Concert de John Doe");
		evenement.setDate(new java.util.Date());
		evenement.setLieu("Madison Square Garden");
		evenement.setPrix(100);
		evenement.setDescription("Concert exceptionnel de John Doe");

		// Associer artistes et genres à l'événement
		evenement.setArtistes(List.of(artiste1, artiste2));
		evenement.setGenreMusicaux(List.of(rock, pop));
		evenement.setSalle(salle);  // L'événement se déroule dans la salle

		manager.persist(evenement);

		// Création des notifications (associées à l'événement)
		Notification notif = new Notification();
		notif.setMessage("Concert de John Doe bientôt disponible!");
		notif.setEvenement(evenement);  // Notification liée à l'événement

		manager.persist(notif);

		// Création d'un utilisateur
		Utilisateur utilisateur = new Utilisateur();
		utilisateur.setNom("Alice");
		utilisateur.setEmail("alice@example.com");

		// Création du ticket pour l'utilisateur
		Ticket ticket = new Ticket();
		ticket.setPrix(100.0);
		ticket.setUtilisateur(utilisateur);  // Associe un utilisateur au ticket
		ticket.setEvenement(evenement);  // Le ticket est pour l'événement

		// Persisting the ticket and the user
		manager.persist(utilisateur);
		manager.persist(ticket);
	}

	private void listEvenements() {
		// Requête pour lister les événements
		List<Evenement> evenements = manager.createQuery("SELECT e FROM Evenement e", Evenement.class).getResultList();
		for (Evenement evenement : evenements) {
			System.out.println(evenement.getNom());
		}
	}
}
