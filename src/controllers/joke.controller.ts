// src/controllers/joke.controller.ts
import { RequestHandler } from "express";
import Joke from "../models/joke.model.js";
import sequelize from "../config/database.js";

// Récupérer toutes les blagues
export const getAllJokes: RequestHandler = async (req, res) => {
  try {
    const jokes = await Joke.findAll();
    res.status(200).json(jokes); // Pas de return
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Récupérer une blague par ID
export const getJokeById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const joke = await Joke.findByPk(id);
    
    if (!joke) {
      res.status(404).json({ message: "Blague non trouvée" });
      return; // Garde le return seul ici pour sortir de la fonction
    }
    
    res.status(200).json(joke);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Récupérer une blague aléatoire
export const getRandomJoke: RequestHandler = async (req, res) => {
  try {
    const joke = await Joke.findOne({
      order: sequelize.random()
    });
    
    if (!joke) {
      res.status(404).json({ message: "Aucune blague disponible" });
      return;
    }
    
    res.status(200).json(joke);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Créer une nouvelle blague
export const createJoke: RequestHandler = async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      res.status(400).json({ message: "Le texte de la blague est obligatoire" });
      return;
    }
    
    const newJoke = await Joke.create({
      text
    });
    
    res.status(201).json(newJoke);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
