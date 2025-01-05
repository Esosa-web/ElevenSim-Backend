import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { ObjectId } from 'mongodb';
import User from './models/User';
import Team from './models/Teams';
import Player from './models/Player';
import Match from './models/Match';
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
console.log('Connecting to:', process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI || '', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Updated wrapper function for async route handlers
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Authentication routes
app.post('/api/auth/signup', asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    return res.status(400).json({ message: 'Username or email already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();
  res.status(201).json({ message: 'User created successfully' });
}));

app.post('/api/auth/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  res.json({ token, userId: user._id });
}));

// Team routes
app.get('/api/teams', asyncHandler(async (req, res) => {
  console.log('Fetching teams...');
  try {
    const teams = await Team.find().populate('players');
    console.log('Teams fetched:', teams);
    res.json(teams);
  } catch (error: unknown) {
    console.error('Error fetching teams:', error);
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error fetching teams', error: error.message });
    } else {
      res.status(500).json({ message: 'Error fetching teams', error: 'An unknown error occurred' });
    }
  }
}));

app.get('/api/teams/:id', asyncHandler(async (req, res) => {
  const team = await Team.findById(new ObjectId(req.params.id)).populate('players');
  if (!team) {
    return res.status(404).json({ message: 'Team not found' });
  }
  res.json(team);
}));

app.post('/api/teams', asyncHandler(async (req, res) => {
  const newTeam = new Team(req.body);
  const savedTeam = await newTeam.save();
  res.status(201).json(savedTeam);
}));

app.put('/api/teams/:id', asyncHandler(async (req, res) => {
  const updatedTeam = await Team.findByIdAndUpdate(new ObjectId(req.params.id), req.body, { new: true });
  if (!updatedTeam) {
    return res.status(404).json({ message: 'Team not found' });
  }
  res.json(updatedTeam);
}));

app.delete('/api/teams/:id', asyncHandler(async (req, res) => {
  const deletedTeam = await Team.findByIdAndDelete(new ObjectId(req.params.id));
  if (!deletedTeam) {
    return res.status(404).json({ message: 'Team not found' });
  }
  res.json({ message: 'Team deleted successfully' });
}));

// Player routes
app.get('/api/players', asyncHandler(async (req, res) => {
  const players = await Player.find().populate('team', 'name');
  res.json(players);
}));

app.get('/api/players/:id', asyncHandler(async (req, res) => {
  const player = await Player.findById(new ObjectId(req.params.id)).populate('team');
  if (!player) {
    return res.status(404).json({ message: 'Player not found' });
  }
  res.json(player);
}));

app.post('/api/players', asyncHandler(async (req, res) => {
  const newPlayer = new Player(req.body);
  const savedPlayer = await newPlayer.save();
  res.status(201).json(savedPlayer);
}));

app.put('/api/players/:id', asyncHandler(async (req, res) => {
  const updatedPlayer = await Player.findByIdAndUpdate(new ObjectId(req.params.id), req.body, { new: true });
  if (!updatedPlayer) {
    return res.status(404).json({ message: 'Player not found' });
  }
  res.json(updatedPlayer);
}));

app.delete('/api/players/:id', asyncHandler(async (req, res) => {
  const deletedPlayer = await Player.findByIdAndDelete(new ObjectId(req.params.id));
  if (!deletedPlayer) {
    return res.status(404).json({ message: 'Player not found' });
  }
  res.json({ message: 'Player deleted successfully' });
}));

// Match routes
app.get('/api/matches', asyncHandler(async (req, res) => {
  const matches = await Match.find().populate('teams.team players');
  res.json(matches);
}));

app.get('/api/matches/:id', asyncHandler(async (req, res) => {
  const match = await Match.findById(new ObjectId(req.params.id)).populate('teams.team players');
  if (!match) {
    return res.status(404).json({ message: 'Match not found' });
  }
  res.json(match);
}));

app.post('/api/matches', asyncHandler(async (req, res) => {
  const newMatch = new Match(req.body);
  const savedMatch = await newMatch.save();
  res.status(201).json(savedMatch);
}));

app.put('/api/matches/:id', asyncHandler(async (req, res) => {
  const updatedMatch = await Match.findByIdAndUpdate(new ObjectId(req.params.id), req.body, { new: true });
  if (!updatedMatch) {
    return res.status(404).json({ message: 'Match not found' });
  }
  res.json(updatedMatch);
}));

app.delete('/api/matches/:id', asyncHandler(async (req, res) => {
  const deletedMatch = await Match.findByIdAndDelete(new ObjectId(req.params.id));
  if (!deletedMatch) {
    return res.status(404).json({ message: 'Match not found' });
  }
  res.json({ message: 'Match deleted successfully' });
}));

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'An unexpected error occurred', error: err.message });
});

// Serve static files AFTER API routes
if (process.env.NODE_ENV === 'production') {
  const frontendBuildPath = path.join(__dirname, '../../frontend/build');
  app.use(express.static(frontendBuildPath));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
  });
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});