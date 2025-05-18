// src/seeds/joke.seed.ts

/**
 * Script d'initialisation des données pour les blagues
 * 
 * Ce module remplit la base de données avec un ensemble de blagues initiales
 * typiques du style Carambar. Il assure qu'une nouvelle installation de l'application
 * dispose immédiatement de contenu à afficher, sans nécessiter d'intervention manuelle.
 */
import Joke from "../models/joke.model.js";
import { initializeDatabase } from "../config/database.js";

const jokes = [
  {
    text: "Pourquoi les plongeurs plongent-ils toujours en arrière ?<br/>Parce que sinon, ils tombent dans le bateau !",
  },
  {
    text: "Quel est le comble pour un électricien ?<br/>Ne pas être au courant !",
  },
  {
    text: "Pourquoi les fantômes sont-ils de si mauvais menteurs ?<br/>Parce qu'on peut lire à travers eux !",
  },
  {
    text: "Pourquoi les oiseaux ne prennent-ils pas de douches ?<br/>Parce qu'ils préfèrent les bains de soleil !",
  },
  {
    text: "Quelle est la femelle du hamster ?<br/>L’Amsterdam !",
  },
  {
    text: "Que dit un oignon quand il se cogne ?<br/>Aïe !",
  },
  {
    text: "Quel est l'animal le plus heureux ?<br/>Le hibou, parce que sa femme est chouette !",
  },
  {
    text: "Pourquoi le football c'est rigolo ?<br/>Parce que Thierry en rit !",
  },
  {
    text: "Quel est le sport le plus fruité ?<br/>La boxe, parce que tu te prends des pêches dans la poire et tu tombes dans les pommes !",
  },
  {
    text: "Que se fait un Schtroumpf quand il tombe ?<br/>Un Bleu !",
  },
  {
    text: "Quel est le comble pour un marin ?<br/>Avoir le nez qui coule !",
  },
  {
    text: "Qu'est ce que les enfants usent le plus à l'école ?<br/>Le professeur !",
  },
  {
    text: "Quel est le sport le plus silencieux ?<br/>Le para-chuuuut !",
  },
  {
    text: "Quel est le comble pour un joueur de bowling ?<br/>C’est de perdre la boule !",
  },
];
/**
 * Remplit la base de données avec des blagues initiales
 * 
 * Cette fonction suit une approche idempotente :
 * - Vérifie d'abord si la base contient déjà des données
 * - N'ajoute les blagues que si la table est vide
 * 
 * Cette stratégie permet d'exécuter le script plusieurs fois sans risque
 * de duplication, et préserve les données existantes dans les environnements
 * qui ont déjà été initialisés.
 */
export async function seedJokes() {
  try {
    // S'assure que la base de données est initialisée et les tables créées
    await initializeDatabase();
    
    // Vérifie si la table contient déjà des données
    const count = await Joke.count();
    if (count === 0) {
      // Insertion en masse pour de meilleures performances
      await Joke.bulkCreate(jokes);
      console.log("Données initiales ajoutées avec succès!");
    } else {
      console.log("La base contient déjà des données.");
    }
    
  } catch (error) {
    console.error("Erreur lors de l'ajout des données initiales:", error);
  }
}

seedJokes();