"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TeamSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    formation: { type: String, required: true },
    overallRating: { type: Number, required: true },
    stats: {
        attack: { type: Number, required: true },
        defense: { type: Number, required: true },
        teamwork: { type: Number, required: true },
    },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    players: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Player' }]
});
const Team = (0, mongoose_1.model)('Team', TeamSchema);
exports.default = Team;
