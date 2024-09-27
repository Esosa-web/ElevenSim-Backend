"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TeamSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    players: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Player' }]
});
const Team = (0, mongoose_1.model)('Team', TeamSchema);
exports.default = Team;
