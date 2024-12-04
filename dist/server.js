"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const mongodb_1 = require("mongodb");
const User_1 = __importDefault(require("./models/User"));
const Teams_1 = __importDefault(require("./models/Teams"));
const Player_1 = __importDefault(require("./models/Player"));
const Match_1 = __importDefault(require("./models/Match"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Connect to MongoDB
console.log('Connecting to:', process.env.MONGODB_URI);
mongoose_1.default.connect(process.env.MONGODB_URI || '', {
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
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
// Authentication routes
app.post('/api/auth/signup', asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const existingUser = yield User_1.default.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
        return res.status(400).json({ message: 'Username or email already exists' });
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const newUser = new User_1.default({ username, email, password: hashedPassword });
    yield newUser.save();
    res.status(201).json({ message: 'User created successfully' });
})));
app.post('/api/auth/login', asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield User_1.default.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, userId: user._id });
})));
// Team routes
app.get('/api/teams', asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Fetching teams...');
    try {
        const teams = yield Teams_1.default.find().populate('players');
        console.log('Teams fetched:', teams);
        res.json(teams);
    }
    catch (error) {
        console.error('Error fetching teams:', error);
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error fetching teams', error: error.message });
        }
        else {
            res.status(500).json({ message: 'Error fetching teams', error: 'An unknown error occurred' });
        }
    }
})));
app.get('/api/teams/:id', asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const team = yield Teams_1.default.findById(new mongodb_1.ObjectId(req.params.id)).populate('players');
    if (!team) {
        return res.status(404).json({ message: 'Team not found' });
    }
    res.json(team);
})));
app.post('/api/teams', asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newTeam = new Teams_1.default(req.body);
    const savedTeam = yield newTeam.save();
    res.status(201).json(savedTeam);
})));
app.put('/api/teams/:id', asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedTeam = yield Teams_1.default.findByIdAndUpdate(new mongodb_1.ObjectId(req.params.id), req.body, { new: true });
    if (!updatedTeam) {
        return res.status(404).json({ message: 'Team not found' });
    }
    res.json(updatedTeam);
})));
app.delete('/api/teams/:id', asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedTeam = yield Teams_1.default.findByIdAndDelete(new mongodb_1.ObjectId(req.params.id));
    if (!deletedTeam) {
        return res.status(404).json({ message: 'Team not found' });
    }
    res.json({ message: 'Team deleted successfully' });
})));
// Player routes
app.get('/api/players', asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const players = yield Player_1.default.find().populate('team', 'name');
    res.json(players);
})));
app.get('/api/players/:id', asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const player = yield Player_1.default.findById(new mongodb_1.ObjectId(req.params.id)).populate('team');
    if (!player) {
        return res.status(404).json({ message: 'Player not found' });
    }
    res.json(player);
})));
app.post('/api/players', asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newPlayer = new Player_1.default(req.body);
    const savedPlayer = yield newPlayer.save();
    res.status(201).json(savedPlayer);
})));
app.put('/api/players/:id', asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedPlayer = yield Player_1.default.findByIdAndUpdate(new mongodb_1.ObjectId(req.params.id), req.body, { new: true });
    if (!updatedPlayer) {
        return res.status(404).json({ message: 'Player not found' });
    }
    res.json(updatedPlayer);
})));
app.delete('/api/players/:id', asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedPlayer = yield Player_1.default.findByIdAndDelete(new mongodb_1.ObjectId(req.params.id));
    if (!deletedPlayer) {
        return res.status(404).json({ message: 'Player not found' });
    }
    res.json({ message: 'Player deleted successfully' });
})));
// Match routes
app.get('/api/matches', asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const matches = yield Match_1.default.find().populate('teams.team players');
    res.json(matches);
})));
app.get('/api/matches/:id', asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const match = yield Match_1.default.findById(new mongodb_1.ObjectId(req.params.id)).populate('teams.team players');
    if (!match) {
        return res.status(404).json({ message: 'Match not found' });
    }
    res.json(match);
})));
app.post('/api/matches', asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newMatch = new Match_1.default(req.body);
    const savedMatch = yield newMatch.save();
    res.status(201).json(savedMatch);
})));
app.put('/api/matches/:id', asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedMatch = yield Match_1.default.findByIdAndUpdate(new mongodb_1.ObjectId(req.params.id), req.body, { new: true });
    if (!updatedMatch) {
        return res.status(404).json({ message: 'Match not found' });
    }
    res.json(updatedMatch);
})));
app.delete('/api/matches/:id', asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedMatch = yield Match_1.default.findByIdAndDelete(new mongodb_1.ObjectId(req.params.id));
    if (!deletedMatch) {
        return res.status(404).json({ message: 'Match not found' });
    }
    res.json({ message: 'Match deleted successfully' });
})));
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'An unexpected error occurred', error: err.message });
});
// Serve static files AFTER API routes
if (process.env.NODE_ENV === 'production') {
    const frontendBuildPath = path_1.default.join(__dirname, '../../frontend/build');
    app.use(express_1.default.static(frontendBuildPath));
    app.get('*', (req, res) => {
        res.sendFile(path_1.default.join(frontendBuildPath, 'index.html'));
    });
}
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
