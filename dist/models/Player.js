"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PlayerSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
    team: { type: String, required: true },
    age: { type: Number, required: true },
    isActive: { type: Boolean, default: true }
});
const Player = (0, mongoose_1.model)('Player', PlayerSchema);
exports.default = Player;
