// src/models/joke.model.ts

/**
 * Modèle de donnée pour les blagues Carambar
 * 
 * Ce module définit la structure et les règles de validation pour les blagues
 * stockées en base de données. Il utilise Sequelize avec TypeScript pour
 * garantir l'intégrité des données et la sécurité de type.
 */
import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import sequelize from "../config/database.js";

/**
 * Classe modèle pour les blagues
 * 
 * Utilise les génériques avancés de TypeScript avec Sequelize pour:
 * - InferAttributes: déduire automatiquement les types d'attributs du modèle
 * - InferCreationAttributes: déduire les attributs requis lors de la création
 * - Ces approches réduisent la duplication de code et maintiennent la cohérence des types
 */
export class Joke extends Model<InferAttributes<Joke>, InferCreationAttributes<Joke>> {
  
  /**
   * Identifiant unique auto-incrémenté
   * CreationOptional indique que ce champ n'est pas requis lors de la création
   * car il sera généré automatiquement par la base de données
   */
  declare id: CreationOptional<number>; // Optionnel à la création (auto-généré)
    
  /**
   * Contenu textuel de la blague
   * Champ obligatoire qui constitue l'essence de la donnée
   */
  declare text: string;
  
  /**
   * Horodatages automatiques gérés par Sequelize
   * readonly pour protéger contre les modifications manuelles
   * CreationOptional car générés automatiquement lors de la création/modification
   */
  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}

/**
 * Configuration du modèle Sequelize
 * 
 * Définit la structure de table, les contraintes et les validations
 * pour garantir l'intégrité et la cohérence des données
 */
Joke.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED, // Entier positif uniquement
      autoIncrement: true, // Incrémentation automatique
      primaryKey: true, // Clé primaire pour indexation et performances
    },
    text: {
      type: DataTypes.TEXT, // Type TEXT sans limite de longueur
      allowNull: false, // Une blague doit avoir un contenu
      validate: {
        notEmpty: true // Le contenu ne peut pas être une chaîne vide
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Horodatage automatique à la création
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW, // Mis à jour automatiquement
    }
  },
  {
    tableName: "jokes", // Nom de la table en BDD
    sequelize // Instance Sequelize pour la connexion à la base de données
  }
);

export default Joke;