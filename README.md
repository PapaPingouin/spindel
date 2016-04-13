spindel
=

runner
-
(N instances)
nodejs - ouverture port **2908**, attente connexion socketio
première connection renvoi l'etat de la machine (hardware info) et l'etat des process si existants
une fois connecté, heartbeat toutes les minutes
attend de recevoir les ordres et lance les taches.

Execute des scripts (php,js,shell,pyton...).

1 runner gère N workers (Crawler/Parser/Analyser ...)


dispatcher
-
nodejs - ouvrture port **2909** (connection depuis le commander)
se connecte aux runners, et maintient la connection.
Il connait les ip des runners, leurs status courant, et leurs capacité
il maintient aussi les actions en cours


commander
-
envoi les demandes de traitement au dispatcher
monitore le dispatcher (et donc les runners et les processus)


stocker
-
webservice de stockage de données (mariadb/mongo/elastic), et maintient la coéhrence.


finder
-
webservice de recherche de données (elastic)


filer
-
Stockage de fichiers de scripts. Utilisé pour le déploiement des runners. Tous les scripts sont récupérés depuis le filer, uploadés sur le runner avant d'être exécuté. 
Les scripts embarques les numéros de version, et les pré-requis pour fonctionner. 

