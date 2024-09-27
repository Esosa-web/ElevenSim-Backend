"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PlayerSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
    number: { type: Number, required: true },
    stats: {
        speed: { type: Number, required: true },
        power: { type: Number, required: true },
        technique: { type: Number, required: true },
    },
    team: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team', required: true }
});
const Player = (0, mongoose_1.model)('Player', PlayerSchema);
exports.default = Player;
