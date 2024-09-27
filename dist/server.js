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
const Player_1 = __importDefault(require("./models/Player"));
const Teams_1 = __importDefault(require("./models/Teams"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
// Connect to MongoDB
mongoose_1.default.connect('mongodb://localhost:27017/sportsdb')
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
// Routes for Player
app.get('/players', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const players = yield Player_1.default.find();
        res.json(players);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
app.post('/players', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const player = new Player_1.default(req.body);
        yield player.save();
        res.status(201).json(player);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
// Routes for Team
app.get('/teams', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teams = yield Teams_1.default.find().populate('players');
        res.json(teams);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
app.post('/teams', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const team = new Teams_1.default(req.body);
        yield team.save();
        res.status(201).json(team);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
