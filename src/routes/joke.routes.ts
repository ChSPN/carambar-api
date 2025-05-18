// src/routes/joke.routes.ts
import express, { Request, Response } from "express";
// Update the import path if the controller file is named differently or located elsewhere
import { getAllJokes, getRandomJoke, getJokeById, createJoke } from "../controllers/joke.controller.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Joke:
 *       type: object
 *       required:
 *         - text
 *       properties:
 *         id:
 *           type: integer
 *           description: ID unique de la blague
 *           example: 1
 *         text:
 *           type: string
 *           description: Contenu de la blague
 *           example: "Pourquoi les plongeurs plongent-ils toujours en arrière? Parce que sinon, ils tombent dans le bateau!"
 *         category:
 *           type: string
 *           description: Catégorie de la blague
 *           example: "Devinette"
 *         author:
 *           type: string
 *           description: Auteur de la blague
 *           example: "Carambar"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date de création
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date de dernière modification
 */

/**
 * @swagger
 * /jokes:
 *   get:
 *     summary: Récupère toutes les blagues
 *     tags: [Jokes]
 *     responses:
 *       200:
 *         description: Liste des blagues
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Joke'
 */
router.get("/", getAllJokes);

/**
 * @swagger
 * /jokes/random:
 *   get:
 *     summary: Récupère une blague aléatoire
 *     tags: [Jokes]
 *     responses:
 *       200:
 *         description: Blague aléatoire
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Joke'
 *       404:
 *         description: Aucune blague disponible
 */
router.get("/random", getRandomJoke);

/**
 * @swagger
 * /jokes/{id}:
 *   get:
 *     summary: Récupère une blague par son ID
 *     tags: [Jokes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Blague trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Joke'
 *       404:
 *         description: Blague non trouvée
 */
router.get("/:id", getJokeById);

/**
 * @swagger
 * /jokes:
 *   post:
 *     summary: Crée une nouvelle blague
 *     tags: [Jokes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *                 description: Contenu de la blague
 *               category:
 *                 type: string
 *                 description: Catégorie de la blague
 *               author:
 *                 type: string
 *                 description: Auteur de la blague
 *     responses:
 *       201:
 *         description: Blague créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Joke'
 *       400:
 *         description: Données invalides
 */
router.post("/", createJoke);

export default router;
