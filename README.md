# Template de projet pour le TP JPA 2025 UniR
# Compte rendu de l'avancement du projet

## Nous avons effectué une première modelisation en UML, que nous ajustons au fur et à mesure de l'avancement du projet en fonction du besoin qui se presente.

## Nous avons ensuite créés nos modèles de classes pour nous permettre de créer les tables dans la base de données. Après la création des modèles, nous avons rencontrés des problèmes lors du test pour la création des tables dans la base de données. Ces problèmes sont dû du fait que nous avons utilisés des annotations dans des endroits differents dans une même classe. En reglant ces soucis, les tables ont pu être créés dans la base de données.

## Nous avons également créé les Dao de chacune des classes en utilisant des méthodes qui nous permettent de recupérer la liste totale des élements d'une classe, de récupérer un élement d'une classe par son id, et aussi mettre en place les méthodes pour les actions de base avec CRUD (Create Read Update Delete) qui nous permettrons de manipuler la base de données. Toute fois, nous avons rencontrés des problèmes, par exemple sur la méthode save nous avons utilisé un objet de la classe en paramètre sauf que dans un de nos tests on redéfinait l'objet en question ce qui faisait que ça écrasait toutes les données passées en paramètre.

## Après avoir fini de coder les classes Dao, nous avons créé une api pour l'utilisateur et avions testé pour voir si réellement la Dao utilisateur fonctionnait. En faisant cela et en effectuant les tests avec Postman nous avons pu créer un utilisateur, le modifier, le récuperer par son identifiant et aussi le supprimer et nous avons aussi vérifié à ce que les données soient effectivement dans la base de données.


# Des points que nous n'avons pas pris en compte lors de la modélisation et que nous comptons ajouter:
## Lors de notre modélisation, nous n'avons pas pris en compte les types de tickets et d'utilisateur, nous comptons donc ajouter à notre modélisation une classe TypeTicket qui héritera de la classe Ticket, et aussi une classe Admin et Organisateur qui hériteront de la classe Utilisateur. D'autres modifications pourront potentiellement être fait et cela en fonction du besoin qui se presentera.

# Travail effectué : 
### Modélisation UML
### Créations des classes
### Création de la base de données et des tables
### Création des Dao
### Création d'une ressource api pour utilisateur (afin de tester la dao utilisateur)




