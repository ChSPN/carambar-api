// src/app.ts

/**
 * Point d'entrée principal de l'application API
 * 
 * Ce module initialise et configure l'application Express avec une architecture
 * orientée objet, facilitant la séparation des préoccupations et améliorant
 * la maintenabilité. Il centralise la configuration des middlewares, des routes
 * et de la documentation API.
 */
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { apiVersion } from "./middleware/version.middleware.js";
import jokeRoutes from "./routes/joke.routes.js";

/**
 * Classe principale de configuration de l'application
 * 
 * Utilise une approche orientée objet qui:
 * - Encapsule la configuration de l'application
 * - Sépare les différentes responsabilités en méthodes privées
 * - Permet une initialisation claire et un export propre
 */
class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.configureMiddleware();
    this.configureRoutes();
    this.configureSwagger();
  }

    /**
   * Configure les middlewares globaux de l'application
   * 
   * - CORS: Permet les requêtes cross-origin pour faciliter le développement frontend
   * - bodyParser: Parse les corps de requête en JSON et URL-encoded pour les rendre accessibles
   */
  private configureMiddleware(): void {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

    /**
   * Configure les routes de l'API avec versionnement
   * 
   * Utilise un système de versionnement d'API pour:
   * - Assurer la rétrocompatibilité lors de changements
   * - Permettre des migrations progressives
   * - Organiser les routes logiquement par ressource
   */
  private configureRoutes(): void {
    // Routes API versionnées avec le préfixe /api/v1
    this.app.use("/api/v1/jokes", apiVersion("v1"), jokeRoutes);
  }

    /**
   * Configure la documentation Swagger de l'API
   * 
   * Swagger fournit:
   * - Une documentation interactive et explorable de l'API
   * - Un moyen de tester les endpoints directement depuis le navigateur
   * - Une spécification OpenAPI standardisée
   * 
   * La documentation est accessible à la racine de l'application
   * et les spécifications brutes au format JSON à /v1/swagger.json
   */
  private configureSwagger(): void {
    const options = {
      definition: {
        openapi: "3.0.0",
        info: {
          title: "API de Blagues",
          version: "1.0.0",
          description: "Documentation de l'API de blagues",
        },
        servers: [
          {
            url: "/api/v1",
            description: "API v1",
          },
        ],
      },
      // Chemins des fichiers contenant les annotations JSDoc pour Swagger
      apis: ["./routes/*.js", "./src/routes/*.ts"]
    };

    const specs = swaggerJsdoc(options);
    // Exposition des spécifications au format JSON
    this.app.get("/v1/swagger.json", (req, res) => res.json(specs));
    // Interface utilisateur Swagger à la racine
    this.app.use("/", swaggerUi.serve, swaggerUi.setup(specs));
  }
}

/**
 * Export de l'instance Express configurée, prête à être utilisée
 * Cette approche permet d'instancier l'application une seule fois
 * et de l'exporter comme un singleton
 */
export default new App().app;