import { Request, Response } from 'express';
import Team from '../models/Teams';

export const getAllTeams = async (req: Request, res: Response) => {
  try {
    const teams = await Team.find().select('name overallRating stats');
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teams', error });
  }
};

export const getTeamById = async (req: Request, res: Response) => {
  try {
    const team = await Team.findById(req.params.id).populate('players');
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team', error });
  }
};