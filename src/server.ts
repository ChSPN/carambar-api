// src/server.ts

/**
 * Point d'entrée de l'application serveur
 * 
 * Ce module est responsable de :
 * - L'initialisation ordonnée des composants du système
 * - Le démarrage du serveur HTTP
 * - La gestion des erreurs fatales au démarrage
 * 
 * Il représente la couche la plus haute de l'application et orchestre
 * le processus de démarrage complet.
 */
import app from "./app.js";
import { seedJokes } from "./seeds/joke.seed.js";

/**
 * Port d'écoute du serveur
 * 
 * Utilise la variable d'environnement PORT si définie, sinon utilise 3000.
 * Cette approche permet de:
 * - Faciliter le déploiement sur différentes plateformes (Heroku, Docker, etc.)
 * - Éviter les conflits de port en environnement de développement
 */
const PORT = process.env.PORT || 3000;

/**
 * Fonction asynchrone d'initialisation et démarrage du serveur
 * 
 * L'approche async/await permet une séquence d'initialisation claire et ordonnée,
 * où chaque étape attend la complétion de la précédente avant de continuer.
 * Cette séquentialité est essentielle pour garantir que le système est
 * entièrement configuré avant d'accepter des connexions.
 */
async function startServer() {
  // Initialisation préalable de la base de données avec des données test
  // Cette étape garantit que l'API retourne du contenu dès son démarrage
  await seedJokes();
  
  // Démarrage du serveur HTTP une fois toutes les initialisations terminées
  app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
    console.log(`Documentation API: http://localhost:${PORT}/`);
  });
}

/**
 * Exécution de la fonction de démarrage avec gestion d'erreur centralisée
 * 
 * La gestion des erreurs au niveau le plus élevé permet de:
 * - Capturer toutes les erreurs non gérées durant l'initialisation
 * - Terminer proprement le processus en cas d'erreur critique
 * - Fournir un message d'erreur explicite pour le diagnostic
 * 
 * Le code de sortie 1 indique une erreur au système d'exploitation
 */
startServer().catch(err => {
  console.error("Erreur au démarrage du serveur:", err);
  process.exit(1);
});