import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Match from '../models/Match';

export const saveMatch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { date, teams, players, result } = req.body;

    // Convert team IDs to ObjectIds
    const convertedTeams = teams.map((team: any) => ({
      team: new mongoose.Types.ObjectId(team.team),
      score: team.score
    }));

    // Convert player IDs to ObjectIds
    const convertedPlayers = players.map((player: string) => new mongoose.Types.ObjectId(player));

    // Convert winner and loser IDs to ObjectIds
    const convertedResult = {
      winner: new mongoose.Types.ObjectId(result.winner),
      loser: new mongoose.Types.ObjectId(result.loser)
    };

    const newMatch = new Match({
      date,
      teams: convertedTeams,
      players: convertedPlayers,
      result: convertedResult
    });

    const savedMatch = await newMatch.save();
    res.status(201).json({ message: 'Match saved successfully', match: savedMatch });
  } catch (error) {
    next(error);
  }
};