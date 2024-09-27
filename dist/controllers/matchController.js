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
exports.saveMatch = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Match_1 = __importDefault(require("../models/Match"));
const saveMatch = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date, teams, players, result } = req.body;
        // Convert team IDs to ObjectIds
        const convertedTeams = teams.map((team) => ({
            team: new mongoose_1.default.Types.ObjectId(team.team),
            score: team.score
        }));
        // Convert player IDs to ObjectIds
        const convertedPlayers = players.map((player) => new mongoose_1.default.Types.ObjectId(player));
        // Convert winner and loser IDs to ObjectIds
        const convertedResult = {
            winner: new mongoose_1.default.Types.ObjectId(result.winner),
            loser: new mongoose_1.default.Types.ObjectId(result.loser)
        };
        const newMatch = new Match_1.default({
            date,
            teams: convertedTeams,
            players: convertedPlayers,
            result: convertedResult
        });
        const savedMatch = yield newMatch.save();
        res.status(201).json({ message: 'Match saved successfully', match: savedMatch });
    }
    catch (error) {
        next(error);
    }
});
exports.saveMatch = saveMatch;
