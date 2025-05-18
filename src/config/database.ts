// src/config/database.ts

/**
 * Configuration et initialisation de la base de données
 *
 * Ce module centralise la configuration de la connexion à la base de données SQLite
 * via Sequelize et fournit une fonction d'initialisation pour établir la connexion
 * et synchroniser les modèles au démarrage de l'application.
 */
import { Sequelize } from "sequelize";
import path from "path";
import { fileURLToPath } from "url";

/**
 * Configuration des chemins pour compatibilité ESM
 *
 * Ces convertisseurs permettent d'obtenir l'équivalent de __dirname et __filename
 * dans un contexte de modules ES, où ces variables globales ne sont pas disponibles.
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration de Sequelize avec SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "../../database.sqlite"), // Stockage en fichier
  // Pour une base en mémoire uniquement (pratique pour les tests) :
  // storage: ":memory:",
  logging: console.log // Désactiver en production avec false
});

/**
 * Initialise la connexion à la base de données et synchronise les modèles
 *
 * Cette fonction:
 * 1. Vérifie que la connexion à la base de données est possible
 * 2. Synchronise les modèles avec le schéma de la base de données
 * 3. Recrée les tables si l'environnement n'est pas de production
 *
 * @throws Erreur fatale qui termine le processus en cas d'échec de connexion
 */
export const initializeDatabase = async () => {
  try {
     // Teste la connexion
    await sequelize.authenticate();
    console.log("Connexion à la base de données établie avec succès");
    
/**
    * Synchronisation des modèles avec la base de données
     * 
     * ATTENTION: 
     * - En mode non-production: force: true recréera toutes les tables à chaque démarrage
     * - En production: utilise force: false pour préserver les données
     */
    await sequelize.sync({ force: process.env.NODE_ENV !== 'production' });
    console.log("Base de données synchronisée");
  } catch (error) {
    console.error("Impossible de se connecter à la base de données:", error);
    process.exit(1);
  }
};

export default sequelize;